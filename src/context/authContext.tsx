import { useState, useEffect, createContext } from "react";
import { User, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth } from "@/firebase/config";
import Love from "../types/lovetype";
import { useRouter } from "next/router"
import Cookies from 'js-cookie';


export const AuthContext = createContext<{
  user: User | null;
  logout: () => void;
  loginWithGoogle: () => void;
  error: null;
  loading: boolean;
  resultPrank: ()=>Promise<void>;
  checkLove: (slug: string) => Promise<boolean | undefined>;
  addLove: (love: Love,slug:string) => Promise<void>;
  getLove: (slug: string) => Promise<Love[] | undefined>;
  
  
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
  },
  getLove: async (slug: string) => {
    return undefined; // Placeholder implementation
  },
  resultPrank: ()=> {
    return Promise.resolve();
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

  const getLove = async (slug: string) => {
    try {
      // setLoading(true);
      const db = getFirestore();
      const loveRef = doc(db, "love", slug);
  
      const loveSnap = await getDoc(loveRef);

      if (loveSnap.exists()) {
        const loveData =await loveSnap.data();
        console.log(loveData);
        if (loveData && Array.isArray(loveData.loves)) {
          const allLoves = loveData.loves;
          console.log(allLoves);
        //sort by date
        allLoves.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

          // setLoading(false);
          return allLoves;
        } else {
          console.log("No love objects found");
        }
      } else {
        console.log("love does not exist");
      }
      // setLoading(false);
      return [];
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setLoading(false);
      return [];
    }
  };
  
  const resultPrank = async () => {
    try {
      // Check if cookies are available
      const cookies = Cookies.get('index');
      let index = cookies ? parseInt(cookies) : 0; // If cookies exist, parse the value as an integer, otherwise set it to 0
      index += 1; // Increment the index value
  
      // Set the updated index value as a cookie
      Cookies.set('index', index.toString(), { expires: 7 });
  
      if (index > 1) {
        // Show prank page
        showPrankPage(); // Replace with your implementation to display the prank page
        // Reset the index value
        Cookies.set('index', '0', { expires: 7 });
      } else {
        // Show result page
        showResultPage(); // Replace with your implementation to display the result page
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
    }
  };

  const showPrankPage = () => {
    console.log('Showing prank page');
    router.push('/prank');
  };
  
  const showResultPage = () => {
    console.log('Showing result page');
    router.push('/result');
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
        getLove,
        resultPrank,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
