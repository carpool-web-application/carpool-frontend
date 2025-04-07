import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./home.module.css";
import PersonalizedComponent from "./Components/PersonalizedComponent";
import Banner from "./Components/Banner";
import Suggestions from "./Components/Suggestions";
import Features from "./Components/Features";
import Events from "./Components/Events";
import { useRef } from "react";
const Home = () => {
  const scrollIntoSection = (element) => {
    const headerOffset = 70; // Static header height
    console.log(element);
    // Ensure we use the correct element to retrieve data-section-id
    const sectionId = element.dataset.sectionId;
    if (sectionId) {
      const sectionToScrollTo = document.getElementById(sectionId);

      if (sectionToScrollTo) {
        const elementPosition = sectionToScrollTo.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
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
                // Ensure you're using the closest li if there are nested elements
                const targetLi = e.target.closest("li[data-section-id]");
                if (targetLi) {
                  scrollIntoSection(targetLi);
                }
              }}
              data-section-id="Suggestions"
            >
              Suggestions
            </li>
            <li>Features</li>
            <li>Events</li>
          </div>

          <div className={styles.pushright}>
            <li>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            </li>

            <li>Sign up</li>
          </div>
        </ul>
      </header>
      <main className={styles.mainContainer}>
        <Banner />
        <PersonalizedComponent />
        <Suggestions id="Suggestions" />
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
