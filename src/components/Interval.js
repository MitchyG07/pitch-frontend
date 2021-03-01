import React, { useState, useEffect } from 'react'
import * as Tone from 'tone'
import { Note, Scale } from "@tonaljs/tonal";
import { BsFillDashCircleFill } from 'react-icons/bs';

function Interval_Game(props) {
    
    const [tonic, setTonic] = useState(() => [Scale.get('c3 major').notes])
    const [note, setNote] = useState(0)
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [game, setGame] = useState({})
    const [user, setUser] = useState({})


    useEffect(() => {
        const token = localStorage.token;
        let  configObj = {method: 'GET',  
        headers: {Authorization:  `Bearer ${token}`}} 
        fetch(`http://localhost:3000/users/${localStorage.id}`, configObj) 
        .then(resp  => resp.json())
        .then(data=> setUser(data))  
    }, [])

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
            <div className='play-interval-question'>
                <h4>Press to Hear Note</h4>
                { answer 
                ? <div> What note did you hear bitch </div>
                : <button onClick={playNote}>Play the music bitch</button>
                }
            </div>
            <div className='answer-section'>
                {intervals[note].answerOptions.map((answerOption) => (
                    answer === false ? <button>{answerOption.answerText}</button>
                    : <button onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                ))}
            </div>
            <div className="scoreboard">Your Score: {score} / 10 </div>
            <div className="remaining-attempts">Remaining: {10 - attempts}</div>
        </div>
    )
}

export default Interval_Game