
const MinGoalView = ({goal}) => {

    const {
        typeSelect,
        title,
        currentStreak,
        intervalComplete
    } = goal;


return (
    <div className="min-view-container">
    <img alt='goal icon' src={`icons/${typeSelect}.png`} />
    <img alt="check mark" src={`icons/checkmark.png`} style={{display: (intervalComplete) ? '' : 'none'}}/>
    <h3
        className="goal-list-item"
    >{title}</h3>

    <span className="streak-display-container">
        <h3>Streak:</h3>
        <p>{(currentStreak) ? currentStreak : 0}</p>
    </span>
</div>

)
};

export default MinGoalView;