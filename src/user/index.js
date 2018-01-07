let rooms = require('../room');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/socket';
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbase = db.db('socket');
  var rooms = dbase.collection('rooms');
});

class UserInfo {
  constructor(id, name, socket) {
    this.name = name;
    this.id = id;
    this.socket = socket;
    this.room = '';
  }

  init() {
    this.getRoomsList();
    this.getChatMsg();

    this.getChannelDetail();
    this.leaveRooms();
    this.selectRooms();
  }

  getChatMsg() {
    this.socket.on('chatMsg', (id, record) => {
      this.socket.to(id).emit('chatMsg', record);
    });
  }

  getRoomsList() {
    this.socket.emit('rooms', new rooms().getRooms());
  }

  leaveRooms() {
    this.socket.on('leaveRooms', id => {
      console.log('leaveRooms', id);
    });

    // 清除之前加入过的房间
    let roomss = Object.keys(this.socket.rooms);
    let leaveRooms = roomss.splice(1, roomss.length);
    if (leaveRooms.length > 0) {
      leaveRooms.forEach(element => {
        this.socket.leave(element);
      });
    }
  }

  selectRooms() {
    this.socket.on('selectRooms', id => {
      console.log('selectRooms', id);
      this.getChannelDetail();
    });
  }

  getChannelDetail() {
    this.socket.on('getChannel', id => {

      this.socket.join(id, (e) => {
        const roomsList = new rooms().getRooms();
        let roomDetail = roomsList.filter(item => {
          return item.id === id;
        });
        this.socket.emit('roomsDetail', roomDetail);
      });
    });
  }

  sendMessage(message) {
    this.socket.to(this.room).emit('message', message);
  }

  getUserInfo() {
    return {
      name: this.name,
      id: this.id,
    };
  }
}

module.exports = UserInfo;