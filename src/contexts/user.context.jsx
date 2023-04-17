import { createContext, useState,  } from "react";

//actual value you want to access
export const UserContext = createContext({
    currentUser: {},
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const value = { currentUser, setCurrentUser };


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}