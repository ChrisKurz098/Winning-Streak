
import "./popUpMenu.styles.scss";
import usePopup from "../../contexts/popup.context";
const PopUpMenu = ({ message, answesrs, onConfirm, isOpen,  }) => {
    const answerA = answesrs?.[0] ?? 'Yes';
    const answerB = answesrs?.[1] ?? 'No';

    
    const popup = usePopup();

const handleClick = (performCallback) => {
   if (performCallback) onConfirm?.();
   popup.closePopup();
}

    return (

        <div style = {{ display: (isOpen) ? 'flex' : 'none'}} className="disable-clicks" >


            <div className="popup-menu-container">
                <p>{message}</p>
                <span className="buttons-container">
                    <button onClick={() => handleClick(true)}>{answerA}</button>
                    <button onClick={() => handleClick(false)}>{answerB}</button>
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
- answesrs: [STR, STR] - an array with 2 strings ['Answer A', 'Answer B' ] default is ['Yes','No'] when nothing is passed
- onConfirm: This is a callback function that is triggered when the user selects Yes
- isOpen: this is a bool value that determines if the popup is displayed or not. This is set in the popup context
*/