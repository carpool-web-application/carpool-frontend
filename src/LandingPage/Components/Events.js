import React from "react";
import styles from "./Events.module.css"; // Ensure this path correctly points to your CSS file

const eventData = [
  {
    title: "Ride Share Week",
    content: "Join us for a week of special offers and community events!",
  },
  {
    title: "Safe Driving Webinar",
    content: "Learn about safe driving practices from experts in our webinar.",
  },
  {
    title: "Carpool Meetup",
    content:
      "Meet other carpool enthusiasts in your city and share experiences.",
  },
];

const Events = () => {
  return (
    <div className={styles.eventsContainer}>
      <div className={styles.title}>Upcoming Events</div>
      <div className={styles.detailsContainer}>
        {eventData.map((event, index) => (
          <div key={index} className={styles.eventItem}>
            <div className={styles.eventTitle}>{event.title}</div>
            <div className={styles.eventContent}>{event.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
