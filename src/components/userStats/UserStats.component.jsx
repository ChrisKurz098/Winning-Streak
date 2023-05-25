import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";

import "./userStats.styles.scss"
import usePopup from "../../contexts/popup.context";

const UserStats = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const { createPopup } = usePopup();

    const { score, rank, totalStreak, tokens, totalMisses } = currentUser.userData;

    useEffect(() => {
        let newRank = 0;
        const rankInterval = 5; //this decides how many completed goals are needed for a rank gain
        const missesMultiplier = 2; //this decides how much a miss will dock your rank
        //change this from a grade to a title
        const rankArray =
            ['F', 'D-', 'D', 'D+',
                'C-', 'C', 'C+',
                'B-', 'B', 'B+',
                'A-', 'A', 'A+',
                'S', 'SS', 'SSS'];

        const rankValueDiff = (totalStreak - (totalMisses * missesMultiplier));
        let rankIndex = Math.floor((rankValueDiff / rankInterval) + 5);
        newRank = rankArray[rankIndex];
        const oldRankIndex = rankArray.indexOf(rank);

        if (oldRankIndex !== rankIndex) updateRank(); // if rank is actually different than before and isn't an F (0), run async function

        async function updateRank() {
            if (oldRankIndex <= 0 && rankIndex < oldRankIndex) return;
            if (newRank > rankArray.length - 1) return;

            const popUpMessage = (rankIndex > oldRankIndex) ? (`Congratulations! You have advanced to rank ${newRank}`) : (`Sorry, you have missed one or more of your goals ! You have dropped to rank ${newRank}.`);

            await createPopup({
                message: popUpMessage,
                answers: ['Yay!']
            });
            setCurrentUser(old => ({ ...old, userData: { ...old.userData, rank: newRank } }));
        };
    }, [currentUser.userData.totalStreak, currentUser.userData.totalMisses])

    if (currentUser) {
        return (
            <div className="user-stats-container nowrap dashboard-item">
                <h2 className="display-name-stats">{`${currentUser.displayName}'s Stats`}</h2>
                <span className="stats-container">
                    <h3 className="score">{`Score: ${score}`}</h3>

                    <span className="rank">
                        <h3>Rank:</h3>
                        <h3>{`${rank}`}</h3>
                    </span>

                    <span className="stats-totals">
                        <h3>{`Total Streaks: ${totalStreak}`}</h3>
                        <h3>{`Total Missed Goals: ${totalMisses}`}</h3>
                    </span>

                    <h3 className="tokens">{`Tokens: ${tokens}`}</h3>
                </span>




            </div>
        );
    } else { return (<></>) };

}

export default UserStats;