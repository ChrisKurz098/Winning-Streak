import { useContext } from "react";
import { UserContext } from "../../../../contexts/user.context";
import { daysArray } from "../../../../utils/userData/userDataFunctions";
const WeekView = ({i,goal}) => {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const {
        goalDays,
        daysCompleted
    } = goal;

    const handleDayCompleted = (i, j) => {
        const oldVal = currentUser.userData.goals[i].daysCompleted[j];
        setCurrentUser(old => {
            old.userData.goals[i].daysCompleted[j] = !oldVal;
            return { ...old };
        })

    };

    return(

        <div className="day-box-container">
        
        {goalDays.map((day, j) => {
            if (j === 7) return;
           
            return (<span key={`${day}-box-${j}`}
                className={`day-box ${(goalDays[7] || day ) ? 'selected-day' : ''} ${(daysCompleted[j]) ? "completed-day" : ""}`}
                onClick={() => handleDayCompleted(i, j)}>
                <h4>{daysArray[j]}</h4>
            </span>)
        })}

    </div>
    )
}

export default WeekView;