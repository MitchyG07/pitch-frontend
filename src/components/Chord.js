import React, { useState, useEffect } from 'react'
import * as Tone from 'tone'
import { Chord } from "@tonaljs/tonal";
import { BsFillDashCircleFill } from 'react-icons/bs';
import ChordResult from '../components/ChordResult'

function ChordGame(props) {

    const [tonic, setTonic] = useState()
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [game, setGame] = useState({})
    const [endGame, setEndGame] = useState(false)
    
    const chords = [
        {'c3': 'C Major'},
        {'d3': 'D Major'},
        {'e3': 'E Major'},
        {'f3': 'F Major'},
        {'g3': 'G Major'},
        {'a3': 'A Major'},
        {'b3': 'B Major'},
    ]

    const majors = ['C Major', 'D Major', 'E Major', 'F Major', 'G Major', 'A Major', 'B Major']

    function playChord() {
        let note = Math.floor(Math.random() * 7)
        let current = Object.keys(chords[note])
        let triad = [...Chord.getChord("major",current[0]).notes]
        let currentChord = Object.values(chords[note])
        setAnswer(true)

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
              sampler.triggerAttackRelease(triad, 3);
            })
        setTonic(currentChord[0])    
        setAnswer(true)    
    }

    console.log(tonic)

    function answerChord(e) {
        if (attempts < 9) {
            if (e.target.value === tonic) {
                setScore(score + 1);
                setAnswer(false)
                setAttempts(attempts + 1)
            } else {
                setAttempts(attempts + 1)
                setAnswer(false)
            } 
            } else {
                postScore()
                setEndGame(true)
        }
    }

    const postScore = () => {
        console.log(score)
        const token = localStorage.token;
        let config = { method: 'POST',
            headers: {'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                points: score
            })}
        fetch('http://localhost:3000/chord_games', config)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setGame(data)
                postExperience(data)
            })
        }

    const postExperience = (data) => {
        const token = localStorage.token;
        let config = { method: 'POST',
            headers: {'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                user_id: localStorage.id,
                chord_game_id: data.id
            })}
        fetch('http://localhost:3000/chord_leaderboards', config)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
        }

    return (
        <div>
        
        <div className='center-game'>
        <div className='center-quiz'>
        <div className='game-container'>

            { answer 
            ? <div className='question-flip'> What is the chord? </div>
            : <button className='question-text' onClick={playChord}>Play Chord</button>
            }

        <div className='answer-section'>

            {
            majors.map((chord) => (
                !answer 
                ? <button value={chord} className='answerButton'>{chord}</button>
                : <button className='answerButton' onClick={(e) => answerChord(e)} value={chord} className='answerButton'>{chord}</button>
            ))
            }

        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

    export default ChordGame
