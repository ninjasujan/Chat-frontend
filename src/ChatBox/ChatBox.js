import React from "react";
import io from "socket.io-client";

// import avatar from "../Assets/chat.jpg";
// import avatar2 from "../Assets/chat2.jpg";
import "./ChatBox.css";

const END_POINT = "http://104.161.92.74:1211/";

// import { JoinChatevent, connectToRandomChat } from "../socket/socket";
class ChatBox extends React.Component {
  state = {
    waiting: "",
    chat: "",
    message: "",
    messagesList: [],
  };

  socket = null;

  onChangeHandler = (e) => {
    this.setState({ message: e.target.value });
  };

  onSubmiChat = () => {
    this.socket.emit("send_anonymous_message", {
      body: {
        message: this.state.message,
      },
    });
  };

  componentDidMount() {
    let token = this.props.location.search.split("=")[1];
    this.socket = io(END_POINT, {
      transports: ["websocket", "polling", "flashsocket"],
      query: {
        token: token,
      },
    });

    this.socket.emit("join_anonymous_chat");

    this.socket.on("anonymous_chat_joined", (data) => {
      this.setState({ waiting: data.data.message, chat: "" });
    });

    this.socket.on("anonymous_chat_waiting", (data) => {
      this.setState({ chat: data.data.message, waiting: "" });
    });

    this.socket.on("anonymous_message_received", (data) => {
      console.log("Message received: ", data.data.message);
      const oldList = [...this.state.messagesList];
      oldList.push({
        message: data.data.message,
        time: new Date().toISOString().substr(0, 10),
      });

      this.setState({
        messagesList: [...oldList],
      });
    });
  }

  render() {
    console.log("Message List: ", this.state.messagesList);
    return (
      <div className="chat-box">
        <div className="chat-list">
          <h3>Welcome To Chat Box</h3>

          {this.state.waiting ? (
            <div className="container darker">
              <span className="time-right">{this.state.waiting}</span>
            </div>
          ) : null}

          {this.state.chat ? (
            <div className="container darker">
              <span className="time-left">{this.state.chat}</span>
            </div>
          ) : null}

          {/* <div className="container">
            <img src={avatar} alt="Avatar" />
            <p>Sweet! So, what do you wanna do today?</p>
            <span className="time-right">11:02</span>
          </div> */}
          {this.state.messagesList.map((chat) => (
            <div className="container chat-message darker">
              <p>{chat.message}</p>
              <span className="time-left">{chat.time}</span>
            </div>
          ))}

          <div className="container">
            <div className="input-box">
              <input
                type="text"
                placeholder="Type something..."
                value={this.state.message}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="button-box">
              <button className="btn btn-success" onClick={this.onSubmiChat}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
