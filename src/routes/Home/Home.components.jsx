import CurrentGoals from "../../components/CurrentGoals/CurrentGoals.component.jsx";
import GolaList from "../../components/GoalList/GoalList.component.jsx";
import UserStats from "../../components/userStats/UserStats.component.jsx";

import "./home.styles.scss"

const Home = () => {


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
