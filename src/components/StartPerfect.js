import React from 'react'

const StartPerfect = (props) => {
    
    return(
        <div className='start-position'>
            {/* <button className='start-button' onClick={props.start} >Start Interval Game</button> */}
        <div onClick={props.start} class="button">
        <div class="button__text">start perfect pitch game...</div>
        
        <div class="button__wrapper">
            <div class="button__arrow"></div>
            <div class="button__border-circle"></div>
            <div class="button__mask-circle">
            <div class="button__small-circle"></div>
            </div>
        </div>
        </div>
        
        </div> 
    )
}

export default StartPerfect 