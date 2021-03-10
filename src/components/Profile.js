import React, { useEffect, useState } from "react";
import PerfectResult from "./PerfectResult";
import ChordResult from "./ChordResult";
import Results from "./Results";

const Profile = (props) => {
  const [intervalResults, setIntervalResults] = useState([]);
  const [chordResults, setChordResults] = useState([]);
  const [perfectResults, setPerfectResults] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.token;
    const configObj = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };
    fetch(`http://localhost:3000/users/${localStorage.id}`, configObj)
      .then((resp) => resp.json())
      .then((data) => {
        setIntervalResults(data.intervals);
        setChordResults(data.chord_games);
        setPerfectResults(data.perfect_games);
        setUser(data);
      });
  }, []);

  return (
    <div className="profileContainer">
      <div className="intervalResultContainer">
        <h2 className="interval-result">Interval Game Progression</h2>
        <Results results={intervalResults} hideButton={true} />
      </div>

      <div className="chordResultContainer">
        <h2 className="chord-game-result">Chord Game Progression</h2>
        <ChordResult results={chordResults} hideButton={true} />
      </div>

      <h2 className="chord-game-result">Perfect Pitch Progression</h2>

      <div className="resultContainer">
        <PerfectResult results={perfectResults} hideButton={true} />
      </div>
    </div>
  );
};

export default Profile;
