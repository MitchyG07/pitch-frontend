import React, { useState } from 'react'
import * as Tone from 'tone'
import { Note, Scale } from "@tonaljs/tonal";
import { BsFillDashCircleFill } from 'react-icons/bs';

function Interval_Game() {
    
    const [tonic, setTonic] = useState(() => [Scale.get('c3 major').notes])
    const [note, setNote] = useState(0)
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [attempts, setAttempts] = useState(0)

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
            if (isCorrect) {
                setScore(score + 1);
                setAnswer(false)
            }

                if (attempts < 10) {
                    setAttempts(attempts + 1)
                } 
                // else {
                //     postScore()
                // }
    }

    // function postScore () {
    //     const token = localStorage.token;
    //     let config = { method: 'POST',
    //         headers: {'Content-Type': 'application/json',
    //                   Authorization: `Bearer ${token}`},
    //         body: JSON.stringify({
    //             content: e.target.children[0].value,
    //             user_id: this.props.user.id, 
    //             wine_id: this.props.wine.id })} 
    // }

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
                    <button onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                ))}
            </div>
            <div className="scoreboard">Your Score: {score} / 10 </div>
        </div>
    )
}

export default Interval_Game