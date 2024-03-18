// About.js
import React from 'react';
import './About.css'; // Import your CSS file for styling
import { useRef } from 'react';

const Results = () => {
    const ref = useRef(null);
    return (
        <div className="about-section" id='results'>
            <div className="content">
                <div className="text" ref={ref}>
            
                    <h2>Results</h2>
                </div>
            </div>
        </div>
    );
};

export default Results;
