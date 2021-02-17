import {SHOWLODER, HIDELODER} from '../../const/Global';
export default function(state = false, action) {
  switch (action.type) {
    case SHOWLODER:
      return true;
    case HIDELODER:
      return false;
    default:
      return state;
  }
}
