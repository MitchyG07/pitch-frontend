import React, {Component} from 'react'
import './App.css';
import * as Tone from 'tone'
import MainContainer from './containers/MainContainer'

class App extends Component {

  
  playNote = (note) => {
    const sampler = new Tone.Sampler({
      urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    
    Tone.loaded().then(() => {
      sampler.triggerAttackRelease(["C3"], 4);
    })
  } 

  render() {
  return (
    <div className="App">
      <div>
      <MainContainer /> 
      </div>
    </div>
  );
  }
}

export default App;
