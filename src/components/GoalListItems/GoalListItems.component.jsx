import { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../../contexts/user.context";

import "./goalListItems.styles.scss";

const GoalListItems = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const selectedEl = useRef(null);

    const handleMouseClick = (i, e) => {
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

    useEffect(() => {
        if (selectedGoal !==null) selectedEl.current.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'start'});
    }, [selectedGoal]);

    if (currentUser) {
        return (
            <>
                {currentUser.userData.goals.map((goal, i) => {
                    return (
                        <li key={`${goal.title}-${i}`}
                            ref={((selectedGoal === i) ? selectedEl : null)}
                            onClick={(e) => { handleMouseClick(i, e); }}
                            className={`goal-item-container ${(selectedGoal === i) ? "selected-item" : ""}`}>
                            <button type="button" onClick={() => { handleDelete(i) }} style={{ "display": selectDisplayToggle(i) }}>delete</button>
                            <span className="min-view-container">
                                <img alt='goal icon' src={`icons/${goal.typeSelect}.png`} />
                                <h3
                                    className="goal-list-item"
                                >{goal.title}</h3>

                                <span className="streak-display-container">
                                    <h3>Streak:</h3>
                                    <p>{(goal.currentStreak) ? goal.currentStreak : 0}</p>
                                </span>
                            </span>

                            <span className="max-view-container"
                                style={{ "display": selectDisplayToggle(i) }}>
                                <p>Description: {goal.description}</p>
                                <p>Weekly Interval: {goal.weeklyInterval}</p>
                                <p>Start Date: {goal.startDate}</p>
                                <p>Misses: {goal.missedGoalCounter}</p>
                                <p>Days: {goal.goalDays.toString()}</p>
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