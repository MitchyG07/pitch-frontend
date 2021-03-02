import React, { Component } from 'react'
import Interval_Game from '../components/Interval'
import StartInterval from '../components/StartInterval'
import Results from '../components/Results'


class IntervalContainer extends Component {

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

    render() {
    const { gameOn, endGame } = this.state
    return(
     <div className='app' >
         
         <div className="startGame">
             {gameOn === false ? <StartInterval start={this.handleStart} /> 
                : <Interval_Game user={this.props.user} />}
        </div>

        <div>
            <Results results={this.state.games}/>
        </div>

    </div>         
    )} 
}

export default IntervalContainer