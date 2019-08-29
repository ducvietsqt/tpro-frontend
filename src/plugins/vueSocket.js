/*(function WebSocketTest(wsUri, session_id) { // eslint-disable-line
  wsUri = wsUri || "wss://echo.websocket.org/";
  let output = 0;
  let websocket = new WebSocket(wsUri);
  function init() {
    testWebSocket();
  }

  function testWebSocket() {

    websocket.onopen = function (evt) {
      onOpen(evt)
    };
    websocket.onclose = function (evt) {
      onClose(evt)
    };
    websocket.onmessage = function (evt) {
      onMessage(evt)
    };
    websocket.onerror = function (evt) {
      onError(evt)
    };
  }

  function onOpen(evt) { // eslint-disable-line
    writeToScreen("CONNECTED");
    doSend("WebSocket rocks");
  }

  function onClose(evt) { // eslint-disable-line
    writeToScreen("DISCONNECTED");
  }

  function onMessage(evt) {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
    websocket.close();
  }

  function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function doSend(message) {
    writeToScreen("SENT: " + message);
    websocket.send(message);
  }

  function writeToScreen(message) {
    output += message;
    console.log(output)
  }
  window.WebSocketTest = WebSocketTest
  // run
  init()
})("wss://echo.websocket.org/", "d9338518-d105-4bf4-9956-d7a8193ab1f3", "session_id");*/


import ReconnectingWebSocket from 'reconnecting-websocket'
import {getSESSION, SESSION} from "../utils";

export default {
  install(Vue, {eventbus}) {
    // Pass event bus to websocket handler so it can broadcast received messages to concerned parties.
    if (eventbus === undefined || eventbus.$emit === undefined) {
      throw Error('Expecting eventbus to be passed as an option to websocket plugin')
    }

    const ws = new Websocket({eventbus})

    Vue.prototype.$ws = ws

    // Expose $ws so we can access it from
    // the browser console
    // @todo disable this when not in debug mode
    window.$ws = ws
  },
}

function Websocket({eventbus}) {
  this.active = false
  this.conn = null
  this.echoMessages = false
  this.queue = []
  this.$bus = eventbus
}

Websocket.prototype = Object.assign(Websocket.prototype, {
  connected() {
    return this.active
  },

  connect() {
    // check if already connected
    if (this.connected()) return;

    const jwt = getSESSION(SESSION.TOKEN);

    if (!jwt) {
      return
    }

    // const url = this.guessBaseUrl(process.env.VUE_APP_API_HOST) + '/?jwt=' + jwt;
    const url = 'wss://echo.websocket.org/';

    this.conn = new ReconnectingWebSocket(url)
    this.conn.debug = true
    this.conn.reconnectInterval = 3000

    document.addEventListener('beforeunload', () => {
      // Disconnect when we navigate away/close window
      this.close()
    })

    this.conn.addEventListener('open', () => {
      this.$bus.$emit(`$ws.open`, true)
      // rws.send('hello!');
      console.debug('Connected to Crust Messaging Websocket')
      this.active = true
      if (this.queue.length > 0) {
        console.debug(`Connected, draining message queue (l=${this.queue.length})`)
        while (this.active && this.queue.length > 0) {
          const msg = this.queue.shift()
          if (msg) {
            this.conn.send(msg)
          }
        }
      }
    })

    this.conn.addEventListener('close', (ev) => { // eslint-disable-line
      this.active = false
    })

    this.conn.addEventListener('message', (ev) => {
      alert(1);
      console.log('Message', ev.data);
      this.$bus.$emit(`$ws.message`, ev.data)
      /*const payload = JSON.parse(ev.data)
      console.log('ev.data', ev.data)
      if (this.echoMessages) {
        console.debug('$ws.@message', payload)
      }

      for (const type in payload) {
        this.$bus.$emit(`$ws.${type}`, payload[type])
      }*/
    })
  },

  guessBaseUrl(messagingAPI) {
    console.log('messagingAPI', messagingAPI)
    if (messagingAPI.substring(0, 2) === '//') {
      // No schema but with hostname
      return location.protocol.replace(/^http/, 'ws') + messagingAPI
    }
    if (messagingAPI.substring(0, 1) === '/') {
      // No schema, no hostname,..
      return location.protocol.replace(/^http/, 'ws') + '//' + location.host + messagingAPI
    }
    return messagingAPI.replace(/^http/, 'ws')
  },

  close() {
    this.conn.close()
  },
  send(ms) {
    this.conn.send(ms)
  },
  converters: {
    message(m) {
      return {
        message: m
      }
    },

  },
})


