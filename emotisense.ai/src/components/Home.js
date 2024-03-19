import React from 'react'
import { useState, useEffect } from 'react';
import './Home.css'
import Results from './Results';

const Home = () => {
  const [file, setFile] = useState();
  const [ returnData, setReturnData ] = useState({});
//   const [uploadProgress, setUploadProgress] = useState(0);
  const [fileContent, setFileContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
      setIsHovered(!isHovered);
  };

  useEffect(() => {
    var formattedPostData = [fileContent, selectedUser];
    console.log("formattedPostData: ", formattedPostData)
    fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedPostData),
      })
        .then(response => response.json())
        .then(jsonData => setReturnData(jsonData))
        .catch(error => console.error('Error:', error));
    }, [selectedUser]);

    function handleChange(event) {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            const content = reader.result;
            try {
                const parsedContent = JSON.parse(content);
                setFileContent(parsedContent);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                // Handle error if the content is not valid JSON
            }
        };
        reader.readAsText(selectedFile);
    }

    useEffect(() => {
        if (fileContent.length === 0) {
            console.log('No file content');
        }
        else {

            console.log("returnData: ", returnData);
            var participants = fileContent.participants;
            var all_users = []
            console.log("participants: ", participants)
            for (let i = 0; i < participants.length; i++) {
                all_users.push(participants[i].name);
            }
            setUsers(all_users);
        }
    }, [fileContent])

    // console.log(returnData);
    console.log(users);


    return (
    <div>
    <div className="hero" id='home'>
        <div className="blurry-background">
            <div className="hero-content">
                <div className='title'>EmotionSense<span style={{color: "rgb(0, 0, 139)", fontWeight: "bold"}}>.AI</span></div>
                
            <form className="form-container">
                <div className={file ? "input-div-upload" : "input-div"}>
                <input className="input" name="file" type="file" accept="json" onChange={handleChange} onMouseEnter={handleHover} onMouseLeave={handleHover}></input>
                    {!file && <svg className={isHovered ? "icon-upload-hover" : "icon-upload"} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>}
                    {file && <p className="file-selected">{file.name}</p>}
                </div>
            </form>

            {
        users.length > 0 && 
        <div className="dropdown-container">
            <select className="dropdown" onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="" disabled selected>Select a User</option>
            {users.map((user, index) => (
                <option key={index} value={user}>{user}</option>
            ))}
            </select>
        </div>
    }
            </div>
        </div>
        
    </div>
    <Results backendData={returnData} />
    </div>
    )
}

export default Home;
