import { applyMiddleware, createStore, combineReducers } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers(reducers);
const initialState = { 
	isLoading: {value: true},
	reduxTokenAuthReducer: {
	    currentUser: {
	      isLoading: false,
	      isSignedIn: false,
	      attributes: {
	        firstName: 'first_name',
	        lastName: 'last_name',
	        dreamId: 'dream_id',
	        email: 'email',
	        phone: 'phone',
	      },
	    },
	  },
	};

// TODO: fix all references to `configureStore`
// TODO: figure out if we still need `redux-thunk`
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk),
    offline(defaultConfig)
  )
);
