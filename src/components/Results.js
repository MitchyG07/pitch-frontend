import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

class Results extends Component {
  state = {
    games: [],
  };

  render() {
    let data = this.props.results.map((game) => game.points);
    return (
      <div className="leaderboard">
        <ReactEcharts
          option={{
            xAxis: {
              type: "category",
              data: Array.from({ length: data.length }, (_, i) => i + 1),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: data,
                type: "line",
                lineStyle: { color: "#5ee70f" },
              },
            ],
            tooltip: {
              trigger: "axis",
            },
          }}
        />
        {!this.props.hideButton ? (
          <button id="revealAnswer" onClick={() => this.props.start()}>
            Play Again!
          </button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Results;
