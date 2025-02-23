const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const userExits = async (username, token) => {
  const userDetails = await fetch(`${apiUrl}/carpool/v1/user/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`, // token is not required as it is a normal fetch
    },
  });

  return userDetails;
};

export const createUser = async (userPayload) => {
  const createUser = await fetch(`${apiUrl}/carpool/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`, // token is not required as it is a normal fetch
    },
    body: JSON.stringify(userPayload),
  });

  return createUser;
};
