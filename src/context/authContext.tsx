import { useState, useEffect, createContext } from "react";
import { User, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { auth } from "@/firebase/config";
import Love from "../types/lovetype";
import { useRouter } from "next/router";

export const AuthContext = createContext<{
  user: User | null;
  logout: () => void;
  loginWithGoogle: () => void;
  error: null;
  loading: boolean;
  checkLove: (slug: string) => Promise<boolean | undefined>;
  addLove: (love: Love,slug:string) => Promise<void>;
}>({
  user: null,
  logout: () => {},
  loginWithGoogle: () => {},
  error: null,
  loading: false,
  checkLove: async (slug: string) => {
    return false; // Placeholder implementation
  },
  addLove: async (love: Love,slug:string) => {
    return; // Placeholder implementation
  }
});



export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    console.log("logout");
    auth.signOut();
  };

  const loginWithGoogle = async () => {
    console.log("loginWithGoogle");
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
      setLoading(false);
      //db stuff
      const db = getFirestore();

      const uid = userCredential.user.uid;
      console.log(uid);

      // users/uid
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", uid), {
          uid: uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          createdAt: new Date(),
          lastLoginAt: new Date(),
        });
      } else {
        await updateDoc(doc(db, "users", uid), {
          uid: uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          lastLoginAt: new Date(),
        });
      }

      //  const docReff = doc(db, "users", uid).id;
      //  console.log(docReff);
      //   console.log(docReff==uid);

      //Love db
      const loveRef = doc(db, "love", uid);
      const loveSnap = await getDoc(loveRef);

      if (!loveSnap.exists()) {
        await setDoc(doc(db, "love", uid), {});
      } else {
        console.log("love already exists");
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  //from slug which is uuid we need to check love collection whether document with slug matches or not
  //if it matches then return true else false

  const checkLove = async (slug: string) => {
    console.log("checkLove");
    try {
      setLoading(true);
      const db = getFirestore();
      const loveRef = doc(db, "love", slug);
      const loveSnap = await getDoc(loveRef);
      if (loveSnap.exists()) {
        setLoading(false);
        return true;
      }
      console.log("love does not exists");
      setLoading(false);
      return false;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addLove = async (love: Love, slug: string) => {
    console.log("addLove");
    try {
      setLoading(true);
      const db = getFirestore();
      const loveRef = doc(db, "love", slug);
  
      const loveSnap = await getDoc(loveRef);
      if (loveSnap.exists()) {
        const existingData = loveSnap.data();
        if (existingData && Array.isArray(existingData.loves)) {
          // Add the new love object to the existing array
          const updatedLoves = [...existingData.loves, love];
          await updateDoc(loveRef, { loves: updatedLoves });
        } else {
          // If the 'loves' array doesn't exist, create a new one with the current love object
          await setDoc(loveRef, { loves: [love] });
        }
        setLoading(false);
      } else {
        console.log("love does not exist");
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  
  

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        loginWithGoogle,
        error,
        loading,
        checkLove,
        addLove,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
