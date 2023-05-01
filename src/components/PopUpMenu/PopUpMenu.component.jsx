
import "./popUpMenu.styles.scss";
const PopUpMenu = ({ message, answesrs, callback, returns, renderWhen, style }) => {
    const answerA = answesrs?.[0] ?? 'Yes';
    const answerB = answesrs?.[1] ?? 'No';

    const returnA = returns?.[0] ?? true;
    const returnB = returns?.[1] ?? false;

    return (

        <div style = {{...style, display: (renderWhen) ? 'flex' : 'none'}} className="disable-clicks" >


            <div className="popup-menu-container">
                <p>{message}</p>
                <span className="buttons-container">
                    <button onClick={() => callback?.(returnA)}>{answerA}</button>
                    <button onClick={() => callback?.(returnB)}>{answerB}</button>
                </span>
            </div>
        </div>



    );

};

export default PopUpMenu;


/*
How to use this compoonent:
- The menu item should be rendered inside the component it is triggered by or its parent
- Use states to determine if the menu should be displayed or not; Example: const [menu, setMenu] = useState({deleteItem: false, confirmSelection: false}) 
- Pass a prop named renderWhen as a conditional for when the the menu should appear; Example: <PopUpMenu renderWhen = {(menu.deleteItem && selectedItem === self)}
----Props----
- message: STR - the message that will be displayed
- answesrs: [STR, STR] - an array with 2 strings ['Answer A', 'Answer B' ] default is ['Yes','No'] when nothing is passed
- callback: callback function for when the user makes a selection
- returns: [VAL, VAL] What will be returned to the callback function for each selection. Default is [true, false] when nothing is passed
- renderWhen: (condition) Stated above. This is the conditional that determines when the message will be displayed
*/