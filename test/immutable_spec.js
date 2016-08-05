import { expect } from 'chai';
import { List, Map } from 'immutable';

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

  describe('a List', () => {

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
      //should be unchanged. Would have changed if we'd used a standard array
      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });

  })

  describe('a tree', () => {

    function addMovie(currentState, movie) {
      //Current state is now a Map object (uses getters/setters) with property 'movies' which is a List (immutable)
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      );

      //Alternative implementation of above using immutable.js helper function
      // return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));
    });

  })

});