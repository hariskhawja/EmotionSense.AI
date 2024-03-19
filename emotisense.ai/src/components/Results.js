// About.js
import React, { useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import './Results.css'; // Import your CSS file for styling
import LineChart from './charts/LineChart';

Chart.register(CategoryScale);

const Results = ({backendData}) => {
    let formattedData = []
    console.log("backend", backendData)
    var data;
    var comments;
    if (backendData){
       data = backendData[0]
       comments = backendData[1]
    }
    else{
       data = []
       comments = []
    }
    for (var i in data)  {
        // returns list containing [negativity_score, positivity score, sadness, joy, love, anger, fear, surprise, text]
        const date = new Date(parseInt(i));
        console.log(date.toString().split("GMT")[0])
        formattedData.push({
            time: date.toString().split("GMT")[0],
            negativity_score: data[i][0],
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
                backgroundColor: ['rgb(16, 86, 130)'],
                borderColor: ['rgb(16, 86, 130)'],
                borderWidth: 2
            }
        ],
      }

      return chartData;
    }
    console.log("Comments", comments)
    console.log(formattedData)

    console.log(data)

    return (
        <div className="about-section" id='results'>
            <div className="content">
              {formattedData.length <= 1 ? (
              <h2 className="JSON-text">Submit a JSON File of your Message History to See your Results!</h2>
              )
              :
              (
              <div className="section_container">
                <h2 className="results-text">Results</h2>
                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('positivity_score')} title="Positivity over Time"/>
                  </div>
                  <div className='chart_text'>
                    <h4 className='text_container_main'>Most Positive Texts</h4>
                    <div className='comment_container'>
                    {comments && comments[0].map((comment, index) => {
                      return (<p className="comments" key={index}>"{comment[0]}"</p>)
                    })}
                    </div>
                  </div>
                </div>

                <hr className="bar"/>

                <div className='row'>
                  <div className='chart_text'>
                    <h4 className='text_container_main'>Most Negative Texts</h4>
                    <div className='comment_container'>
                    {comments && comments[1].map((comment, index) => {
                      return (<p className="comments" key={index}>"{comment[0]}"</p>)
                    })}
                    </div>
                  </div>
                  <div className='chart_div'>
                    <LineChart chartData={getData('negativity_score')} title="Negativity over Time"/>
                  </div>
                </div>

                <hr className="bar"/>

                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('joy')} title="Joy over Time"/>
                  </div>
                  <div className='chart_text'>
                    <p className='text_container'>Your joy score is measured on a scale from 0-1, where the closer you are to 1, the more joy you expressed in your texts</p>
                  </div>
                </div>

                <hr className="bar"/>

                <div className='row'>
                  <div className='chart_text'>
                    <p className='text_container'>Your sadness score is measured on a scale from 0-1, where the closer you are to 1, the more sadness you expressed in your texts</p>
                  </div>
                  <div className='chart_div'>
                    <LineChart chartData={getData('sadness')} title="Sadness over Time"/>
                  </div>
                </div>
              
                <hr className="bar"/>

                <div className='row'>
                  <div className='chart_text'>
                    <p className='text_container'>Your love score is measured on a scale from 0-1, where the closer you are to 1, the more love you expressed in your texts</p>
                  </div>
                  <div className='chart_div'>
                    <LineChart chartData={getData('love')} title="Love over Time"/>
                  </div>
                </div>

                <hr className="bar"/>

                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('anger')} title="Anger over Time"/>
                  </div>
                  <div className='chart_text'>
                    <p className='text_container'>Your anger score is measured on a scale from 0-1, where the closer you are to 1, the more anger you expressed in your texts</p>
                  </div>
                </div>

                <hr className="bar"/>

                <div className='row'>
                  <div className='chart_text'>
                    <p className='text_container'>Your fear score is measured on a scale from 0-1, where the closer you are to 1, the more fear you expressed in your texts</p>
                  </div>
                  <div className='chart_div'>
                    <LineChart chartData={getData('fear')} title="Fear over Time"/>
                  </div>
                </div>  

                <hr className="bar"/>

                <div className='row'>
                  <div className='chart_div'>
                    <LineChart chartData={getData('surprise')} title="Surprise over Time"/>
                  </div>
                  <div className='chart_text'>
                    <p className='text_container'>Your surprise score is measured on a scale from 0-1, where the closer you are to 1, the more surprise you expressed in your texts</p>
                  </div>
                </div>
              </div>
              )}
                
            </div>
        </div>
    );
};

export default Results;