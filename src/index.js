import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getItems, getItemsById, postItem, deleteItem, putItem } from './items.js';
import { getMedia, getMediaById, postMedia, putMedia, deleteMedia } from './media.js';
import { getUserById, getUsers, postUser, putUser, deleteUser} from './user.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));

app.use('/media', express.static(path.join(__dirname, 'media')));
// simple custom middleware for logging/debugging all requests
app.use((req, res, next) => {
  console.log('Time:', Date.now(), req.method, req.url);
  next();
});


// render pug a file (home.pug) example
app.get('/', (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render('home', values);
});

// dummy routing example
app.get('/kukkuu', (request, response) => {
  const myResponse = { message: "No moro!" };
  // response.json(myResponse);
  response.sendStatus(200);
});

// other dummy pug example
app.get('/:message', (req, res) => {
  const values = { title: "Dummy REST API docs", message: req.params.message };
  res.render('home', values);
});

// example generic items API

// Get all items
app.get('/api/items', getItems);

// Get items by ID
app.get('/api/items/:id', getItemsById);

// Modify an item (update item by ID)
app.put('/api/items/:id', putItem);

// Add a new item
app.post('/api/items', postItem);

// Remove an existing item by ID
app.delete('/api/items/:id', deleteItem);

// Media endpoints
app.get('/api/media', getMedia);
app.get('/api/media/:id', getMediaById);
app.post('/api/media', postMedia);
app.put('/api/media/:id', putMedia);
app.delete('/api/media/:id', deleteMedia);

// User endpoints
app.get('/api/user', getUsers);
app.get('/api/user/:id', getUserById);
app.post('/api/user', postUser);
app.put('/api/user/:id', putUser);
app.delete('/api/user/:id', deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
