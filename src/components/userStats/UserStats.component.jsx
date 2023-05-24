import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";

import "./userStats.styles.scss"

const UserStats = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const { score, rank, totalStreak, tokens, totalMisses } = currentUser.userData;

    useEffect(() => {
        console.log('UPDATE RANK.....')
        let newRank = 0;
        const rankInterval = 5; //this decides how many completed goals are needed for a rank gain
        //change this from a grade to a title
        const rankArray = ['F', 'D-', 'D', 'D+',
            'C-', 'C', 'C+',
            'B-', 'B', 'B+',
            'A-', 'A', 'A+',
            'S', 'SS', 'SSS'];

        const rankValueDiff = (totalStreak - (totalMisses * 2));
        let rankIndex = Math.floor((rankValueDiff / rankInterval) + 5);
        newRank = rankArray[rankIndex];

        setCurrentUser(old => ({ ...old, userData: {...old.userData, rank: newRank} }))
    }, [currentUser.userData.totalStreak, currentUser.userData.totalMisses])


    if (currentUser) {
        return (
            <div className="user-stats-container nowrap dashboard-item">
                <h2>{`${currentUser.displayName}'s Stats`}</h2>
                <h3>{`Score: ${score}`}</h3>
                <h3>{`Total Streaks: ${totalStreak}`}</h3>
                <h3>{`Tokens: ${tokens}`}</h3>
                <span>
                    <h3>Rank:</h3>
                    <h1>{`${rank}`}</h1>
                </span>


            </div>
        );
    } else { return (<></>) }

}

export default UserStats;