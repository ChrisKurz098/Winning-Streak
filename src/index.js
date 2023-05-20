import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { UserProvider } from "./contexts/user.context";
import { PopupMenuContextProvider } from "./contexts/popup.context";
import { SoundProvider } from "./contexts/useSound.context";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <PopupMenuContextProvider>
                    <SoundProvider>
                    <App />
                    </SoundProvider>
                </PopupMenuContextProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
