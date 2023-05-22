import {useState,useEffect,createContext} from 'react';
import {} from '../firebase/config';

export const AuthContext = createContext(
    {
        user: null,
        setUser: () => {},
        logout: () => {},
        login: () => {},
        signup: () => {},
        error: null,
        setError: () => {},
        loading: false,
        setLoading: () => {},
    }
);

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         setUser(user);
    //         setLoading(false);
    //     });
    // }, []);

    const signup = async (email:String, password:String) => {
        console.log(email,password);
        // setLoading(true);
        // setError(null);
        // try {
        //     const res = await auth.createUserWithEmailAndPassword(email, password);
        //     setUser(res.user);
        //     setLoading(false);
        //     return res;
        // } catch (err) {
        //     setError(err.message);
        //     setLoading(false);
        // }
    };

    const login = async (email:String, password:String) => {
        setLoading(true);
        // setLoading(true);
        // setError(null);
        // try {
        //     const res = await auth.signInWithEmailAndPassword(email, password);
        //     setUser(res.user);
        //     setLoading(false);
        //     return res;
        // } catch (err) {
        //     setError(err.message);
        //     setLoading(false);
        // }
    };

    const logout = async () => {
        // setLoading(true);
        // setError(null);
        // try {
        //     await auth.signOut();
        //     setUser(null);
        //     setLoading(false);
        // } catch (err) {
        //     setError(err.message);
        //     setLoading(false);
        // }
    };

    // return (
    //     // <AuthContext.Provider
    //     //     value={{
    //     //         user,
    //     //         setUser,
    //     //         logout,
    //     //         login,
    //     //         signup,
    //     //         error,
    //     //         setError,
    //     //         loading,
    //     //         setLoading,
    //     //     }}
    //     // >
    //     //     {children}
    //     // </AuthContext.Provider>
    // );
};