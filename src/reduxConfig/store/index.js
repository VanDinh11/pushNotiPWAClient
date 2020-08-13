import { createStore, compose } from 'redux';
import rootReducer from "../reducer/rootReducer";

let store = createStore(rootReducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store;