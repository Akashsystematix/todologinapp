import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,TouchableHighlight} from 'react-native';
import { db } from '../config/db';
import firebase from 'firebase'
import Icon from 'react-native-ionicons';


export default class EventItem extends Component {
  render() {
    item= this.props.item;
    user= firebase.auth().currentUser;
    userEmail = firebase.auth().currentUser.email;
    liked = item.likedby ? Object.values(item.likedby).map((project)=>{
      return project.likedby;
    }) : [];
    function isInArray(liked, userEmail) {
      return liked.indexOf(userEmail.toLowerCase()) > -1;
      }
    inArray = isInArray(liked, userEmail);


    return (
      <TouchableHighlight >
        <View style={styles.li}>          
          <View style={{flex:4}}>
            <Text style={styles.liText}>{item.title}</Text>
            <Text style={styles.eventDateTime}>{item.postedby} </Text>
          </View>
          <View style={{flexDirection: 'row', flexDirection: 'row', alignItems:'center'}}>
          <Text style={{color:'red' , fontSize:11}}> {liked && liked.length >0 ? liked.length : '' } </Text>
          { inArray ?  
            <Icon onPress={this.props.onUnlike}   name='ios-heart' color="red" style={{padding:5}}/> : 
            <Icon onPress={this.props.onLike}  name='ios-heart-outline' color="red"  style={{padding:5}}/>
          }
          {user === item.postedby ?
          <Icon onPress={this.props.onPress} name='close' style={{padding:5}}/> : null }
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(160, 141, 211)',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#d6f5f5',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    flex:2
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: '#33cccc',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  eventsli:{
    backgroundColor: '#fff',
    borderBottomColor: '#d6f5f5',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flex:1,
    flexDirection:'row',
  },
  eventsliText:{
    color: '#1f7a7a',
    fontSize: 16,
    flex:2,
    paddingBottom: 2,
  },
  eventDateTime:{
    color: 'grey',
    fontSize:11,
    paddingRight:5,
  },
  eventDescText:{
    fontSize:13,
  },
  loginInputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: 'black',
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 150,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft:20,
},
loginContainer: {
    height: 60,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderColor: 'gray',
    margin:15,
},
    roundedProfileImage: {
      width:80, 
      height:80, 
      borderWidth:2,
      borderColor:'white', 
      borderRadius:40
    },
    connectionsli:{
      backgroundColor: '#2eb8b8',
      borderBottomColor: '#fff',
      borderTopColor: '#fff',
      borderColor: 'transparent',
      borderWidth: 1,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 14,
      paddingBottom: 16,
      flex:1,
      flexDirection:'row',
      alignItems:'center',
    },

})