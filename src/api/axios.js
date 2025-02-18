import axios from "axios";
import { serializeKeysToSnakeCase, keysToCamelCase } from "neetocist";
import { evolve } from "ramda";

const setupHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    transformResponseKeysToCamelCase(response);

    return response.data;
  });
};

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

export default function initializeAxios() {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setupHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
