import { AxiosError } from "axios";

const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Are you connected to the internet?"));
  } else if (error.response?.status === 401) {
    // TODO
  }

  return Promise.reject(error);
};

export { errorInterceptor };
