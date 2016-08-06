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
  //Get the current value of entries & add the winner of the previous vote to the back of the list of entries
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));

  //If only one entry left, we have an overall winner.
  if (entries.size === 1) {
    /*NOTE: Instead of just returning Map({winner: entries.first()}), take
    * OLD state as starting point & explicitly remove keys no longer required ->
    * future proofing (at some future point we may have unrelated data in the state
    * and it should pass through the function unchanged)
    *-------------------------------------------
    * PRO TIP re: STATE TRANSFORMATION FUNCTIONS:
    *-------------------------------------------
    * - always MORPH the old state into the new one 
    * - rather than build new state completely from scratch */
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {  
    //else return the new state tree with the next pair of entries to be voted on                   
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
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