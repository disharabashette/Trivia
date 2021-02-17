import {QUESTIONS} from '../../const/Global';
export default function(state = {questions: ''}, action) {
  switch (action.type) {
    case QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
}