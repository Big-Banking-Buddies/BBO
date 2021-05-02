import React, { useState, useEffect } from 'react';
import {Card, Feed, Grid, Image, Button, Progress} from "semantic-ui-react";
import firebase from "./firebase";
import {useAuth} from "./Context/AuthContext";


export default function Admin() {
    const { currentUser, logout } = useAuth();
    const [userList, setUserList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const grabUsers = async () => {
        const db = firebase.firestore();
        const userCollection = await db.collection('profile').get();

        let user = userCollection.docs.filter(doc => doc.id === currentUser.email);

        setIsAdmin(user[0].data().isAdmin);

        return userCollection.docs;
    }
    grabUsers().then(response => {
        setUserList(response);
    });

    const handleUserFlag = async (user) => {
        const db = firebase.firestore();
        const profileDB = await db.collection('profile').get();
        const userToChange = profileDB.docs.find(doc => doc.id === user.id);

        let userData = userToChange.data();
        userData.isFlagged = !userToChange.data().isFlagged;
        console.log(userToChange.data(), userData);

        return db.collection('profile').doc(user.id).set(userData);;
    }

    return (
        <div style={{height: '100%'}}>
            {
                isAdmin ?
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Administrative Action</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>
                            <Feed.Event style={{borderBottom: '1px solid lightgray'}}>
                                <Feed.Content>
                                    <Grid style={{width: '100%'}} columns={3}>
                                        <Grid.Column width={4}>Name</Grid.Column>
                                        <Grid.Column width={10}></Grid.Column>
                                        <Grid.Column width={2}>
                                            Action
                                        </Grid.Column>
                                    </Grid>
                                </Feed.Content>
                            </Feed.Event>
                            {
                                userList.map((user) => {
                                    let userInfo = user.data();
                                    return (
                                        <Feed.Event style={{borderBottom: '1px solid lightgray'}}>
                                            <Feed.Content>
                                                <Grid style={{width: '100%'}} columns={3}>
                                                    <Grid.Column width={4}>{userInfo.firstname} {userInfo.lastname}</Grid.Column>
                                                    <Grid.Column width={9}></Grid.Column>
                                                    <Grid.Column width={3} textAlign={'center'}>
                                                        <Button color={'red'} onClick={() => handleUserFlag(user).then(res => {
                                                            grabUsers();
                                                        })}>{userInfo.isFlagged ? 'Unflag user' : 'Flag user'}</Button>
                                                    </Grid.Column>
                                                </Grid>
                                            </Feed.Content>
                                        </Feed.Event>
                                    );
                                })
                            }
                        </Feed>
                    </Card.Content>
                </Card>
                :
                <h3 style={{textAlign: 'center', padding: '1em'}}>You do not have permission to access this page</h3>
            }
        </div>
    );
}
