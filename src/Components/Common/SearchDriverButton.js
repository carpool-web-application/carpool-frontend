const SearchDriverButton = ({ searchForRide }) => {
  const searchForRider = (event) => {
    event.preventDefault();
    searchForRide();
  };
  return (
    <div className="search-button-container">
      <button
        type="submit"
        className="search-login-submit"
        onClick={searchForRider}
      >
        GET ME A RIDE!
      </button>
    </div>
  );
};

export default SearchDriverButton;
