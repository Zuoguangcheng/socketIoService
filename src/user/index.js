let rooms = require('../room');

class UserInfo {
  constructor(id, name, socket) {
    this.name = name;
    this.id = id;
    this.socket = socket;
    this.room = '';
    this.rooms = new rooms();
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

  async getRoomsList() {
    let rooms = await this.rooms.getRooms();
    this.socket.emit('rooms', rooms);
  }

  leaveRooms() {
    this.socket.on('leaveRooms', id => {
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
    this.socket.on('selectRooms', async id => {
      let roomsDetail = await this.rooms.selectRoom(id);

    });
  }

  getChannelDetail() {
    this.socket.on('getChannel', id => {
      this.socket.join(id, async (e) => {
        let roomsDetail = await this.rooms.selectRoom(id);
        this.socket.emit('roomsDetail', roomsDetail);
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