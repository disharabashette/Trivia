import app from './Reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

function configStore() {
    let store = createStore(app, composeWithDevTools(applyMiddleware(thunk)))
    store.getState()
    return store
}

export default createStore(app, composeWithDevTools(applyMiddleware(thunk)))
