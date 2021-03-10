import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { main } from '@popperjs/core';

class ChordResult extends Component {

    state = {
        games: [], 
    }


    render() {
        let data = this.props.results.map(game => game.points)
        let count = data.length
        let total = 0 
        data.forEach(num => {total += num})
        let avg = total / count
        let max = Math.max(...data)
        return (
        <div className='leaderboard'>
          <div className='stats'> 
          <ReactEcharts
            option={{
              xAxis: {
                type: 'category',
                data: Array.from({length: data.length}, (_, i) => i + 1)
              },
              yAxis: {
                type: 'value',
              },
              series: [{ 
                data: data,
                type: 'line',
                lineStyle: {color: '#5ee70f'}
              },],
              tooltip: {
                trigger:'axis',
              }
            }}
          />
          <table classname='styled-table'>
            <tr>
              <th>Games Played</th>
              <td>{count}</td>
            </tr>
            <tr>
              <th>Average Score</th>
              <td>{(avg).toFixed(2)}</td>
            </tr>
            <tr>
              <th>High Score</th>
              <td>{max}</td>
            </tr>
          
          </table>
          </div>
        {
        !this.props.hideButton
        ? <button id="revealAnswer" onClick={() => this.props.start()}>Play Again!</button> 
        : <div></div> 
        }
        </div> 
        );
      }
    }

export default ChordResult