import "./App.css";
import "bulma/css/bulma.min.css";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Restore from "./pages/Restore";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/restore" component={Restore} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
