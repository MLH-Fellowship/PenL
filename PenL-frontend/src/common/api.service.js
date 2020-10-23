import { CSRF_TOKEN } from "./csrf_token.js";
import axios from "axios";

// https://penl-backend.herokuapp.com/
const API_URL = "http://127.0.0.1:8000";

function apiService(endpoint, method, data) {
  endpoint = `${API_URL}/${endpoint}`;

  const config = {
    url: endpoint,
    method: method,
    data: data !== undefined ? data : null,
    headers: {
      "content-type": "application/json",
      "X-CSRFTOKEN": CSRF_TOKEN
    }
  };

  return axios(config).then(response => response.data);
}

export { apiService };
