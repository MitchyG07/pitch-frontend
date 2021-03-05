import React, { Component } from 'react'
import Chord_Game from '../components/Chord'
import StartChord from '../components/StartChord'
import ChordResult from '../components/ChordResult'

class ChordContainer extends Component {

    state = {
        gameOn: false,
        endGame: false, 
        user: {},
        games: []
    }

    componentDidMount(){
        const token = localStorage.token;
        const configObj = {method: 'GET',  
            headers: {Authorization:  `Bearer ${token}`}} 
        fetch(`http://localhost:3000/users/${localStorage.id}`, configObj) 
            .then(resp  => resp.json())
            .then(data => this.setState({
                user: data, 
                games: data.chords
            }))
    }

    handleStart = () => {
        let startOn = !this.state.gameOn
        this.setState({
            gameOn: startOn
        })
    }

    handleEndGame = (score) => {
        let end = !this.state.endGame
        this.setState({
            endGame: end,
            games: [...this.state.games, {points: score}]
        })
    }

    handleRestart = () => {
        let startOn = false 
        let end = false
        this.setState({
            gameOn: startOn,
            endGame: false
        })
    }

    render(){
    const { gameOn, endGame } = this.state

        return(
            <div className='app' >
         
            <div className="startGame">
                {gameOn === false ? <StartChord start={this.handleStart} /> 
                   : <Chord_Game user={this.props.user} end={this.handleEndGame}/>}
           </div>
   
   
           <div>
               { endGame ? 
               <ChordResult results={this.state.games} start={this.handleRestart} />
               : <div></div>
               }
           </div>
   
       </div>   
    
    )}
}

export default ChordContainer