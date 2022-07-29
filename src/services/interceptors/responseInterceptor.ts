import { AxiosResponse } from "axios";

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export { responseInterceptor };
