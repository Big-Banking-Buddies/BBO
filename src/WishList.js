// Majority of the code is based on the to do list from Traversy Media https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=5798s
import React, { useState, useEffect } from 'react';
import { Grid, Card, List, Form, Input, Button, Icon } from 'semantic-ui-react';
import { useAuth } from './Context/AuthContext.js';

function WishList () {
  const { currentUser } = useAuth();
  const [items, setItems ] = useState([]);
  const [listIndex, setListIndex] = useState(0);
  useEffect(() => {
    const getItems = async () => {
      const dbItems = await fetchWishList();
      setListIndex(dbItems.length);
      console.log(listIndex);
      const dbWishList = [];
      dbItems.forEach(function(dbItem) {
        if (currentUser.email === dbItem.user) {
          dbWishList.push(dbItem);
        }
      });
      setItems(dbWishList);
    }
    getItems();
  }, [currentUser.email, listIndex]);
  const fetchWishList = async () => {
    const res = await fetch('http://localhost:5000/items');
    return await res.json();
  }

  const [itemText, setItemText] = useState('');
  const [webLink, setWebLink] = useState('');

  const handleSubmit = () => {
    let newId = listIndex + 1;
    if (!webLink.includes('www.amazon.com')) {
      window.alert('Input Link was not an Amazon Link and might be unsafe.');
      return;
    }
    if(!webLink.startsWith('https://', 0)) {
      let site = 'https://' + webLink;
      let newItem = { id: newId, user: currentUser.email, text: itemText, website: site };
      handleAdd(newItem);
    } else {
      let newItem = { id: newId, user: currentUser.email, text: itemText, website: webLink };
      handleAdd(newItem);
    }
  }
  const handleAdd = async (item) => {
    const res = await fetch('http://localhost:5000/items/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(item),
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
  }
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {method: 'DELETE'});
    setItems(items.filter((item) => item.id !== id));
  }

  return (
      <div style={{ padding: "50px"}}>
        <Grid>
          <Grid.Row centered columns={1}>
            <Grid.Column width={13} className={'dashboard-box'}>
              <Card fluid>
                <Card.Content textAlign={'center'}>
                  <Card.Header>Wish List</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Form>
                    <Form.Group>
                      <Form.Field inline>
                        <label>Wish List Item:</label>
                        <Input placeholder='Item' value={itemText} onChange={ itemName => setItemText(itemName.target.value)}/>
                      </Form.Field>
                      <Form.Field inline>
                        <label>Website Link:</label>
                        <Input placeholder='Website Link' value={webLink} onChange={ webpageLink => setWebLink(webpageLink.target.value)}/>
                      </Form.Field>
                      <Button type='submit' onClick={() => handleSubmit()}>Submit</Button>
                    </Form.Group>
                  </Form>
                </Card.Content>
                <Card.Content textAlign={'center'}>
                  <Card.Header>Wish List Items</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List divided relaxed >
                    {items.length > 0 ? (items.map((item) => (
                        <List.Item key={item.id}>
                          <List.Content>
                            <List.Header>
                              <a href={item.website}>{item.text}</a>
                              <Button icon floated='right' labelPosition='right' onClick={() => handleDelete(item.id)} size='medium'>
                                <Icon name='delete'/>
                                Delete Item
                              </Button>
                            </List.Header>
                          </List.Content>
                        </List.Item>
                    ))) : ('No Wish List Items Found') }
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
  );
}
export default WishList;