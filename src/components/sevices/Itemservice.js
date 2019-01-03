import { db } from '../config/db';


export const addItem = (items) => {
    var database = db.ref('todos').child().push(
        items



    ).then(() => this.props.navigation.push('TodoView'))
    console.log("databaseadded" + database);


}

export const editItem = (items) => {
    db.ref('todos').set(
        items
).then((data) => {
        //success callback
        console.log('data ', data)
    }).catch((error) => {
        //error callback
        console.log('error ', error)
    });


}









export const addUserData = (userdata) => {
    db.ref('/users').push(
        userdata



    );


}


export const updateUser = ({
    name: name,
    email: email,
    number: number,
    date: date

}) => {


    db.ref('users/').set({
        name: name,
        email: email,
        number: number,
        date: date

    });


}
