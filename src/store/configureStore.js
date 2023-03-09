import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import axios from 'axios';
import {BASE_URL} from '@env';
import {Alert} from 'react-native';
import {onRefreshToken, resetAuth} from './actions/authaction';
import {navigate, replace, reset} from '../services/navigationServices';
import {NavigationRoutes} from '../constants';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  // whitelist: ['authreducer'],
  // Blacklist (Don't Save Specific Reducers)
  //blacklist: ['counterReducer'],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.response.status === 401 &&
      error.config.url !== 'auth/refresh' &&
      error.config.url !== 'auth/login'
    ) {
      try {
        var accessToken = store.getState().authReducer.loginData;
        store.dispatch(
          onRefreshToken({refresh_token: accessToken?.refresh_token}, res => {
            if (res.status === 401) {
              store.dispatch(resetAuth());
              Alert.alert('Alert!', 'Session Timeout!', [
                {
                  text: 'OK',
                  onPress: () =>
                    reset({
                      index: 0,
                      routes: [{name: NavigationRoutes.WELCOME_SCREEN}],
                    }),
                },
              ]);
            }
          }),
        );
      } catch (err) {
        var accessToken = '';
      }
    }
    return error.response;
  },
);
// Redux: Store
let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// Redux: Store
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({api}))),
  // createLogger(),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
  return store.getState();
};

// Exports
export {getPersistor, getState, getStore};
