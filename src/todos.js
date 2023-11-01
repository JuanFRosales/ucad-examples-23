const todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build a REST API', completed: true },
  ];

const getTodos = (res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const jsonTodos = JSON.stringify(todos);
    res.end(`{"message": "All tasks", "todos" : ${jsonTodos}}`);
  };

  const getTodoById = (res, id) => {
    // Find the to-do item with the specified ID
    const todo = todos.find((item) => item.id == id);
  
    if (todo) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(todo));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('{"message": "To-do item not found."}');
    }
  };
  
const addTodo = (req, res) => {
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
  
        if (!body.task || typeof body.completed !== 'boolean') {
          // Check if the request body is valid. It should have 'task' and 'completed' fields.
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end('{"message": "Invalid data."}');
          return;
        }
  
      // check id of the last item in items and add 1
      const newId = todos[todos.length - 1].id + 1;
      todos.push({ id: newId, text: body.task, completed: body.completed });
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(`{"message": "List updated"}`);
    });
  };
  
  const deleteTodo = (res, id) => { 
    const index = todos.findIndex((todo) => todo.id == id);
  
    if (index !== -1) {
      // Remove the task from the array
      todos.splice(index, 1);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end('{"message": "Task deleted."}');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('{"message": "Task not found."}');
    }
  };
  const updateTodo = (req, res, id) => {
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
        const index = todos.findIndex((todo) => todo.id == id);
  
        if (index !== -1) {
          // Modify the item with the new data
          todos[index].text = body.text; // Update the 'text' property
          todos[index].completed = body.completed; // Update the 'completed' property
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('{"message": "Task updated."}');
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end('{"message": "Task not found."}');
        }
      });
  }; 

export {getTodos, getTodoById, addTodo, deleteTodo, updateTodo };
