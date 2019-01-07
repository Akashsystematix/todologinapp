import React, {Component} from 'react'
import Icon from 'react-native-ionicons';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import ConnectionsScreen from './SocialFeed/ConnectionsScreen';
import EventsScreen from './SocialFeed/EventsScreen';
import SocialFeed from './SocialFeed/SocialFeed';
import AddTodo from './TodoModules/AddTodo'
import Details from './TodoModules/Details'
import EditTodo from './TodoModules/EditTodo'
import TodoView from './TodoModules/TodoView'
import Login from './userModules/Login'
import Register from './userModules/Register'
import UserProfileEdit from './userModules/UserProfileEdit'
import UserProfileView from './userModules/UserProfileView'



const TabStack = createBottomTabNavigator(

    {
      TodoView: {
        screen: TodoView,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" size={30} color="#1D2571" />
            )
        },
    
    },
      SocialFeed: {
          screen : SocialFeed, navigationOptions: {
            tabBarLabel: "SocialFeed",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="people" size={30} color="#1D2571" />
            )
        }

      },

      EventsScreen: {
        screen: EventsScreen
        ,

            navigationOptions: {
                tabBarLabel: "Events",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="list" size={30} color="#1D2571" />
                )
            },


      },

      ConnectionsScreen: {
        screen: ConnectionsScreen,

            navigationOptions: {
                tabBarLabel: "Contacts",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="contacts" size={30} color="#1D2571" />
                )
            },


      },
      UserProfileView: {
        screen: UserProfileView,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="person" size={30} color="#1D2571" />
            )
        },


      },

    },
    
    {
      tabBarOptions: {
        activeTintColor: '#8F2571',
        inactiveTintColor: 'grey',
        style: {
          backgroundColor: '#FFFFFD',
        }
      },
    },
)



const LoginStack =createStackNavigator(
    {
      Login: {screen: Login},
      TabStack: {screen: TabStack},
      Details: {screen: Details},
      EditTodo: {screen: EditTodo},
      AddTodo: {screen: AddTodo},
      Register: {screen: Register},
      UserProfileEdit: {screen: UserProfileEdit},
    },
    {
      
      defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#664EA3'
        
        }
     }
    });


const AppContainer = createAppContainer(LoginStack);


export default class AppNavigation extends Component {
  render() {
    return (<AppContainer/>);
  }
}
