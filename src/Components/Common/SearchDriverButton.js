import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SearchButton = styled.button`
  background-color: black;
  color: white;
  height: 30px;
  box-shadow: 5px 5px 10px #4d4d4d;

  &:hover {
    box-shadow: 5px 5px 10px #4d4d4d;
  }

  &: active {
    box-shadow: 2px 2px 5px #4d4d4d; /* Pressed effect */
    transform: translateY(2px); /* Button appears pressed down */
  }
`;

const SearchDriverButton = ({ searchForRide }) => {
  const searchForRider = (event) => {
    event.preventDefault();
    searchForRide();
  };
  return (
    <SearchContainer>
      <SearchButton
        type="submit"
        className="search-login-submit"
        onClick={searchForRider}
      >
        GET ME A RIDE!
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchDriverButton;
