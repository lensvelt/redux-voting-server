import { List, Map } from 'immutable';

function getWinners(vote) {
  if (!vote) return [];
  //Use ES6 object destructuring for variable assignment
  const [a, b] = vote.get('pair');
  //Immutable Map function '.getIn' returns the value found at the specified key path with '0' specified here as the default if no value found
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  //Return the winner or both (in the case of a draw)
  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a, b];
}

export function setEntries(state, entries) {
  //use the List constructor to ensure conversion of entries to an immutable List
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

export function vote(state, entry) {
  /*Immutable.js Map method '.updateIn()':
  ----------------------------------------
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