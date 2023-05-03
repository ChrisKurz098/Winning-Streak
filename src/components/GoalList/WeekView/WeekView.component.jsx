import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/user.context";
import { daysArray } from "../../../utils/userData/userDataFunctions";
import PopUpMenu from "../../PopUpMenu/PopUpMenu.component";

import moment from "moment/moment";
import usePopup from "../../../contexts/popup.context";
const WeekView = ({ i, goal }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { createPopup, closePopup } = usePopup();

    const {
        daysCompleted,
        missedGoalCounter,
        weeklyInterval,
        goalDays,
        numberOfDays,
        startDate,
        lastInterval,
        intervalComplete
    } = goal;

    const today = moment().format("MM/DD/YYYY");

    //---Check for interval end on render
    useEffect(() => {
        //check the weekly interval and open all the days if interval has passed
        const weeksAgo = moment(today).diff(moment(lastInterval), 'weeks');
        //Make condition for vacation mode
        if (weeksAgo >= weeklyInterval) {
            console.log("Week interval met: ", weeksAgo)
            console.log("Setting new interval")

            setCurrentUser(old => {
                //this makes sure to set the next interval to one week * interval from the last interval
                old.userData.goals[i].lastInterval = moment(lastInterval).add(7 * weeklyInterval, 'days');
                old.userData.goals[i].intervalComplete = false;
                return { ...old };
            });

        } 

    }, [])



    const handleDayCompleted = (i, j) => {

        const {
            daysCompleted,
            missedGoalCounter,
            weeklyInterval,
            goalDays,
            numberOfDays,
            startDate,
            lastInterval,
            
        } = currentUser.userData.goals[i];

        let data = {...currentUser.userData} ;

        let awardedScoreIndex = 0; //index of array for awarded score 0 best, 2 worst
        const awardedScore = [150, 100, 50];

        const todaysRelativeIndex = daysArray.indexOf(moment(today).format('dddd'));


        //Callback for confirmation
        const dayCompleted = () => {
            setCurrentUser(old => {
                if (numberOfDays-1 <= daysCompleted.filter(x => (x)).length) data.goals[i].intervalComplete = true;
                data.goals[i].daysCompleted[j] = true;
                data.score += awardedScore[awardedScoreIndex];
                data.goals[i].currentStreak += 1;
                return { ...old, userData: data };
            })
            //add points
            //check if goal is finished for interval
            //If goal is met, add bonus points
            //dont uncheck days. Leave that to useEffect.
            //Display special icon like a big check mark to let user knnow they have finished goal fro that interval
            //display next interval start date
        };


        switch (true) {
            case (data.goals[i].daysCompleted[j]): return;
            case (!goalDays[todaysRelativeIndex] && !goalDays[7]): {
                awardedScoreIndex = 2
                createPopup({
                    message: 'This day is not a target day. You can count this day but you will recive half points',
                    answesrs: ["Select this day", "Don't select this day"],
                    onConfirm: dayCompleted
                })
                return;
            };
            case (todaysRelativeIndex !== j): {
                awardedScoreIndex = 1;
                createPopup({
                    message: "Don't forget to check off your goals on the day-of to get bonus points!",
                    answesrs: ["OK", "Cancle"],
                    onConfirm: dayCompleted
                })
                return;
            }
            default: {
                awardedScoreIndex = 0;
                dayCompleted();
            }
        }


    };

    return (
        <div className="day-box-container">

            {goalDays.map((day, j) => {
                if (j === 7) return;

                return (<span key={`${day}-box-${j}`}
                    className={`day-box ${(goalDays[7] || day) ? 'selected-day' : ''} ${(daysCompleted[j]) ? "completed-day" : ""}`}
                    onClick={() => handleDayCompleted(i, j)}>
                    <h4>{daysArray[j]}</h4>
                </span>)
            })}
        </div>
    )
}

export default WeekView;