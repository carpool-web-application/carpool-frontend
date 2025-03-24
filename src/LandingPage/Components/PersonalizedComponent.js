import React from "react";
import styles from "./personal.module.css";
import personalizedImage from "../../Assets/Airport-Fall.webp";
const PersonalizedComponent = () => {
  return (
    <>
      <div className={styles.personalized}>
        <div className={styles.personalizedText}>
          <div className={styles.personalizedMainText}>
            Log in to get personalized recommendations
          </div>
          <div className={styles.personalizedSmallText}>
            View past trips, tailored suggestions, support resources, and more
          </div>
        </div>
        <div className={styles.personalizedImage}>
          <img src={personalizedImage} alt="Description" />
        </div>
      </div>
    </>
  );
};

export default PersonalizedComponent;
