const users = [
  {
    id: 1,
    name: 'A'
  },

  {
    id: 2,
    name: 'B'
  },
  {
    id: 3,
    name: 'C'
  },
]

const findUserById = (id) => {
  if (!id) {
    return 'Parameter missing';
  }
  if (typeof id !== 'number') {
    return 'Parameter must be a number';
  }
  const user = users.find(user => user.id === id);
  if (!user) {
    return `User with ID ${id} not found`;
  }
  return user;
}

module.exports = findUserById;