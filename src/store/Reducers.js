import { combineReducers } from 'redux';
import loder from './Reducer/loder.reducer';
import questions from './Reducer/quiz.reducer'

export default combineReducers({
  loder,
  questions
});