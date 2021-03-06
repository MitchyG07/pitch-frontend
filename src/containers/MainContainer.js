import React from "react";
import Login from "../components/Login.js";
import { Route, withRouter } from "react-router-dom";
import IntervalContainer from "./IntervalContainer";
import Navi from "../components/Navi";
import ChordContainer from "./ChordContainer";
import PerfectContainer from "./PerfectContainer";
import Profile from "../components/Profile";

const API = "http://localhost:3000";

class MainContainer extends React.Component {
  state = {
    user: {},
    error: false,
    chordResult: [],
  };

  persistUser = (token) => {
    fetch(API + "/persist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.username) {
          const { username, id } = data;
          this.setState({
            user: {
              username,
              id,
            },
          });
        }
      });
  };

  handleAuthResponse = (data) => {
    if (data.username) {
      const { username, id, token } = data;
      this.setState({
        user: {
          username,
          id,
        },
        error: null,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("id", this.state.user.id);
      this.props.history.push("/");
    } else if (data.error) {
      this.setState({
        error: data.error,
      });
    }
  };

  handleLogin = (e, userInfo) => {
    e.preventDefault();

    fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((resp) => resp.json())
      .then((data) => this.handleAuthResponse(data))
      .catch(console.log);
  };

  handleSignup = (e, userInfo) => {
    e.preventDefault();

    fetch(API + "/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.handleAuthResponse(data);
      })
      .catch(console.log);
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ user: {} });
    this.props.history.push("/login");
    console.log("successful logout");
  };

  setResult = (data) => {
    this.setState({
      chordResult: data,
    });
  };

  renderLoginPage = () => <Login handleLoginOrSignup={this.handleLogin} />;
  renderSignUpPage = () => <Login handleLoginOrSignup={this.handleSignup} />;

  render() {
    return (
      <div>
        <Navi user={this.state.user} handleLogout={this.handleLogout} />
        {!!this.state.error && <h1>{this.state.error}</h1>}

        <Route path="/login" component={this.renderLoginPage} />
        <Route path="/signup" render={this.renderSignUpPage} />
        <Route
          path="/chord"
          render={() => {
            return <ChordContainer gameResult={this.setResult} />;
          }}
        />
        <Route
          path="/interval"
          render={() => {
            return <IntervalContainer />;
          }}
        />
        <Route
          path="/perfect_pitch"
          render={() => {
            return <PerfectContainer />;
          }}
        />
        <Route
          path="/profile"
          render={() => {
            return <Profile />;
          }}
        />
      </div>
    );
  }
}

export default withRouter(MainContainer);
