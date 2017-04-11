import { START_LOADING, STOP_LOADING } from '../actions/index';

// Initial State
const initialState = {
    isLoading: false
}

export function loading(state = initialState, action = {}) {
  switch (action.type) {
    case START_LOADING:
      return {
      ...state,
      isLoading: true
    }
    case STOP_LOADING:
      return {
      ...state,
      isLoading: false
    }
    default:
      return state;
  }
}
    