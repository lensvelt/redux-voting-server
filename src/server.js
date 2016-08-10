import Server from 'socket.io';

/* SERVER WORKS AS FOLLOWS:
* -----------------------------
* - A client sends an action to the server.
* - The server hands the action to the Redux Store.
* - The Store calls the reducer and the reducer executes the logic related to the action.
* - The Store updates its state based on the return value of the reducer.
* - The Store executes the listener function subscribed by the server.
* - The server emits a 'state' event.
* - All connected clients - including the one that initiated the original action - receive the new state.
* -----------------------------*/

//create a socket server + regular http server bound to port 8090
export function startServer(store) {
  const io = new Server().attach(8090);

  //subscribe listener to store that reads all state changes & emits JSON object as a state event on the socket serve (will send over all active socket.io connections)
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    //immediately emit current state (JSON form) to a client on a connection (sync client side state to server state)
    socket.emit('state', store.getState().toJS());
    //listen for action events from client (accept remote actions into our store...)
    socket.on('action', store.dispatch.bind(store));
  });
}

