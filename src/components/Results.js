import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class Results extends Component {

    state = {
        games: [] 
    }

    getGames = () => {
        this.props.results.map(game => {
            this.setState({
                games: this.state.games.push(game.points)
            })
        })
    }

    

    render() {
        console.log(this.state.games)
        return (
        <div className='leaderboard'>
          <ReactEcharts
            option={{
              xAxis: {
                type: 'category',
                data: ['Mon', 'tues', 'three', 'four']
              },
              yAxis: {
                type: 'value',
              },
              series: [{ 
                data: this.state.games,
                type: 'line'
              }]
            }}
          />
        </div>
        );
      }
    }

export default Results