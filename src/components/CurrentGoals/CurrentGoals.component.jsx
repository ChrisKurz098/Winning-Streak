import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./currentGoals.styles.scss"


const CurrentGoals = () => {
const {currentUser} = useContext(UserContext);

return (
    <div className="current-goals-container">
        <h2>Current Goals</h2>
        <span>
            <ol>
                { (currentUser !== null) ? Object.entries(currentUser.userData.goals).map(([key, value], i) => {
                    
                    //decide if goal should be displayed. Does it need to be completed?
                    return (<li key={`${key}-${i}`}>{key}</li>)
                }) : (<li>...</li>)
                }
            </ol>
        </span>

    </div>
);
}

export default CurrentGoals;