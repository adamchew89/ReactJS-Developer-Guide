// Libraries
import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactburgerbuilder-ca78b.firebaseio.com/"
});

export default instance;
