import "./App.css";
import React from "react";

import ChatBox from "./ChatBox/ChatBox";
import PageHead from "./PageHead/PageHead";
import { Route, Switch } from "react-router-dom";
// import "./socket/socket";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={PageHead} />
          <Route exact path="/chat-box" component={ChatBox} />
        </Switch>
      </div>
    );
  }
}

export default App;
