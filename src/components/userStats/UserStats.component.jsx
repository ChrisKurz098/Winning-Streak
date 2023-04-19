import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./userStats.styles.scss"

const UserStats = () => {
const {currentUser} = useContext(UserContext);
if (currentUser) {
    return  (
        <div className="user-stats-container nowrap">
            <h2>{`${currentUser.displayName}'s Stats`}</h2>
            <span>
                <ul>
                    { (currentUser) ? Object.entries(currentUser.userData).map(([key, value], i) => {
                     return (key !== "goals") ?  (<li key={`${key}-${i}`}>{`${key}: ${value}`}</li>) : ('');
                    }) 
                    :
                     (<li>Loading Stats...</li>)}
                     <li>{`Total Goals: ${currentUser.userData.goals.length}`}</li>
                </ul>
            </span>
    
        </div>
    );
} else {return (<></>)}

}

export default UserStats;