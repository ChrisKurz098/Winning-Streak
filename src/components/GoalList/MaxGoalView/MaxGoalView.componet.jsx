import WeekView from "./WeekView/WeekView.component";

const MaxGoalView = ({i, goal, style}) => {

    const {
        description,
        missedGoalCounter,
        weeklyInterval,
        goalDays,
        numberOfDays,
    } = goal;

return (
    <div className="max-view-container"
    style={style}
    >
    <p>Description: {description}</p>
    {/* <p>Start Date: {startDate.toISOString()}</p> */}
    <p>Misses: {missedGoalCounter}</p>
    <p>Every {(weeklyInterval === 1) ? "Week" : `${weeklyInterval} Weeks`}</p>
    <h5 className="any-day-indicator" style={{ display: (goalDays[7]) ? 'block' : 'none' }}>------ Complete on Any {(numberOfDays === 1) ? "Day" : `${numberOfDays} Days`} for Max Points!  ------</h5>
    <h5 className="any-day-indicator" style={{ display: (goalDays[7]) ? 'none' : 'block' }}>------ Complete on Highlighted Days for Max Points!  ------</h5>
{/*------------Make Seperate Component--------------*/}
<WeekView i={i} goal={goal}/>
</div>

)
};

export default MaxGoalView;