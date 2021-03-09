import React, { Component } from 'react'
import PerfectGame from '../components/Perfect'
import StartPerfect from '../components/StartPerfect'
import PerfectResult from '../components/PerfectResult.js'

class PerfectContainer extends Component {

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
                games: data.intervals
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

    render() {
    const { gameOn, endGame } = this.state
    console.log(this.state)
    return(
     <div className='app' >
         
         <div className="startGame">
             {gameOn === false ? <StartPerfect start={this.handleStart} /> 
                : <PerfectGame user={this.props.user} end={this.handleEndGame}/>}
        </div>


        <div>
            { endGame ? 
            <PerfectResults results={this.state.games} start={this.handleRestart} />
            : <div></div>
            }
        </div>

    </div>         
    )} 
}

export default IntervalContainer
