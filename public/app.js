$(function () {
  let websocket = new WebSocket("ws://" + window.location.host + "/websocket");
  let room = $("#chat-text");

  websocket.addEventListener("open", function (e) {
      console.log("WebSocket connection opened.");
  });

  websocket.addEventListener("message", function (e) {
      let data = JSON.parse(e.data);
      let chatContent = `<p><strong>${data.username}</strong>: ${data.text}</p>`;
      room.append(chatContent);
      room.scrollTop = room.scrollHeight; // Auto scroll to the bottom
  });

  websocket.addEventListener("error", function (e) {
      console.error("WebSocket error:", e);
  });

  websocket.addEventListener("close", function (e) {
      console.log("WebSocket connection closed.");
  });

  $("#input-form").on("submit", function (event) {
      event.preventDefault();
      let username = $("#input-username")[0].value;
      let text = $("#input-text")[0].value;

      if (username === "" || text === "") {
          alert("Please enter both username and message.");
          return;
      }

      websocket.send(
          JSON.stringify({
              username: username,
              text: text,
          })
      );
      $("#input-text")[0].value = "";
  });
});
