import WeekView from "../WeekView/WeekView.component";
import moment from "moment/moment";

const MaxGoalView = ({ i, goal, style }) => {
    
    const {
        missedGoalCounter,
        weeklyInterval,
        goalDays,
        numberOfDays,
        startDate,
        lastInterval
    } = goal;

    

    const today = moment().format("MM/DD/YYYY");
    const remainingDays = (7*weeklyInterval) -   moment(today).diff(moment(lastInterval), 'days') 


    return (
        <div className="max-view-container"
            style={style}
        >
            <p>Start Date: {startDate}</p>
            <p>Last Interval: {lastInterval}</p>
            <p>Remaining Days: {remainingDays}</p>
            <p>Misses: {missedGoalCounter}</p>
            <p>Every {(weeklyInterval === 1) ? "Week" : `${weeklyInterval} Weeks`}</p>
            <h5 className="any-day-indicator" style={{ display: (goalDays[7]) ? 'block' : 'none' }}>------ Complete on Any {(numberOfDays === 1) ? "Day" : `${numberOfDays} Days`} for Max Points!  ------</h5>
            <h5 className="any-day-indicator" style={{ display: (goalDays[7]) ? 'none' : 'block' }}>------ Complete on Highlighted Days for Max Points!  ------</h5>
            
            <WeekView i={i} goal={goal} />
        </div>

    )
};

export default MaxGoalView;