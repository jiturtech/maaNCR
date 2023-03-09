// Imports
import {IS_LOADING} from '../actions/actionType';
// Initial State
const initialState = {
  isLoading: false,
};
// Reducers (Modifies The State And Returns A New State)
const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default HomeReducer;
