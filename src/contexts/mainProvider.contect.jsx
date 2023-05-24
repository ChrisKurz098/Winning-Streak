import { createContext } from "react";

import { UserProvider } from "./user.context";
import { PopupMenuContextProvider } from "./popup.context";
import { SoundProvider } from "./useSound.context";

const mainProvider = createContext();

const MainProvider = ({ children }) => {

    return (
        <mainProvider.Provider>
            <UserProvider>
                <PopupMenuContextProvider>
                    <SoundProvider>
                        {children}
                    </SoundProvider>
                </PopupMenuContextProvider>
            </UserProvider>
        </mainProvider.Provider>
    )
};


export default MainProvider;