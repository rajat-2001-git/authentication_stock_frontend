import { updateStockData } from "../Redux/stockSlice";
import store from "../Redux/store";

const apiUrl = 'ws://localhost:3000/';

const socket = new WebSocket(apiUrl);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  store.dispatch(updateStockData(data));
}

export default socket;