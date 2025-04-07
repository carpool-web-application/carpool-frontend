import React from "react";
import styles from "./suggestions.module.css";

const Suggestions = (props) => {
  const suggestionsData = [
    {
      title: "Grocery",
      content: "Get Groceries delivered to your door with Uber Eats",
    },
    {
      title: "Rental Cars",
      content:
        "Your Perfect rental car is a few clicks away. Learn more about the Carpool Rent",
    },
    {
      title: "Reserve",
      content:
        "Reserve your Ride in advance so you can relax on the day of your trip.",
    },
  ];

  return (
    <div className={styles.suggestionContainer}>
      <div className={styles.title}>Suggestions</div>
      <div className={styles.suggestionDetailsContainer}>
        {suggestionsData.map((suggestion, index) => (
          <div key={index} className={styles.suggestionItem}>
            <div className={styles.suggestionTitle}>{suggestion.title}</div>
            <div className={styles.suggestionContent}>{suggestion.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
