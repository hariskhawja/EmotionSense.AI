import React from 'react'
import { useState } from 'react';
import './Home.css'


const Home = () => {
    const [file, setFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleChange(event) {
    setFile(event.target.files[0]);

  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)

        // try {
        //     const response = await axios.post('YOUR_UPLOAD_ENDPOINT_URL', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //         onUploadProgress: function (progressEvent) {
        //             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //             setUploadProgress(percentCompleted);
        //         }
        //     });

        //     console.log('File uploaded successfully!', response.data);
        //     // Handle success
        // } catch (error) {
        //     console.error('Error uploading file:', error);
        //     // Handle error
        // }
    }

    return (
    <div className="hero">
        <div className="blurry-background">
            <div className="hero-content">
                <div className='title'>EmotionSense<span style={{color: "rgb(0, 0, 139)", fontWeight: "bold"}}>.AI</span></div>
                
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-div">
                <input className="input" name="file" type="file" accept="json" onChange={handleChange}></input>
                    {!file && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon-upload"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>}
                    {file && <p className="file-selected">{file.name}</p>}
                </div>
                <button type='submit' className='button-submit'>Submit</button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default Home;
