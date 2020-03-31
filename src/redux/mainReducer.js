import { combineReducers } from "redux";

/**
 * You can import more reducers here
 */


//@BlueprintReduxImportInsertion
import SignIn424370Reducer from '../features/SignIn424370/redux/reducers'
import SignUp224369Reducer from '../features/SignUp224369/redux/reducers'
import CalendarReducer from '../features/Calendar/redux/reducers';
import EmailAuthReducer from '../features/EmailAuth/redux/reducers';

export const combinedReducers = combineReducers({
  blank: (state, action) => {
    if (state == null) state = [];
    return state;
  },


  //@BlueprintReduxCombineInsertion
SignIn424370: SignIn424370Reducer,
SignUp224369: SignUp224369Reducer,
Calendar: CalendarReducer,
EmailAuth: EmailAuthReducer,

});