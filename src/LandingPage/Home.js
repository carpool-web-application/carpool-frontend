import { Link } from "react-router-dom";
import styles from "./home.module.css";
import PersonalizedComponent from "./Components/PersonalizedComponent";
import Banner from "./Components/Banner";
import Suggestions from "./Components/Suggestions";
import Features from "./Components/Features";
import Events from "./Components/Events";
const Home = () => {
  const scrollIntoSection = (element) => {
    const sectionToScrollTo = document.getElementById(element);
    console.log(sectionToScrollTo);
    if (sectionToScrollTo) {
      sectionToScrollTo.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={styles.homeContainer}>
      <header>
        <ul className={styles.mainnav}>
          <div className={styles.pushleft}>
            <li>Carpoool!!!</li>
            <li>Rides</li>
            <li>Drive</li>
            <li
              onClick={(e) => {
                e.preventDefault();
                scrollIntoSection("suggestions");
              }}
            >
              Suggestions
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();
                scrollIntoSection("Features");
              }}
            >
              Features
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();
                scrollIntoSection("Events");
              }}
            >
              Events
            </li>
          </div>

          <div className={styles.pushright}>
            <li>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/createProfile" className={styles.link}>
                Sign up
              </Link>
            </li>
          </div>
        </ul>
      </header>
      <main className={styles.mainContainer}>
        <Banner />
        <PersonalizedComponent />
        <Suggestions />
        <Features />
        <Events />
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Carpool Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Home;
