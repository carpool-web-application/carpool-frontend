import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./home.module.css";
import PersonalizedComponent from "./Components/PersonalizedComponent";
import Banner from "./Components/Banner";
import Suggestions from "./Components/Suggestions";
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header>
        <ul className={styles.mainnav}>
          <div className={styles.pushleft}>
            <li>Carpoool!!!</li>
            <li>Ride</li>
            <li>Drive</li>
            <li>About US</li>
          </div>

          <div className={styles.pushright}>
            <li>Login</li>
            <li>Sign up</li>
          </div>
        </ul>
      </header>
      <main className={styles.mainContainer}>
        <Banner />
        <PersonalizedComponent />
        <Suggestions />
      </main>
      <footer>footer</footer>
    </div>
  );
};
export default Home;
