import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import Login from './src/components/userModules/Login'
import Splash from './src/components/userModules/Splash'
import Register from './src/components/userModules/Register'
import Details from './src/components/TodoModules/Details'
import App from './src/components/App'

import TodoView from './src/components/TodoModules/TodoView'
import AppNavigation from './src/components/AppNavigation';

AppRegistry.registerComponent('todologinapp', () => App)
