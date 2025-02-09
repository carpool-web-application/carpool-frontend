const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const userExits = async (username, token) => {
  const userDetails = await fetch(`${apiUrl}/userAuths/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`, // token is not required as it is a normal fetch
    },
  });

  return userDetails;
};

export const createUser = async (userPayload) => {
  const createUser = await fetch(`${apiUrl}/userAuths/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`, // token is not required as it is a normal fetch
    },
    body: JSON.stringify(userPayload),
  });

  return createUser;
};

export const createDriverUser = async (userPayload) => {
  const createDriverUser = await fetch(`${apiUrl}/drivers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`, // token is not required as it is a normal fetch
    },
    body: JSON.stringify(userPayload),
  });

  return createDriverUser;
};

export const createRiderUser = async (userPayload) => {
  const createRiderUser = await fetch(`${apiUrl}/riders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`, // token is not required as it is a normal fetch
    },
    body: JSON.stringify(userPayload),
  });

  return createRiderUser;
};
