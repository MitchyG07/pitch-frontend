import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class ChordResult extends Component {

    state = {
        games: [] 
    }

    render() {
        let data = this.props.results.map(game => game.points)
        return (
        <div className='leaderboard'>
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
                type: 'line'
              }]
            }}
          />
        <button onClick={() => this.props.start()}>Play Again!</button> 
        </div> 
        );
      }
    }

export default ChordResult