import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    const result = await axios.post(BACKEND_URL + "register", {
      email,
      password,
    });

    const { message, status, token } = result.data;

    if (status != 200)
      return { message: "Signup fail, Please try again", success: false };

    localStorage.setItem("token", token);

    return { message, success: true };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Signup fail, Please try again", success: false };
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    const result = await axios.post(BACKEND_URL + "login", {
      email,
      password,
    });

    const { status, message, token } = result.data;

    if (status != 200)
      return { message: "Incorrect Email or Password", success: false };

    localStorage.setItem("token", token);

    return { message, success: true };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Login fail, Please try again", success: false };
  }
};
