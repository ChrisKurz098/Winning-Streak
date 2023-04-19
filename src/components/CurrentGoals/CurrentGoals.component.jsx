import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./currentGoals.styles.scss"


const CurrentGoals = () => {
const {currentUser} = useContext(UserContext);

return (
    <div className="current-goals-container nowrap">
        <h2>Current Goals</h2>
        <span>
            <ol>
                { (currentUser) ? currentUser.userData.goals.map((goal, i) => {
                    
                    //decide if goal should be displayed. Does it need to be completed?
                    return (<li key={`${goal.title}-${i}`}>{goal.title}</li>)
                }) : (<li>...</li>)
                }
            </ol>
        </span>

    </div>
);
}

export default CurrentGoals;