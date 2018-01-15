var Rooms = require('../../models/rooms');

class RoomInfo {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.persons = [];
    this.maxNum = 100;
  }

  setPersons(user) {
    this.persons.push(user);
  }

  leavePersons(user) {
    const index = this.persons.indexOf(user);
    this.persons.splice(index, 1);
  }

  getRooms() {
    return new Promise((resolve, reject) => {
      Rooms.find((err, data) => {
        resolve(data);
      });
    });
  }

  selectRoom(id) {
    return new Promise((resolve, reject) => {
      Rooms.find({ _id: id }, (err, data) => {
        resolve(data);
      });
    });
  }
}

module.exports = RoomInfo;