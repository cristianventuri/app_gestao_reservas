import axios from "axios";

const doRequest = axios.create({
  /* Informar a porta correta onde roda o servidor NODE */
  baseURL: 'http://localhost:3000/api',
  headers: {
    "Content-Type": "application/json"
  }
});

export default doRequest;