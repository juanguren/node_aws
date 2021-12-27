const { nanoid } = require('nanoid');
const { list } = require('./utils/utils');
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
    const userData = await axios.get('http://localhost:5000/tests');
    const userResponse = await userData.data;
    userResponse.list.map((user) => {
      if (user.id == userId) user.active = true;
    });
    return res.status(200).json(userResponse.list);
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
