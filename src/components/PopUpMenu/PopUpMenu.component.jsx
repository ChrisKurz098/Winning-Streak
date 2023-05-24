
import "./popUpMenu.styles.scss";
import usePopup from "../../contexts/popup.context";
import { useEffect, useRef } from "react";
const PopUpMenu = ({ message, answesrs, onConfirm, onCancel, isOpen, resolve }) => {

    const answerA = answesrs?.[0] ?? 'Yes';
    const answerB = answesrs?.[1] ?? 'No';
    const choiceB = useRef();

    useEffect(() => {
        choiceB.current.focus();
    }, [isOpen])


    const popup = usePopup();

    const handleClick = async (performCallback) => {
        resolve(); //this resolves the promise that is initiated in createPopup()
        popup.closePopup();
        //await callback if needed
        await performCallback?.();
        
    }



    return (

        <div style={{ display: (isOpen) ? 'flex' : 'none' }} className="disable-clicks" >


            <div className="popup-menu-container">
                <p>{message}</p>
                <span className="buttons-container">
                    <button onClick={() => handleClick(onConfirm)}>{answerA}</button>
                    <button ref={choiceB} style={{ display: (answerA === answerB) ? 'none' : '' }} onClick={() => handleClick(onCancel)}>{answerB}</button>
                </span>
            </div>
        </div>



    );

};

export default PopUpMenu;


/*
How to use this compoonent:
- There is a popup.context that provides any component acess to this popup
- by useing usePopup() from the context, the user is returned an object containing {createPopup, and closePopup}
- closePopup simply sets isOpen to false. createPopup requires the prop values to be sent to it
----Props----
- message: STR - the message that will be displayed
- answesrs: [STR, STR] - an array with 2 strings ['Answer A', 'Answer B' ] default is ['Yes','No'] when nothing is passed. Make both the strings the exact same to hide the second option and only allow a confirm (ie, ['OK, 'OK])
- onConfirm: This is a callback function that is triggered when the user selects Yes
- onCancel: This is a callback function that is triggered when the user selects No
- isOpen: this is a bool value that determines if the popup is displayed or not. This is set in the popup context
- resolve: This is the resolve for a promise that is initiated by createPopup(). We run the resolve when the user closes the menu. This allows your code to wait until the user makes a selection before running opening a new popUp.
*/