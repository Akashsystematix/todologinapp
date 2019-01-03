import React, { Component } from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation';
import Login from './userModules/Login'
import Register from './userModules/Register'
import Details from './TodoModules/Details'
import TodoView from './TodoModules/TodoView'
import AddTodo from './TodoModules/AddTodo'
import UserProfileView from './userModules/UserProfileView'
import UserProfileEdit from './userModules/UserProfileEdit'
import EditTodo from './TodoModules/EditTodo'
import SocialFeed from './SocialFeed/SocialFeed';
import EventsScreen from './SocialFeed/EventsScreen';
import ConnectionsScreen from './SocialFeed/ConnectionsScreen';
import Icon from 'react-native-ionicons';



const TabStack = TabNavigator(

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
            screen: SocialFeed,
            navigationOptions: {
                tabBarLabel: "SocialFeed",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="people" size={30} color="#1D2571" />
                )
            }
        },

        EventsScreen: {
            screen: EventsScreen,

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
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: 'white',
            }
        },
    },




)

const LoginStack = StackNavigator({

    Login: { screen: Login },
    Register: { screen: Register },
    UserProfileEdit: { screen: UserProfileEdit },
    Details: { screen: Details },
    TabStack: { screen: TabStack },
    EditTodo: { screen: EditTodo },
    AddTodo: { screen: AddTodo }
}, {
        headerMode: 'float',
        navigationOptions: {
            headerStyle: { backgroundColor: 'rgb(160, 141, 211)' },

        }
    })

const LoginNav = StackNavigator({
    loginStack: { screen: LoginStack },


}, {

        headerMode: 'none',
        title: 'Main',
        initialRouteName: 'loginStack',



    })

export default class AppNavigation extends Component {

    render() {
        return (
            <LoginNav />
        );
    }
}
