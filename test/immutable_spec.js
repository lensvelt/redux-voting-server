import {expect} from 'chai';
import {List} from 'immutable';

describe('immutability', () => {
  
  describe('a number', () => {
    
    function increment (currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  
  });

  describe('A List', () => {

    //adds a movie to the current state
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      //set up initial state
      let state = List.of('Trainspotting', '28 Days Later');
      //add movie to current state
      let nextState = addMovie(state, 'Sunshine');

      //should be a new, separate list
      expect(nextState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));
      //should be unchanged
      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });

  })

});