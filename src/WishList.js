// Majority of the code is based on the to do list from Traversy Media https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=5798s
import React, { useState } from 'react';
import { Grid, Card, List, Form, Input, Button } from 'semantic-ui-react';

function WishList () {
  const [items, setItems ] = useState([
    { id: 1,
      text: 'Shirt',
      website: 'https://www.amazon.com/Carhartt-Workwear-T-Shirt-Original-X-Large/dp/B0007XB2YI/ref=sr_1_2?dchild=1&keywords=shirt&qid=1617965318&sr=8-2', },
    { id: 2,
      text: 'Shorts',
      website: 'https://www.amazon.com/Under-Armour-Shorts-Venom-Black/dp/B0872N2JVZ/ref=sr_1_4_sspa?dchild=1&keywords=mens+shorts&qid=1617966794&sr=8-4-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFXQlAxM1dLRFNYUiZlbmNyeXB0ZWRJZD1BMDk0MDI0NDJOWUcxT1NTNFVUNzQmZW5jcnlwdGVkQWRJZD1BMDMwMTI0MTFRMVgySTlOUElVV0smd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl', },
  ]);

  const [itemText, setItemText] = useState('');
  const [webLink, setWebLink] = useState('');

  const handleSubmit = () => {
    let newId = items.length + 1;
    if(!webLink.startsWith('https://', 0)) {
      let site = 'https://' + webLink;
      let newItem = { id: newId, text: itemText, website: site };
      setItems([...items, newItem]);
    } else {
      let newItem = { id: newId, text: itemText, website: webLink };
      setItems([...items, newItem]);
    }
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

                  <List bulleted divided relaxed >
                    {items.map((item) => (
                        <List.Item key={item.id}>
                          <List.Content>
                            <List.Header href={item.website}>{item.text}</List.Header>
                          </List.Content>
                        </List.Item>
                    ))}
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