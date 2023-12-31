import { Redirect, Route } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = (props) => {
  let token = null;
  const jsonData = sessionStorage.getItem("username");
  if (jsonData) {
    token = JSON.parse(jsonData);
  }
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
