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
    const [showChord, setShowChord] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [voicing, setVoicing] = useState('major')
    
    const chords = [
        {'c3': `C ${voicing}`},
        {'d3': `D ${voicing}`},
        {'e3': `E ${voicing}`},
        {'f3': `F ${voicing}`},
        {'g3': `G ${voicing}`},
        {'a3': `A ${voicing}`},
        {'b3': `B ${voicing}`},
    ]

    const majors = ['C major', 'D major', 'E major', 'F major', 'G major', 'A major', 'B major']
    const minors = ['C minor', 'D minor', 'E minor', 'F minor', 'G minor', 'A minor', 'B minor']

    function playChord() {
        let note = Math.floor(Math.random() * 7)
        let current = Object.keys(chords[note])
        let triad = [...Chord.getChord(voicing,current[0]).notes]
        let currentChord = Object.values(chords[note])
        setAnswer(true)
        setShowChord(false)

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
        console.log(currentChord[0]) 
        setAnswer(true)    
    }

    function answerChord(e) {
        setShowChord(true)
        if (attempts < 9) {
            if (e.target.value === tonic && showChord != true) {
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

    function handleResults() {
        setShowResult(true)
        props.end(score)
    }

    function voicingSelect(e) {
        setVoicing(e.target.value)
    }

    return (
        <div>
        <div>
            <select onChange={(e) => voicingSelect(e)}>
                <option value="choose your key">Choose Voicing</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
            </select> 
        </div>
        
        <div className='center-game'>
        <div className='center-quiz'>
        <div className='game-container'>

            { answer 
            ? <div className='question-flip'> What is the chord? </div>
            : <button className='question-text' onClick={playChord}>Play Chord</button>
            }

        <div className='answer-section'>

            {
            voicing === 'minor' ?
            minors.map((chord) => (
                !answer 
                ? <button value={chord} className='answerButton'>{chord}</button>
                : <button className='answerButton' onClick={(e) => answerChord(e)} value={chord} className='answerButton'>{chord}</button>
            ))
            : majors.map((chord) => (
                !answer 
                ? <button value={chord} className='answerButton'>{chord}</button>
                : <button className='answerButton' onClick={(e) => answerChord(e)} value={chord} className='answerButton'>{chord}</button>
            ))
            }
    

        </div>
        </div>
        </div>
        </div>

        {!endGame ?
            <div className="soundwave">
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
        </div>
        : <div></div> 
        } 

        {
        endGame ?
            !showResult
            ? <button onClick={() => {handleResults()}} id='revealAnswer'>View Results</button>
            : <div></div>
        :<div></div>
        }

        {
            !endGame ?
                showChord 
                ? <button id="showAnswer">{tonic}</button>
                : <div></div>
            : <div></div>
        }

        </div>
    )
}

    export default ChordGame
