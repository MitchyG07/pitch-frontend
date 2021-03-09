import React, { useState, useEffect } from 'react'
import * as Tone from 'tone'

function PerfectGame(props) {

    const [note, setNote] = useState()
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [game, setGame] = useState({})
    const [endGame, setEndGame] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [showResult, setShowResult] = useState(false)
    
    const notes = [
        {'c3': `C`},
        {'c#3': 'C#'},
        {'d3': `D`},
        {'c#3': 'C#'},
        {'e3': `E`},
        {'f3': `F`},
        {'f#3': 'F#'},
        {'g3': `G`},
        {'g#3': 'G#'},
        {'a3': `A`},
        {'A#3': 'A#'},
        {'b3': `B`},
    ]

    const answerNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]

    function playNote() {
        let selectNote = Math.floor(Math.random() * 7)
        let current = Object.keys(notes[selectNote])
        let currentNote = Object.values(notes[selectNote])
        setAnswer(true)
        setShowNote(false)

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
              sampler.triggerAttackRelease(current, 3);
            })
        setNote(currentNote[0])   
        console.log(currentNote) 
        setAnswer(true)    
    }

    function answerNote(e) {
        setShowNote(true)
        if (attempts < 9) {
            if (e.target.value === note && showNote != true) {
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
        const token = localStorage.token;
        let config = { method: 'POST',
            headers: {'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                points: score
            })}
        fetch('http://localhost:3000/perfect_games', config)
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
                perfect_game_id: data.id
            })}
        fetch('http://localhost:3000/perfect_leaderboards', config)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
        }

    function handleResults() {
        setShowResult(true)
        props.end(score)
    }

    console.log(score)

    return (
        <div>
        
        <div className='center-game'>
        <div className='center-quiz'>
        <div className='game-container'>

            { answer 
            ? <div className='question-flip'> What note do you hear? </div>
            : <button className='question-text' onClick={playNote}>Play Note</button>
            }

        <div className='answer-section'>

            {
            answerNotes.map((note) => (
                !answer 
                ? <button value={note} className='answerButton'>{note}</button>
                : <button className='answerButton' onClick={(e) => answerNote(e)} value={note} className='answerButton'>{note}</button>
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
                showNote 
                ? <button id="showAnswer">Note: {note}</button>
                : <div></div>
            : <div></div>
        }

        </div>
    )
}

    export default PerfectGame
