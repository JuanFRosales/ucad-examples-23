import http from 'http';
import { getItems, getItemsById, postItem, deleteItem, putItem } from './items.js';
import {getTodos, getTodoById,addTodo, deleteTodo, updateTodo } from './todos.js'

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('request', req.method, req.url);
  const { method, url } = req;
  const reqParts = url.split('/');

  // Check method, URL, and generate responses accordingly (routing)
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome to my API</h1>');
    res.write('<p>Documentation comes here</p>');
    res.end();
  } else if (method === 'GET' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('GETting item with id', reqParts[2]);
    getItemsById(res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] === 'items') {
    console.log('GETting all items');
    getItems(res);
  } else if (method === 'POST' && reqParts[1] === 'items') {
    console.log('POSTing a new item');
    postItem(req, res);
  } else if (method === 'DELETE' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('DELETE item with id', reqParts[2]);
    deleteItem(res, reqParts[2]);
  } else if (method === 'PUT' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('PUT item with id', reqParts[2]);
    putItem(req, res, reqParts[2]);
  }  else if (method === 'GET' && url === '/todos') {
    // Retrieve the list of to-do items
    getTodos(res);
  } else if (method === 'POST' && url === '/todos') {
    // Add a new to-do item
    addTodo(req, res);
  } else if (method === 'GET' && reqParts[1] === 'todos' && reqParts[2]) {
    // Retrieve a specific to-do item by ID
    getTodoById(res, reqParts[2]);
  } else if (method === 'PUT' && reqParts[1] === 'todos' && reqParts[2]) {
    // Update a to-do item by ID
    updateTodo(req, res, reqParts[2]);
  } else if (method === 'DELETE' && reqParts[1] === 'todos' && reqParts[2]) {
    // Delete a to-do item by ID
    deleteTodo(res, reqParts[2]);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('{"message": "404 Resource not found!"}');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
