import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import GolaList from "../../components/GoalList/GoalList.component.jsx";
import UserStats from "../../components/userStats/UserStats.component.jsx";
import Button from "../../components/Button/Button.component.jsx";

import { UserContext } from "../../contexts/user.context.jsx";

import "./home.styles.scss"

const Home = () => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate();

  if (!currentUser) return (<div className="loading-message"> <p> Gathering user data...</p></div>)

  return (
    <div className="home-container">
      <span className="stats-calander-container">
        <UserStats />
      </span>
      <span className="goals-container">
      <GolaList />
        <Button buttonType='button' type='button' onClick={() => { navigate('/new') }}> Add New Goal</Button>
      </span>
    </div>
  );
};

export default Home;
