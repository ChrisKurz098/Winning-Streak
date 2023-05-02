import { useContext, useEffect } from "react";
import WeekView from "./WeekView/WeekView.component";
import moment from "moment/moment";
import { UserContext } from "../../../contexts/user.context";
const MaxGoalView = ({ i, goal, style }) => {
const {currentUser, setCurrentUser} = useContext(UserContext);
    const {
        description,
        missedGoalCounter,
        weeklyInterval,
        goalDays,
        numberOfDays,
        startDate
    } = goal;

    useEffect(() => {
        //check the weekly interval and open all the days if interval has passed
        //Do this by checking the timestamp of the last interval change to the date

    }, [])


    const handleDayCompleted = (i, j) => {
        const dayCompleted = () => {
            //add points
            //check if goal is finished for interval
            //If goal is met, add bonus points
            //dont uncheck days. Leave that to useEffect.
            //Display special icon like a big check mark to let user knnow they have finished goal fro that interval
            //display next interval start date
            toggleDay(i, j);
        };

        /*
        if (day has already been checked off)
        
        if (day isnt on a target day) {
            message: 'This day is not a target day. You can count this day but you will not recive full points
            choice: ['Select this day', 'Don't select this day']
            onConfirm: dayCompleted()
        };
        if (day of week != selected day) {
            message: 'Don't forget to check off your goals on the day of to recive bonus points!'
            choice: ['OK', Null]
            onConfirm: dayCompleted()
        }    
 
       
        */

    };

    const toggleDay = (i, j) => {
        const oldVal = currentUser.userData.goals[i].daysCompleted[j];
        setCurrentUser(old => {
            old.userData.goals[i].daysCompleted[j] = !oldVal;
            return { ...old };
        })
    };



return (
    <div className="max-view-container"
        style={style}
    >
        <p>Description: {description}</p>
        <p>Start Date: {startDate}</p>
        <p>diif: {moment(startDate).diff(moment("5/9/2023"), 'weeks')}</p>
        <p>Misses: {missedGoalCounter}</p>
        <p>Every {(weeklyInterval === 1) ? "Week" : `${weeklyInterval} Weeks`}</p>
        <h5 className="any-day-indicator" style={{ display: (goalDays[7]) ? 'block' : 'none' }}>------ Complete on Any {(numberOfDays === 1) ? "Day" : `${numberOfDays} Days`} for Max Points!  ------</h5>
        <h5 className="any-day-indicator" style={{ display: (goalDays[7]) ? 'none' : 'block' }}>------ Complete on Highlighted Days for Max Points!  ------</h5>
        {/*------------Make Seperate Component--------------*/}
        <WeekView i={i} goal={goal} />
    </div>

)
};

export default MaxGoalView;