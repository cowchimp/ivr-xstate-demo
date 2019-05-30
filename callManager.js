const { interpret } = require('xstate');
const machine = require('./machine');

class CallManager {
  constructor() {
    this.calls = {};
  }

  createCall(uuid) {
    const service = interpret(machine).start();
    this.calls[uuid] = service;
  }

  updateCall(uuid, event) {
    const call = this.calls[uuid];
    if(call) {
      call.send(event);
    }
  }

  getNcco(uuid) {
    const call = this.calls[uuid];
    if(!call) {
      return [];
    }
    return call.state.meta[`${call.id}.${call.state.value}`].ncco;
  }

  endCall(uuid) {
    delete this.calls[uuid];
  }
}

exports.callManager = new CallManager();
