import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";

import { history } from "./redux/configureStore";
import Edit from "./pages/Edit";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/write" exact component={Edit} />
      </ConnectedRouter>
    </>
  );
}

export default App;
