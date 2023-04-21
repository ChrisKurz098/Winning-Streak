import { useContext } from "react";
import CurrentGoals from "../../components/CurrentGoals/CurrentGoals.component.jsx";
import GolaList from "../../components/GoalList/GoalList.component.jsx";
import UserStats from "../../components/userStats/UserStats.component.jsx";


import "./home.styles.scss"
import { UserContext } from "../../contexts/user.context.jsx";
import Button from "../../components/Button/Button.component.jsx";
import { useNavigate } from "react-router-dom";

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
