import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./goalList.styles.scss"
import GoalListItems from "../GoalListItems/GoalListItems.component";

const GoalList = () => {

return (
    <div className="goal-list-container nowrap dashboard-item">
        <h2>Goal List</h2>
        <span>
            <ol className="goal-list">
            <GoalListItems/>
            </ol>
        </span>

    </div>
);
}

export default GoalList;