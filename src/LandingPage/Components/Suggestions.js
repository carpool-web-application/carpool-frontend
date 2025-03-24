import React from "react";
import styles from "./suggestions.module.css";
const Suggestions = () => {
  const suggestionsData = [
    {
      title: "Grocery",
      content: "Get Groceries delivered to your door with Uber Eats",
    },
    {
      title: "Rental Cars",
      content:
        "Your Perfect rental car is a few clicks away. Leanr more about the Carpool Rent",
    },
    {
      title: "Reserve",
      content:
        "Reserve your Ride in advance so you can relax on the day of your trp.",
    },
  ];
  return (
    <>
      <div className={styles.suggestionContainer}>
        <div className={styles.title}>Suggestions</div>
        <div className={styles.suggestionDetailsContainer}>
          {suggestionsData.map((suggestionData, index) => (
            <div key={index} className={styles.suggestionItem}>
              <div className={styles.suggestionTitle}>
                {suggestionData.title}
              </div>
              <div className={styles.suggestionContent}>
                {suggestionData.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Suggestions;
