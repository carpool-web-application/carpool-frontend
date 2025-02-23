const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const getRiderDetails = async (driverId, token) => {
  console.log(driverId);
  const driverDetails = await fetch(`${apiUrl}/carpool/v1/riders/${driverId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });
  return driverDetails;
};

export const login = async (payload) => {
  const userDetails = await fetch(`${apiUrl}/carpool/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return userDetails;
};

export const riderRequest = async (userId, token) => {
  const riderRequest = await fetch(
    `${apiUrl}/carpool/v1/rideRequest/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }
  );
  return riderRequest;
};

export const riderRequestDetails = async (userId, token) => {
  const riderRequest = await fetch(
    `${apiUrl}/rideRequest/${userId}/carpool/v1/getPastRides`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }
  );
  return riderRequest;
};

export const riderProfileDetails = async (userId, token, body) => {
  const userUpdate = await fetch(`${apiUrl}/carpool/v1/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    body: JSON.stringify(body),
  });

  return userUpdate;
};

export const driverDetails = async (driverId, token) => {
  const driverDetails = await fetch(`${apiUrl}/carpool/v1/user/${driverId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  return driverDetails;
};
