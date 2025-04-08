import React from "react";
import styles from "./Features.module.css"; // Ensure this path correctly points to your CSS file

const featuresData = [
  {
    title: "Real-time Tracking",
    content:
      "Track your ride in real time to ensure timely arrival and security.",
  },
  {
    title: "Fare Estimates",
    content:
      "Get upfront fare estimates to help you choose the best ride option.",
  },
  {
    title: "User Profiles",
    content:
      "Customize your profile and manage rides easily from your dashboard.",
  },
];

const Features = () => {
  return (
    <div className={styles.featuresContainer} id="Features">
      <div className={styles.title}>Key Features</div>
      <div className={styles.detailsContainer}>
        {featuresData.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.featureTitle}>{feature.title}</div>
            <div className={styles.featureContent}>{feature.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
