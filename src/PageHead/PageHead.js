import React from "react";
import "./PageHead.css";
// import { connectToRandomChat } from "../socket/socket";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Loader from "../Component/Loader/Loader";

class PageHead extends React.Component {
  state = {
    email: "",
    loading: true,
    error: "",
    token: "",
  };

  onStartHandler = () => {
    console.log("CONNECT TO RANDOM CHAT..");
    this.setState({ loading: true });
    axios
      .post(
        "http://104.161.92.74:1211/api/auth/login",
        {
          deviceId: new Date().getTime(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        this.setState({ loading: false, token: res.data.token });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  onKeyUpHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    let redirect = null;
    if (this.state.token) {
      redirect = <Redirect to={"/chat-box?token=" + this.state.token} />;
    }

    return (
      <div className="wrapper-containers">
        {this.state.loading ? <Loader /> : null}
        {redirect}
        <h3>Welcome to ChatBot</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={this.state.email}
            onChange={this.onKeyUpHandler}
          />
        </div>

        <button className="btn btn-success" onClick={this.onStartHandler}>
          START CHAT
        </button>
      </div>
    );
  }
}

export default PageHead;
