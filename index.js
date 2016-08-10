import makeStore from './src/store';
import { startServer } from './src/server';


export const store = makeStore();
//Integrate the socket server and the redux store
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({ type: 'NEXT' });