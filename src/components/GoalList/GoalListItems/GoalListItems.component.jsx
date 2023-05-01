import { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../../../contexts/user.context";



import "./goalListItems.styles.scss";
import MaxGoalView from "../MaxGoalView/MaxGoalView.componet";
import MinGoalView from "../MinGoalView/MinGoalView.componet";
import PopUpMenu from "../../PopUpMenu/PopUpMenu.component";


const GoalListItems = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const [menu, setMenu] = useState(false)
    const selectedEl = useRef(null);

    const handleExpand = (i, e) => {

        if (e.target.className === 'min-view-container') {
            setSelectedGoal(old => {
                return (old === i) ? null : i;
            });
        }

    };

    const handleDelete = (i) => {
        setMenu(false); //close menu
        if (i <0 ) return; //if -1 is returned, the user input was no. 
        
        //modify userData and remove selected goal
        setCurrentUser(old => {
            old.userData.goals.splice(i, 1);
            return { ...old }
        })
        
        setSelectedGoal(null);
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

                            <PopUpMenu callback={handleDelete} message={`Are you sure you want to delete this goal forever?`} returns={[i, -1]} style={{ display: (selectedGoal === i && menu) ? 'flex' : 'none' }} />

                            <button type="button" onClick={() => setMenu(old => (!old))} style={{ "display": selectDisplayToggle(i) }}>delete</button>

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