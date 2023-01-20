import {configureStore,combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer } from './reducers.js';

const reducers = combineReducers(reducer);

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    whitelist:['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;