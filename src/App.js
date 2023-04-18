import NavigationBar from "./routes/NavigationBar/NavigationBar.component";
import Home from "./routes/Home/Home.components";
import UserAuth from "./routes/UserAuth/UserAuth.component";
import { Route, Routes } from "react-router";


const App = () => {


  return (
    <>
      <Routes>
        <Route path='/' element={<NavigationBar />}>
          <Route index element={<Home/>} />
          <Route path="/signin" element={<UserAuth/>} />
        </Route>
      </Routes>

    </>
  );
};

export default App;
