import { setEntries, next, vote, INITIAL_STATE } from './core';

//Specify INITIAL_STATE as the default state if undefined
export default function reducer(state = INITIAL_STATE, action) {
  //Figure out which action to call and call it
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote',
                          voteState => vote(voteState, action.entry));
  }
  //If no action found, return the current state
  return state;
}