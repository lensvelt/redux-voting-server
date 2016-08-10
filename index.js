import makeStore from './src/store';
import { startServer } from './src/server';


export const store = makeStore();
//Integrate the socket server and the redux store
startServer(store);

//Load up the starting list of entries to be voted on
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
//Kick off the first vote
store.dispatch({ type: 'NEXT' });