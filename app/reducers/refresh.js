import { REFRESH_DATA, REFRESH_DATA_COMPLETE } from '../actions/index';

// Initial State
const initialState = {
    isRefreshing: false
}

export function refresh(state = initialState, action = {}) {
  switch (action.type) {
    case REFRESH_DATA:
      return {
      ...state,
      isRefreshing: true
    }
    case REFRESH_DATA_COMPLETE:
      return {
      ...state,
      isRefreshing: false
    }
    default:
      return state;
  }
}
    