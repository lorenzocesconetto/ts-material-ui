import axios from "axios";
import { Environment } from "../environment";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(responseInterceptor, errorInterceptor);

const checkStatusOk = (status: number) => 200 <= status && status < 300;

export { Api, checkStatusOk };
