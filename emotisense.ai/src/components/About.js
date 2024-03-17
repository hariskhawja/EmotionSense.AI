// About.js
import React from 'react';
import './About.css'; // Import your CSS file for styling
import image from "../images/logo.png"

const About = () => {
    return (
        <div className="about-section">
            <div className="content">
                <div className="text">
                    <h2>About Us</h2>
                    <p>Welcome to EmotionSense.AI, your go-to platform for analyzing emotions from text data. Our cutting-edge AI technology can help you understand the emotional content of your text data, enabling you to make data-driven decisions and gain valuable insights.</p>
                    <p>Whether you're a researcher, marketer, or simply curious about the emotions expressed in text, EmotionSense.AI is here to assist you. Our user-friendly interface allows you to upload text data effortlessly and visualize emotional trends with ease.</p>
                    <p>Join us on this journey of emotional discovery and unlock the power of emotion analysis with EmotionSense.AI today!</p>
                </div>
                <div className="image-container">
                    <img src={image} alt="About" className="about-image" />
                </div>
            </div>
        </div>
    );
};

export default About;
