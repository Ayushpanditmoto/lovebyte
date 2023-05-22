import { useState, useEffect, createContext } from "react";
import { User, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";
import {useRouter} from 'next/router'; 

export const AuthContext = createContext({
  user: null as User | null,
  logout: () => {},
  loginWithGoogle: () => {},
  error: null,

  loading: false,
});


export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

// const router = useRouter();

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
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const checkUser = () => {
    console.log("checkUser");
    // if (!user) {
    //   router.push("/login");
    // }

    // return user;
  };

 


  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        loginWithGoogle,
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
