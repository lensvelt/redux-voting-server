import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);

    //'fromJS()'' deeply converts JS arrays & objects to immutable Lists & Maps
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting', '28 Days Later']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    //'fromJS()'' deeply converts JS arrays & objects to immutable Lists & Maps
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      }, 
      entries: []
    }));
  });

});