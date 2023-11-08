import users from './mock-data/user.json' assert {type: 'json'};

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found." });
  }
}

const postUser = (req, res) => {
  console.log('new user posted', req.body,);
  const newId = Math.floor(Math.random() * 9000 + 1000);
  if (req.body.username) {
    users.push({
      user_id: newId,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      user_level_id: req.body.user_level_id,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
}

const putUser = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);
  if (user) {
    console.log('Found user:', user);
    
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.user_level_id) {
      user.user_level_id = req.body.user_level_id;
    }

    console.log('Updated user:', user);

    res.status(200).json({ message: "User updated successfully." });
  } else {
    res.status(404).json({ message: "User not found." });
  }
}

const deleteUser = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);
  if (user) {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    res.status(404).json({ message: "User not found." });
  }
}


export { getUsers, getUserById, postUser, putUser, deleteUser};