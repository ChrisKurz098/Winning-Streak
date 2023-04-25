import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./userStats.styles.scss"

const UserStats = () => {
const {currentUser} = useContext(UserContext);

const {points, rank, goals} = currentUser.userData;
if (currentUser) {
    return  (
        <div className="user-stats-container nowrap dashboard-item">
            <h2>{`${currentUser.displayName}'s Stats`}</h2>
          <h3>{`Score: ${points}`}</h3>
          <span>
          <h3>Rank:</h3>
          <h1>{`${rank}`}</h1>
          </span>
          
    
        </div>
    );
} else {return (<></>)}

}

export default UserStats;