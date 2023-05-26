
const MinGoalView = ({ goal }) => {

    const {
        typeSelect,
        title,
        currentStreak,
        intervalComplete
    } = goal;


    return (
        <div className="min-view-container">

            <span className="goal-type-check">
                <img alt='goal icon' src={`icons/${typeSelect}.png`} />
                <img alt="check mark" className="check-mark" src={`icons/checkmark.png`} style={{ opacity: (intervalComplete) ? '100%' : '0%', animation: (intervalComplete) ? '' : 'none' }} />
            </span>
            <h3 className="goal-list-title">{title}</h3>
       
            <span className="streak-display-container">
                <h3>Streak:</h3>
                <p>{(currentStreak) ? currentStreak : 0}</p>
            </span>
        </div>

    )
};

export default MinGoalView;