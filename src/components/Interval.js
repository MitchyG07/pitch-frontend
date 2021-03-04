import React, { useState, useEffect } from 'react'
import * as Tone from 'tone'
import { Note, Scale } from "@tonaljs/tonal";
import { BsFillDashCircleFill } from 'react-icons/bs';
import Results from '../components/Results'

function Interval_Game(props) {
    
    const [tonic, setTonic] = useState([])
    const [note, setNote] = useState(0)
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [game, setGame] = useState({})
    const [endGame, setEndGame] = useState(false)

    const intervals = [
        {
            notes: [tonic[0], tonic[0]],
                answerOptions: [
                { answerText: 'Tonic', isCorrect: true },
				{ answerText: 'Major 3rd', isCorrect: false },
				{ answerText: 'Perfect 5th', isCorrect: false },
                { answerText: 'Major 7th', isCorrect: false }
            ],
        },
        {
            notes: [tonic[0], tonic[2]],
                answerOptions: [
                { answerText: 'Tonic', isCorrect: false },
				{ answerText: 'Major 3rd', isCorrect: true },
				{ answerText: 'Perfect 5th', isCorrect: false },
                { answerText: 'Major 7th', isCorrect: false }
            ],
        },
        {
            notes: [tonic[0], tonic[4]],
                answerOptions: [
                { answerText: 'Tonic', isCorrect: false },
				{ answerText: 'Major 3rd', isCorrect: false },
				{ answerText: 'Perfect 5th', isCorrect: true },
                { answerText: 'Major 7th', isCorrect: false }
            ],
        },
        {
            notes: [tonic[0], tonic[6]],
                answerOptions: [
                { answerText: 'Tonic', isCorrect: true },
				{ answerText: 'Major 3rd', isCorrect: false },
				{ answerText: 'Perfect 5th', isCorrect: false },
                { answerText: 'Major 7th', isCorrect: true }
            ],
        },   
    ]

    useEffect(() => {
        setTonic(arr => {
            return [...Scale.get('c3 major').notes]
        })
    })

    function scale_select(e) {
        setTonic(arr  => {
            return [...Scale.get(e.target.value).notes]})
    }
    
    function playNote() {
        let note = Math.floor(Math.random() * 4)
        setNote(note)
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
            const now = Tone.now()
            Tone.loaded().then(() => {
              sampler.triggerAttackRelease(`${intervals[note].notes[0]}`, '4n', now);
              sampler.triggerAttackRelease(`${intervals[note].notes[1]}`, '4n', now + 1);
            })
        }
        
    const handleAnswerClick = (isCorrect) => {
        if (attempts < 10) {
            if (isCorrect) {
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
        fetch('http://localhost:3000/intervals', config)
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
                interval_id: data.id
            })}
        fetch('http://localhost:3000/experiences', config)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <div>
            <div>
            <select onChange={(e) => scale_select(e)}>
                <option value="c3 major">C Major</option>
                <option value="d3 major">D Major</option>
                <option value="e3 major">E Major</option>
                <option value="f3 major">F Major</option>
                <option value="g3 major">G Major</option>
                <option value="a3 major">A Major</option>
                <option value="b3 major">B Major</option>
            </select> 
            </div > 
            <div className='center-game'>
            <div className='center-quiz'>
            <div className='game-container'>
                { answer 
                ? <div className='question-flip'> What is the Interval? </div>
                : <button className='question-text' onClick={playNote}>Play Interval</button>
                }
            <div className='answer-section'>
                {intervals[note].answerOptions.map((answerOption) => (
                    answer === false ? <button className='answerButton'>{answerOption.answerText}</button>
                    : <button className='answerButton' onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                ))}
            </div>
            </div>
            {/* <div className="scoreboard">Your Score: {score} / 10 </div>
            <div className="remaining-attempts">Remaining: {10 - attempts}</div> */}
            
            {
                endGame 
                ? <button onClick={() => props.end(score)} className='endGame'>View Results!</button>
                : <div></div>
            }

            </div>

            { !endGame ?
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

            </div>
        </div>
    )
}

export default Interval_Game