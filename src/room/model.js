var Rooms = require('../../models/rooms');

class RoomInfo {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.persons = [];
    this.maxNum = 100;
  }

  setPersons(id, user) {
    Rooms.update({ _id: id }, {
      $addToSet: { persons: user },
    }, (err, data) => {
      console.log('err', err);
    });
  }

  leavePersons(id, user) {
    Rooms.update({ _id: id }, {
      $pull: { persons: { name: user } },
    }, (err, data) => {
    });
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