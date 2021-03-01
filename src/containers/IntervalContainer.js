import React, { Component } from 'react'
import Interval_Game from '../components/Interval'


class IntervalContainer extends Component {


    render() {
    return(
     <div className='app' >
            <div className='question-section'>
                <Interval_Game user={this.props.user} /> 
            </div>  
        </div>        

    )} 
}

export default IntervalContainer