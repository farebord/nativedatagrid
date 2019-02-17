import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import namesReducer from './reducers/names';

export default function configureStore() {
    return createStore(
        namesReducer,
        applyMiddleware(thunk)
    );
}