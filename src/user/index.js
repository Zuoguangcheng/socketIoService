let rooms = require('../room');

class UserInfo {
  constructor(id, name, socket) {
    this.name = name;
    this.id = id;
    this.socket = socket;
    this.room = '';
  }

  init() {
    this.socket.emit('rooms', new rooms().getRooms());
    this.socket.on('chatMsg', (id, record) => {
      console.log('id', id)
      console.log('record', record)
      this.socket.to(id).emit('chatMsg', record)
    })
    this.getChannelDetail();
  }

  getChannelDetail() {
    this.socket.on('getChannel', id => {
      // 清除之前加入过的房间
      let roomss = Object.keys(this.socket.rooms);
      let leaveRooms = roomss.splice(1, roomss.length);
      if (leaveRooms.length > 0) {
        leaveRooms.forEach(element => {
          this.socket.leave(element);
        });
      }

      this.socket.join(id, (e) => {
        const roomsList = new rooms().getRooms();
        let roomDetail = roomsList.filter(item => {
          return item.id === id
        })
        this.socket.emit('roomsDetail', roomDetail)
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