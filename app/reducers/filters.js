import { TOGGLE_SHOW_VALID } from '../actions/index';

// Initial State
const initialState = {
    showValid: false
}

export function filters(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SHOW_VALID:
      return {
      ...state,
      showValid: !state.showValid
    }
    default:
      return state;
  }
}
    