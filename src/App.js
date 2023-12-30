import "./App.css";
import "bulma/css/bulma.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Restore from "./pages/Restore";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/restore" component={Restore} />
    </Switch>
  );
}

export default App;
