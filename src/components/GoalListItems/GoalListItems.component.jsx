import { useContext, useState } from "react"
import { UserContext } from "../../contexts/user.context";

import "./goalListItems.styles.scss";

const GoalListItems = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const handleMouseClick = (i) => {
        setSelectedGoal(old => {
            return (old === i) ? null : i;
        });
    };

    const handleDelete = (i) => {
        console.log('delete goal index: ', i)
        setCurrentUser(old => {
            old.userData.goals.splice(i, 1);
            return { ...old }
        })
    }

    const selectDisplayToggle = (i) => {
        return (selectedGoal === i) ? "block" : "none"
    }
    if (currentUser) {
        return (
            <>
                {currentUser.userData.goals.map((goal, i) => {
                    return (
                        <li key={`${goal.title}-${i}`}
                            onClick={() => { handleMouseClick(i); }}
                            className={`goal-item-container ${(selectedGoal === i) ? "selected-item" : ""}`}>
                            <button type="button" onClick={() => { handleDelete(i) }} style={{ "display": selectDisplayToggle(i) }}>delete</button>
                            <span className="min-view-container">
                                <img alt='goal icon' src={`icons/${goal.typeSelect}.png`} />
                                <h3
                                    className="goal-list-item"
                                >{goal.title}</h3>
                            </span>

                            <span className="max-goal-container"
                                style={{ "display": selectDisplayToggle(i) }}>
                                <p>Description: {goal.description}</p>
                            </span>
                        </li>
                    );

                })}

            </>
        )
    } else {
        return (<li>Loading Goals...</li>)
    }

};

export default GoalListItems;