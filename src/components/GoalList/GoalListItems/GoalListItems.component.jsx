import { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../../../contexts/user.context";



import "./goalListItems.styles.scss";
import MaxGoalView from "../MaxGoalView/MaxGoalView.componet";
import MinGoalView from "../MinGoalView/MinGoalView.componet";


const GoalListItems = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const selectedEl = useRef(null);

    const handleExpand = (i, e) => {

        if (e.target.className === 'min-view-container') {
            setSelectedGoal(old => {
                return (old === i) ? null : i;
            });
        }

    };

    const handleDelete = (i) => {
        setCurrentUser(old => {
            old.userData.goals.splice(i, 1);
            return { ...old }
        })
    };

    const selectDisplayToggle = (i) => {
        return (selectedGoal === i) ? "block" : "none"
    };



    useEffect(() => {
        if (selectedGoal !== null) selectedEl.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, [selectedGoal]);

    if (currentUser) {
        return (
            <>
                {currentUser.userData.goals.map((goal, i) => {
                    return (
                        <li key={`${goal.title}-${i}`}
                            ref={((selectedGoal === i) ? selectedEl : null)}
                            onClick={(e) => { handleExpand(i, e); }}
                            className={`goal-item-container ${(selectedGoal === i) ? "selected-item" : ""}`}>

                            <button type="button" onClick={() => { handleDelete(i) }} style={{ "display": selectDisplayToggle(i) }}>delete</button>
{/*------------Make Seperate Component--------------*/}                            
                              <MinGoalView goal={goal}/>
{/*------------Make Seperate Component--------------*/}
<MaxGoalView i={i} goal={goal} selectedGoal={selectedGoal} style={{ "display": selectDisplayToggle(i) }} />
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