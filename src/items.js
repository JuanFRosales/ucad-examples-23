// mock items data
const items = [
    {id: 5, name: 'porkkana'},
    {id: 6, name: 'omena'},
    {id: 19, name: 'appelsiini'},
  ];
  
  const getItems = (req, res) => {
    res.json(items);
  };
  
  const getItemsById = (req, res) => {
    // TODO: if item with id exists send it, otherwise sen 404
    console.log('getItemsById', req.params);
    const item = items.find((element) => element.id == req.params.id);
    if (item) {
      res.json(item)
    } else {
      res.status(404);
      res.json({message: "Item not found."});
    }
  };
  
  const postItem = (req, res) => {
    console.log('New item posted', req.body);
    //Todo
    if (req.body.name){
    items.push({id: 0, name: req.body.name})
    res.sendStatus(201)
    } else{
      res.sendStatus(400)
    }
  };
  
  // TODO: add deleteItem(), putItem() and routing for those in index.js
  
  const deleteItem = (res, id) => {
    // Find the index of the item with the specified ID
    const index = items.findIndex((item) => item.id == id);
  
    if (index !== -1) {
      // Remove the item from the array
      items.splice(index, 1);
      //Responding with 204 (No Content) to indicate that the item was successfully deleted
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end('{"message": "Item deleted."}');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('{"message": "Item not found."}');
    }
  };
  
  const putItem = (req, res, id) => {
    let body = [];
  
    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('req body', body);
        body = JSON.parse(body);
  
        // Find the index of the item with the specified ID
        const index = items.findIndex((item) => item.id == id);
  
        if (index !== -1) {
          // Modify the item with the new data
          // If the item with the specified ID is found, update its 'name' property with the new data.
          items[index].name = body.name;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('{"message": "Item modified."}');
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end('{"message": "Item not found."}');
        }
      });
  };
  
  export { getItems, getItemsById, postItem, deleteItem, putItem };
  