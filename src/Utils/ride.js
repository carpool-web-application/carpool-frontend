const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchOngoingRide = async (userId, token) => {
  const getRide = await fetch(
    `${apiUrl}/carpool/v1/rides/${userId}/onGoingRide`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }
  );

  return getRide;
};

export const createRide = async (body, token) => {
  const postRide = await fetch(`${apiUrl}/carpool/v1/rides/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    body: JSON.stringify(body),
  });

  return postRide;
};
