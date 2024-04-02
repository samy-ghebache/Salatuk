import "./App.css";
import Fajr from "./assets/Fadjr.png";
import Dohr from "./assets/Dohr.jpg";
import Asr from "./assets/Aser.jpg";
import Maghrib from "./assets/maghrib.jpg";
import axios from "axios";
import Isha from "./assets/Ichaa.jpg";
import Prayer from "./Prayer";
import { useState, useEffect } from "react";
import moment from "moment";
import Header from "./Header";

function App() {
  const [place, setPlace] = useState("Algiers");

  const [country, setCountry] = useState("DZ");

  const [timeDate, setTimeDate] = useState(
    moment().format("MMMM Do YYYY | HH:mm:ss")
  );

  const [remainingTime, setRemainingTime] = useState();

  const [nextPrayer, setNextPrayer] = useState();

  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  const prayers = [
    { name: "Fajr", time: moment(timings.Fajr, "HH:mm") },
    { name: "Dhuhr", time: moment(timings.Dhuhr, "HH:mm") },
    { name: "Asr", time: moment(timings.Asr, "HH:mm") },
    { name: "Maghrib", time: moment(timings.Maghrib, "HH:mm") },
    { name: "Isha", time: moment(timings.Isha, "HH:mm") },
  ];
  const countryCityMap = {
    DZ: "Algiers",
    FR: "Paris",
    UK: "London",
  };
  const data = async (country, place) => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${place}&country=${country}`
    );
    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    data(country, place);
  }, [country, place]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDate(moment().format("MMMM Do YYYY | HH:mm:ss"));
      const next = prayers.find((prayer) => {
        return moment().diff(prayer.time) <= 0 && prayer;
      });
      setNextPrayer(next.name);
      const duration = moment.duration(moment().diff(next.time));
      setRemainingTime(
        `${Math.abs(duration.hours())} : ${Math.abs(
          duration.minutes()
        )} : ${Math.abs(duration.seconds())}`
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <div class="main-container">
        <Header />
        <div class="general-info">
          <div class="time-place">
            <h3 class="time">{timeDate}</h3>
            <p class="place">{place}</p>
          </div>
          <div class="next-prayer">
            <h3 class="next-prayer">Next Salat : {nextPrayer}</h3>
            <p class="next-prayer-time">{remainingTime}</p>
          </div>
        </div>
        <hr></hr>
        <div class="prayers-time">
          <Prayer name="Fajr" img={Fajr} timings={timings.Fajr}></Prayer>
          <Prayer name="Dhuhr" img={Dohr} timings={timings.Dhuhr}></Prayer>
          <Prayer name="Asr" img={Asr} timings={timings.Asr}></Prayer>
          <Prayer
            name="Maghrib"
            img={Maghrib}
            timings={timings.Maghrib}
          ></Prayer>
          <Prayer name="Isha" img={Isha} timings={timings.Isha}></Prayer>
        </div>
        <div className="places">
          <select
            class="select-country"
            value={country}
            onChange={(e) => {
              const selectedCountry = e.target.value;
              setCountry(selectedCountry);
              const defaultCity = countryCityMap[selectedCountry];
              setPlace(defaultCity);
            }}
          >
            <option value="DZ">Algeria</option>
            <option value="FR">France</option>
            <option value="UK">UK</option>
          </select>

          {/* Render city options based on selected country */}
          <select
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          >
            {country === "DZ" && (
              <>
                <option value="Algiers">Algiers</option>
                <option value="Oran">Oran</option>
                <option value="Constantine">Constantine</option>
              </>
            )}
            {country === "FR" && (
              <>
                <option value="Paris">Paris</option>
                <option value="Marseille">Marseille</option>
                <option value="Nice">Nice</option>
                <option value="Lyon">Lyon</option>
              </>
            )}
            {country === "UK" && <option value="London">London</option>}
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
