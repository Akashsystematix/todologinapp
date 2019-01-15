import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import reducers from '../reducers';


const middleWare = [thunk];

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);



  
export default configureStore = (onComplete) => {
  const store = (createStoreWithMiddleware)(reducers);


  return store;
};
