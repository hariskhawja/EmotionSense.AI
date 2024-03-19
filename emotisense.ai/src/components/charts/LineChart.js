import React from "react";
import { Line } from "react-chartjs-2";
import { Colors } from 'chart.js';

function LineChart({ chartData, title}) {
  console.log("chartData", chartData.datasets)
  return (
    <div className="chart-container">
      <Line
        data={chartData}

        options={{
          plugins: {
              title: {
                  display: true,
                  text: title
              },
              legend: {
                  display: false
              }
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Time'
                  },
                  ticks: {
                    maxTicksLimit: 5
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Score'
                  }
              }
          },
          
          elements: {
            point: {
              radius: 2,
              hoverRadius: 8,
            }
          },
          
      }}
      />
    </div>
  );
}
export default LineChart;