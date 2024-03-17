import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About'
import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <About />
      <Results />
      
    </div>
  );
}

export default App;
