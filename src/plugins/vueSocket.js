(function WebSocketTest(wsUri, session_id) { // eslint-disable-line
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

  // run
  init()
})("wss://echo.websocket.org/", "d9338518-d105-4bf4-9956-d7a8193ab1f3", "session_id");

