import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  //use the List constructor to ensure conversion of entries to an immutable List
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

export function vote(state, entry) {
  /*Immutable.js Map method '.updateIn()':
  - takes an array representing the key path on the object
  - apply the specified function at that point
  - if any keys are missing along the path, create new Maps in their place
  - If the value at the end is missing, initialize it with '0'
  */
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}