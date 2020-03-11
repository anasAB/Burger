import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactproject-burger.firebaseio.com/"
});

export default instance;
