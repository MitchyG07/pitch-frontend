import React from "react";

const StartChord = (props) => {
  return (
    <div className="start-position">
      {/* <button className='start-button' onClick={props.start} >Start Interval Game</button> */}
      <div onClick={props.start} class="button">
        <div class="button__text">start chord game...</div>

        <div class="button__wrapper">
          <div class="button__arrow"></div>
          <div class="button__border-circle"></div>
          <div class="button__mask-circle">
            <div class="button__small-circle"></div>
          </div>
        </div>
      </div>
      <div className="center-game">
        <div className="center-quiz">
          <div className="game-container">
            <div className="rules">
              <h4 id="title">Rules</h4>
              <br></br>
              <ul id="list">
                <li>Choose between hearing major or minor chords</li>
                <li>Press play chord!</li>
                <li>Click on the chord you think was played! (10 rounds)</li>
                <li>
                  See if your guess was correct at the bottom of the page!
                </li>
                <li>Click view results button to view your progress!</li>
                <li>Have fun!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartChord;
