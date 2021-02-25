import React, {useState} from 'react'


const IntervalContainer = (props) => {
    
    const [currentInterval, setCurrentInterval] = useState(0)

    const intervals = [
        {intervalText: "Octave", 
            intervalOptions: [
                { answerText: 'Major 3rd', isCorrect: false },
                { answerText: 'Perfect 5th', isCorrect: false },
                { answerText: 'Octave', isCorrect: true }      
            ]
        },
        {intervalText: "Major 3rd",
            intervalOptions: [
                { answerText: 'Major 3rd', isCorrect: true },
                { answerText: 'Perfect 5th', isCorrect: false },
                { answerText: 'Octave', isCorrect: false }
            ]
        },
        {intervalText: "Perfect 5th",
        intervalOptions: [
                { answerText: 'Major 3rd', isCorrect: false },
                { answerText: 'Perfect 5th', isCorrect: true },
                { answerText: 'Octave', isCorrect: false }
            ]
        }
    ]

    return(
     <div className='app' >

        <div> Welcome to the Interval Game {props.user} </div>
            <div className='question-section'>
                {intervals[0].intervalOptions.map((intervalOption) => 
                    <button>{intervalOption.answerText}</button>)}
            </div>  
        </div> 

    )
}

export default IntervalContainer