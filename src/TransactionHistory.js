import React from 'react';
import {Card, Feed, Grid, Image, Button, Progress} from "semantic-ui-react";


class TransactionHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [
                {
                    from: 'XXXX',
                    to: 'YYYY',
                    amount: '$1000',
                    type: 'withdrawl',
                    date: '1 day ago',
                },
                {
                    from: 'YYYY',
                    to: 'XXXX',
                    amount: '$250',
                    type: 'deposit',
                    date: '3 days ago',
                },
                {
                    from: 'XXXX',
                    to: 'ZZZZ',
                    amount: '$750',
                    type: 'withdrawl',
                    date: '5 days ago',
                },
            ]
        }
    }

    render() {
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
                                this.state.transactions.map((transaction) => {
                                    return (
                                        <Feed.Event>
                                            <Feed.Label icon={`${transaction.type === 'withdrawl' ? 'arrow up' : 'arrow down'}`} />
                                            <Feed.Content>
                                                <Feed.Date content={transaction.date} />
                                                <Feed.Summary>
                                                    {`${transaction.type === 'withdrawal' ? 'Withdrew' : 'Deposited'} funds from ${transaction.from} to ${transaction.to}`}
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
}

export default TransactionHistory;
