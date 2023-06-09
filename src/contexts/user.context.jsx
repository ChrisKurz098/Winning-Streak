import { createContext, useState, useEffect } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener, getRemoteUserData, updateRemoteUserData } from "../utils/firebase/firebase.utils";

//actual value you want to access
export const UserContext = createContext({
    userAuth: null,
    setUserAuth: () => null,
    currentUser: false,
    setCurrentUser: () => null,

});

export const UserProvider = ({ children }) => {
    const [userAuthId, setUserAuthId] = useState(null)
    const [currentUser, setCurrentUser] = useState(false);
    const value = { currentUser, setCurrentUser, userAuthId, setUserAuthId };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocFromAuth(user);
                setUserAuthId(user.uid);
                const dbUser = await getRemoteUserData(user.uid);
                setCurrentUser({ ...dbUser });
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const updateDatabase = async () => {
            if (currentUser){
                await updateRemoteUserData(userAuthId, currentUser.userData);
            }
        };
        updateDatabase();
    }, [currentUser]);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

