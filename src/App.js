import NavigationBar from "./routes/NavigationBar/NavigationBar.component";
import Home from "./routes/Home/Home.components";
import UserAuth from "./routes/UserAuth/UserAuth.component";
import { Route, Routes } from "react-router";
import CreateGoal from "./routes/CreateGoal/CreateGoal.component";


const App = () => {


  return (
    <>
      <Routes>
        <Route exact path='/' element={<NavigationBar />}>
          <Route index element={<Home/>} />
          <Route path="/signin" element={<UserAuth/>} />
          <Route path="/new" element={<CreateGoal/>} />
        </Route>
      </Routes>

    </>
  );
};

export default App;
