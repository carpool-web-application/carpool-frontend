const Alert = () => {
  return (
    <div className="message-request">
      <div className="alert">
        <span className="closebtn">&times;</span>
        <strong>
          Oops! Looks like you have already requested a ride. Kindly wait..
        </strong>
      </div>
    </div>
  );
};

export default Alert;
