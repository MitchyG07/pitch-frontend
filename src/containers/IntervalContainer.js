import React, { Component } from 'react'
import Interval_Game from '../components/Interval'


class IntervalContainer extends Component {


    render() {
    return(
     <div className='app' >
        <div> Welcome to the Interval Game {this.props.user} </div>
            <div className='question-section'>
                <Interval_Game /> 
            </div>  
        </div>        

    )} 
}

export default IntervalContainer