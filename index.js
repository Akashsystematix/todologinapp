import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import Login from './src/components/userModules/Login'
import Splash from './src/components/userModules/Splash'
import Register from './src/components/userModules/Register'
import Details from './src/components/TodoModules/Details'
import App from './src/components/App'
import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';


const store = configureStore();






class todo extends Component {
    componentDidMount() {
      codePush.sync({installMode: codePush.InstallMode.IMMEDIATE});
    }
  
    render() {
      return (
        <Provider store={store}>
          <App/>
        </Provider>
      );
    }
  }
AppRegistry.registerComponent('todologinapp', () => App)
