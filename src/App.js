import "./reset.css";
import "./App.css";
import { withRouter } from "react-router-dom";
import Header from "./Components/Header";
import routes from "./routes";

function App(props) {
  return (
    <div className="full-app">
      <div className="App">
        {props.location.pathname === "/auth" ||
        props.location.pathname === "/register" ? null : (
          <Header />
        )}
        {routes}
      </div>
    </div>
  );
}

export default withRouter(App);
