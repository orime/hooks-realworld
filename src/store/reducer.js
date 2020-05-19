import { combineReducers } from 'redux-immutable';
import { reducer as articleReducer } from '../pages/Home/store';

export default combineReducers ({
  article: articleReducer,
});
