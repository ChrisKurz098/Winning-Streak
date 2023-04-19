import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./goalList.styles.scss"

const GoalList = () => {
const {currentUser} = useContext(UserContext);

return (
    <div className="goal-list-container">
        <h2>Goal List</h2>
        <span>
            <ol>
                { (currentUser !== null) ? Object.entries(currentUser.userData.goals).map(([key, value], i) => (<li key={`${key}-${i}`}>{key}</li>)) : (<li>Loading Goals...</li>)}
            </ol>
        </span>

    </div>
);
}

export default GoalList;