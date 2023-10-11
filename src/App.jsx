import { useState, useEffect } from "react";
import Figure from "./components/Figure/Figure";
import axios from "axios";
import logo from "./assets/logo.png";
import "./App.css";

const App = () => {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [apod, setApod] = useState({});
  const [date, setDate] = useState(today);
  const NASA_URL = "https://api.nasa.gov/";
  const NASA_API_KEY = "9CmWMWNot9yqNnXJZJLQ6J6knbBtpZKLScRIJjFG";

  useEffect(() => {
    const getApod = async () => {
      const data = await axios.get(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
      );
      setApod(data.data);
    };
    getApod();
  }, [date]);

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString());
  };
  return (
    <div className="App">
      <h1 className="title">NASA API</h1>
      <div clasName="container">
        <img src={logo} className="logo" alt="NASA LOGO" />
      </div>
      <h1>Astronomy Picture of the Day</h1>
      <input type="date" id="photo-date" onChange={handleInput} />
      {date > today ? (
        <h2>Please choose a previous date</h2>
      ) : (
        <Figure data={apod} />
      )}
      <div className="standard-dialog center">
        <h2 className="dialog-text">
          ©monica -2023 -
          <a href="https://api.nasa.gov/">https://api.nasa.gov/</a>
        </h2>
      </div>
    </div>
  );
};

export default App;
