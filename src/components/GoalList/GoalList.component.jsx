import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./goalList.styles.scss"

const GoalList = () => {
const {currentUser} = useContext(UserContext);

return (
    <div className="goal-list-container nowrap dashboard-item">
        <h2>Goal List</h2>
        <span>
            <ol>
                { (currentUser) ? (currentUser.userData.goals.map((goal, i) => (<li key={`${goal.title}-${i}`}>{goal.title}</li>))) : (<li>Loading Goals...</li>)}
            </ol>
        </span>

    </div>
);
}

export default GoalList;