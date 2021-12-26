const { nanoid } = require('nanoid');

const list = [];

const createUser = (req, res) => {
  const { name, age, salary, hobbies } = req.body;
  try {
    if (name && age && salary && hobbies) {
      const body = { id: nanoid(), name, age, salary, hobbies };
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

const retrieveUser = (req, res) => {};

const retrieveUsers = (req, res) => res.status(200).json({ list });

module.exports = { createUser, retrieveUser, retrieveUsers };

/**
 * {
    id: '',
    name: '',
    age: 0,
    salary: 0,
    hobbies: [],
  },
 */
