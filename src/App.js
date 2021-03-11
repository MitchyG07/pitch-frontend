import React, { Component } from "react";
import "./App.scss";
import MainContainer from "./containers/MainContainer";
import Sax from "./video/sax.mp4";

class App extends Component {
  render() {
    return (
      <div className="App">
        <video
          autoPlay
          loop
          muted
          style={{
            position: "fixed",
            width: "100%",
            top: "50%",
            left: "50%",
            height: "100%",
            objectFit: "fill",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        >
          <source src={Sax} type="video/mp4" />
        </video>
        <div>
          <MainContainer />
          {/* <div className="soundwave">
        <span className="a1 bar"></span>
        <span className="a2 bar"></span>
        <span className="a3 bar"></span>
        <span className="a4 bar"></span>
        <span className="a5 bar"></span>
        <span className="a6 bar"></span>
        <span className="a7 bar"></span>
        <span className="a8 bar"></span>
        <span className="a9 bar"></span>
        <span className="a10 bar"></span>
        <span className="a11 bar"></span>
        <span className="a12 bar"></span>
        <span className="a13 bar"></span>
        <span className="a14 bar"></span>
        <span className="a15 bar"></span>
        <span className="a16 bar"></span>
        <span className="a17 bar"></span>
        <span className="a18 bar"></span>
        <span className="a19 bar"></span>
        <span className="a20 bar"></span>
        <span className="a21 bar"></span>
      </div> */}
        </div>
      </div>
    );
  }
}

export default App;
