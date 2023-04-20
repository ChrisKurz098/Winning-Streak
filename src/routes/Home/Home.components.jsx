import { useContext } from "react";
import CurrentGoals from "../../components/CurrentGoals/CurrentGoals.component.jsx";
import GolaList from "../../components/GoalList/GoalList.component.jsx";
import UserStats from "../../components/userStats/UserStats.component.jsx";


import "./home.styles.scss"
import { UserContext } from "../../contexts/user.context.jsx";

const Home = () => {
  const {currentUser} = useContext(UserContext)

  if (!currentUser) return (<div className="loading-message"> <p> Gathering user data...</p></div>)


  return (
    <div className="home-container">
      <span className="goals-container">
        <CurrentGoals />
        <GolaList />
      </span>

      <span className="stats-calander-container">
        <UserStats />
      </span>
    </div>
  );
};

export default Home;
