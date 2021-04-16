import React, { useState, useEffect } from 'react';
import {Card, Feed, Grid, Image, Button, Progress} from "semantic-ui-react";
import firebase from "./firebase";
import {useAuth} from "./Context/AuthContext";


export default function TransactionHistory() {
    const { currentUser, logout } = useAuth();
    const [transactionHistory, setTransactionHistory] = useState([]);

    const grabHistory = async () => {
        const db = firebase.firestore();
        const historyCollection = await db.collection('transferHistory').get();

        return historyCollection.docs.filter(doc => doc.data().account === currentUser.email);
    }
    grabHistory().then(response => {
        setTransactionHistory(response);
    });

    return (
        <div style={{height: '100%'}}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>Transaction History</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Card.Header>Filter Options</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {
                            transactionHistory.map((history) => {
                                let transaction = history.data();
                                return (
                                    <Feed.Event>
                                        {/*<Feed.Label icon={`${transaction.type === 'withdrawl' ? 'arrow up' : 'arrow down'}`} />*/}
                                        <Feed.Content>
                                            <Feed.Date content={transaction.timestamp.toDate().toString()} />
                                            <Feed.Summary>
                                                {`Transferred $${transaction.amount} from ${transaction.bankOut} to ${transaction.bankIn}`}
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                );
                            })
                        }
                    </Feed>
                </Card.Content>
            </Card>
        </div>
    );
}
