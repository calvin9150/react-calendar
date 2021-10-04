import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import "./App.css";
import Main from "./pages/Main";
import { history } from "./redux/configureStore";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
      </ConnectedRouter>
    </>
  );
}

export default App;
