import { createStore } from 'redux';
import reducer from './reducer';

//create the redux store & initialise with the reducer (the core application logic)
export default function makeStore() {
  return createStore(reducer);
}