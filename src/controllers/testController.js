const { nanoid } = require('nanoid');
const { list } = require('./utils/utils');
const users = require('./utils/users.json');
const fs = require('fs');
const axios = require('axios');

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
    const userIndex = users.findIndex((user) => user.id == userId);
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

const retrieveUser = (req, res) => {};

const retrieveUsers = (req, res) => res.status(200).json({ list });

module.exports = {
  createUser,
  retrieveUser,
  retrieveUsers,
  activateUser,
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
