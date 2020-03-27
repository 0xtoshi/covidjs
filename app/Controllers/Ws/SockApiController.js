'use strict'

class SockApiController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = SockApiController
