
import "./popUpMenu.styles.scss";
const PopUpMenu = ({ message, answesrs, callback, returns, style }) => {
    const answerA = answesrs?.[0] ?? 'Yes';
    const answerB = answesrs?.[1] ?? 'No';

    const returnA = returns?.[0] ?? true;
    const returnB = returns?.[1] ?? false;

    return (

        <div style = {style} className="disable-clicks">


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