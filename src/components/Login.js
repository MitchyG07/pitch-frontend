import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="loginButton">
        <div className="center-game">
          <div className="center-quiz">
            <div className="game-container">
              <div className="login-page">
                <form
                  onSubmit={(e) =>
                    this.props.handleLoginOrSignup(e, this.state)
                  }
                >
                  <label id="login-text">Username</label> <br></br>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label id="login-text">Password</label>
                  <br></br>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <br />
                  <br></br>
                  <input type="submit" value="Login"></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
