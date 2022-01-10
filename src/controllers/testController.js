const { nanoid } = require('nanoid');
const { list, getUserIndex } = require('./utils/utils');
const { fetchArrayAPI } = require('../services/serverless');
const users = require('./utils/users.json');
const fs = require('fs');

const createUserInCloud = async (req, res) => {
  try {
    const body = req.body;
    const response = await fetchArrayAPI('post', '', body);
    res.send(response);
  } catch (error) {
    res.json(error);
  }
};

const createUser = (req, res) => {
  const { name, age, salary, hobbies } = req.body;
  try {
    if (name && age && salary && hobbies) {
      const body = {
        id: nanoid(),
        name,
        age,
        salary,
        active: false,
        hobbies,
      };
      list.push(body);
      return res
        .status(204)
        .json({ message: `User ${name} created` });
    } else {
      throw 'Incomplete body';
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const activateUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const userIndex = getUserIndex(users, userId);
    if (userIndex == -1) throw 'User not found';

    users[userIndex].active = true;
    fs.writeFile(
      './utils/users.json',
      JSON.stringify(users),
      (error) => {
        console.log(true);
      },
    );
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404 || error.status).json({ error });
  }
};

const retrieveUser = (req, res) => {
  const { state: userState } = req.params;
  try {
    if (userState == 'active' || userState == 'inactive') {
      const stateOptions = {
        active: true,
        inactive: false,
      };
      const foundUser = users.filter(
        (user) => user.active == stateOptions[userState],
      );
      return res.status(200).json({ user: foundUser });
    }
    throw 'Incorrect search param';
  } catch (error) {
    res.status(404).json({ error });
  }
};

const retrieveUsers = (req, res) => res.status(200).json({ list });

const deleteUser = (req, res) => {
  const { id } = req.params;

  try {
    const user = getUserIndex(users, id);
    users.slice(user);
  } catch (error) {
    return res.status(404).json('Error');
  }
};

module.exports = {
  createUser,
  retrieveUser,
  retrieveUsers,
  activateUser,
  deleteUser,
  createUserInCloud,
};

/**
 * {
    id: '',
    name: '',
    age: 0,
    salary: 0,
    hobbies: [],
  },
 */
