// About.js
import React, { useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import './Results.css'; // Import your CSS file for styling
import LineChart from './charts/LineChart';

Chart.register(CategoryScale);

const Results = ({data}) => {
    let formattedData = []

    for (var i in data)  {
        // returns list containing [negativity_score, positivity score, sadness, joy, love, anger, fear, surprise, text]
        const date = new Date(parseInt(i));
        console.log(date.toString().split("GMT")[0])
        formattedData.push({
            time: date.toString().split("GMT")[0],
            positivity_score: data[i][1],
            sadness: data[i][2],
            joy: data[i][3],
            love: data[i][4],
            anger: data[i][5],
            fear: data[i][6],
            surprise: data[i][7],
        })
    }
    

    function getData(y_labels) {
      const chartData = {
        labels: formattedData.map((d) => d.time), 
        datasets: [
            {
                label: y_labels,
                data: formattedData.map((d) => d[y_labels]),
                backgroundColor: [],
                borderColor: "black",
                borderWidth: 2
            }
        ],
      }

      return chartData
    }
    console.log(formattedData)

    console.log(data)

    return (
        <div className="about-section" id='results'>
            <div className="content">
              {formattedData.length <= 1 ? (
              <h2>Submit a JSON File of your Message History to See your Results!</h2>
              )
              :
              (
              <div className="section_container">
                <h2>Results</h2>
                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('positivity_score')} title="Positivity vs Time"/>
                  </div>
                  <div className='chart_text'>
                    <p>Text</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='chart_text'>
                    <p>Text</p>
                  </div>
                  <div className='chart_div'>
                    <LineChart chartData={getData('sadness')} title="Sadness vs Time"/>
                  </div>
                </div>

                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('joy')} title="Joy vs Time"/>
                  </div>
                  <div className='chart_text'>
                    <p>Text</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='chart_text'>
                    <p>Text</p>
                  </div>
                  <div className='chart_div'>
                    <LineChart chartData={getData('love')} title="Love vs Time"/>
                  </div>
                </div>

                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('anger')} title="Anger vs Time"/>
                  </div>
                  <div className='chart_text'>
                    <p>Text</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='chart_text'>
                    <p>Text</p>
                  </div>
                  <div className='chart_div'>
                    <LineChart chartData={getData('fear')} title="Fear vs Time"/>
                  </div>
                </div>  

                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('surprise')} title="Surprise vs Time"/>
                  </div>
                  <div className='chart_text'>
                    <p>Text</p>
                  </div>
                </div>
              </div>
              )}
                
            </div>
        </div>
    );
};

export default Results;