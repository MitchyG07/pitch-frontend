import React, {useEffect, useState} from 'react'
import PerfectResult from './PerfectResult'
import ChordResult from './ChordResult'
import Results from './Results'

const Profile = (props) => {

    const [intervalResults, setIntervalResults] = useState([])
    const [chordResults, setChordResults] = useState([])
    const [perfectResults, setPerfectResults] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.token;
        const configObj = {method: 'GET',  
            headers: {Authorization:  `Bearer ${token}`}} 
        fetch(`http://localhost:3000/users/${localStorage.id}`, configObj) 
            .then(resp  => resp.json())
            .then(data => {
                setIntervalResults(data.intervals)
                setChordResults(data.chord_games)
                setPerfectResults(data.perfect_games)
                setUser(data)
            }) 
        }, [])
    
    return (
        <div className='profileContainer'>
            <h1 id='profileHeader'>Welcome {user.username} </h1> 

            <h3 className='game-result'>Interval Game Results</h3>

            <div className='resultContainer'>
            <Results results={intervalResults} hideButton={true} />
            </div>

            <h3 className='game-result'>Chord Game Results</h3>
            
            <div className='resultContainer'>
            <ChordResult results={chordResults} hideButton={true}/>
            </div>

            <h3 className='game-result'>Perfect Pitch Game Results</h3>

            <div className='resultContainer'>
            <PerfectResult results={perfectResults} hideButton={true}/>
            </div>

        </div>
    )
}

export default Profile