import GolaList from "../../components/GoalList/GoalList.component.jsx";

import "./home.styles.scss"

const Home = () => {


  return (
     <div className="home-container">
      <span className="goals-container">
      <GolaList/>
      </span>
      
      <span className="stats-calander-container">

      </span>
     </div>
  );
};

export default Home;
