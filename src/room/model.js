const _default = {
  maxNum: 100,
}

class RoomInfo {
  constructor(id, name, user) {
    this.id = id;
    this.name = name;
    this.persons = [];
    this.maxNum = _default.maxNum;
  }
  setPersons(user) {
    this.persons.push(user);
  }
}

module.exports = RoomInfo;