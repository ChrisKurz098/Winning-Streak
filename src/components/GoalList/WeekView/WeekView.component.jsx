import { createRef, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../contexts/user.context";
import { daysArray } from "../../../utils/userData/userDataFunctions";

import moment from "moment/moment";
import usePopup from "../../../contexts/popup.context";
import useSound from "../../../contexts/useSound.context";
const WeekView = ({ i, goal }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { createPopup } = usePopup();
    const {playSound} = useSound();

    const [animateDay, setAnimateDay] = useState(null);

    const pointsAnimation = useRef([createRef(), createRef(), createRef(), createRef(), createRef(), createRef(), createRef()]);



    const {
        daysCompleted,
        weeklyInterval,
        goalDays,
        lastInterval,
    } = goal;

    const today = moment().format("YYYY-MM-DD");

    //---Check for interval end on render
    useEffect(() => {


        setAnimateDay(null);
        //check the weekly interval and open all the days if interval has passed
        const weeksAgo = moment(today).diff(moment(lastInterval), 'weeks');

        //Make condition for vacation mode
        if (weeksAgo >= weeklyInterval) {
            const newIntervalStart = moment(lastInterval).add(7 * weeklyInterval, 'days').format("YYYY-MM-DD");

            setCurrentUser(old => {
                //this makes sure to set the next interval to one week * interval from the last interval
                if (old.userData.goals[i].intervalComplete) {
                    old.userData.totalStreak += 1;
                    old.userData.goals[i].missedGoalCounter = 0;
                } else {
                    old.userData.goals[i].missedGoalCounter += 1;
                    old.userData.goals[i].totalMissedGoalCounter += 1
                }

                old.userData.goals[i].lastInterval = newIntervalStart;
                old.userData.goals[i].intervalComplete = false;
                old.userData.goals[i].daysCompleted = [false, false, false, false, false, false, false];

                return { ...old };
            });

        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const handleDayCompleted = (i, j) => {

        const {
            goalDays,
            numberOfDays,
        } = currentUser.userData.goals[i];

        let data = { ...currentUser.userData };

        let awardedScoreIndex = 0; //index of array for awarded score 0 best, 2 worst
        const awardedScore = [200, 100, 50];

        const todaysRelativeIndex = daysArray.indexOf(moment(today).format('dddd'));

        //Callback for confirmation
        const dayCompleted = () => {
            playSound('congrats');
            setAnimateDay(j);
            setCurrentUser(old => {
                data.goals[i].daysCompleted[j] = true;
                //check if goal is finished for interval
                if (numberOfDays <= data.goals[i].daysCompleted.filter(x => (x)).length) {
                    data.goals[i].intervalComplete = true;
                    data.goals[i].currentStreak += 1;
                };

                data.score += awardedScore[awardedScoreIndex];

                return { ...old, userData: data };
            })
        };

        switch (true) {
            case (data.goals[i].intervalComplete): return;
            case (!goalDays[j] && !goalDays[7]):
                awardedScoreIndex = 2
                createPopup({
                    message: 'This day is not a target day. You can count this day but you will receive half points',
                    answesrs: ["Select this day", "Don't select this day"],
                    onConfirm: dayCompleted
                })
                return;
                ;
            case (todaysRelativeIndex !== j):
                awardedScoreIndex = 1;
                createPopup({
                    message: "Don't forget to check off your goals on the day-of to get double points!",
                    answesrs: ["OK", "Cancel"],
                    onConfirm: dayCompleted
                })
                return;
                ;
            default:
                awardedScoreIndex = 0;
                dayCompleted();
        }
    };

    return (
        <div className="day-box-container">

            {goalDays.map((day, j) => {
                if (j === 7) return false;
                return (<span key={`${day}-box-${j}`}
                    className={`day-box ${(goalDays[7] || day) ? 'selected-day' : ''} ${(daysCompleted[j]) ? "completed-day" : ""}`}
                    style={{ animation: (animateDay === j) ? 'dayCheckoff 2s' : '' }}
                    onClick={() => handleDayCompleted(i, j)}>
                    <h4>{daysArray[j]}</h4>
                    <span ref={pointsAnimation.current[j]} className="points-animation">+100</span>
                </span>)
            })}
        </div>
    )
}

export default WeekView;

