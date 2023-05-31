import { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../../../contexts/user.context";

import MaxGoalView from "../MaxGoalView/MaxGoalView.componet";
import MinGoalView from "../MinGoalView/MinGoalView.componet";
import usePopup from "../../../contexts/popup.context";

import "./goalListItems.styles.scss";

const GoalListItems = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [selectedGoal, setSelectedGoal] = useState(null);
    const { createPopup, closePopup } = usePopup();

    const selectedEl = useRef(null);

    const handleExpand = (i, e) => {
        console.log(e.target.className)
        //this should be changed to only work when a tab element is clicked. element needs to be added first
        if (e.target.className !== 'day-box selected-day ' &  e.target.className !== 'day-box-name' ) {
            setSelectedGoal(old => {
                return (old === i) ? null : i;
            });
        }
    };

    const handleDelete = (i) => {
        //this is the callback function that will be used when the user selects yes or no
        const performDelete = () => {
            setCurrentUser(old => {
                old.userData.goals.splice(i, 1);
                return { ...old }
            });
            setSelectedGoal(null);
            closePopup();
        }
        //this will update the popup and make the popup visable. make the above function the callback with onConfirm
        createPopup({
            message: 'Are you sure you want to delete this goal forever?',
            onConfirm: performDelete
        });
    };

    const selectDisplayToggle = (i) => {
        //this retruns the needed CSS display type depending on if the clicked taget is the selecteed goal
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
                            onClick={(e) => { handleExpand(i, e) }}
                            className={`goal-item-container ${(selectedGoal === i) ? "selected-item" : ""}`}>
                            <button type="button" className="delete-button" onClick={() => handleDelete(i)} style={{ "display": selectDisplayToggle(i) }}>delete</button>

                            <MinGoalView goal={goal} />

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