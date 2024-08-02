$(document).ready(function() {
    let ws;

    function setupWebSocket(username, password) {
        //change to static address
        ws = new WebSocket("ws://localhost:4444/websocket");

        ws.onopen = function() {
            ws.send(JSON.stringify({ username: username, password: password }));
        };

        ws.onmessage = function(event) {
            let chatText = $("#chat-text");
            let data = JSON.parse(event.data);
            chatText.append(`<div><strong>${data.username}:</strong> ${data.text}</div>`);
        };
    }

    $("#register-form").submit(function(event) {
        event.preventDefault();
        let username = $("#register-username").val();
        let password = $("#register-password").val();
        $.ajax({
            url: "/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: username, password: password }),
            success: function() {
                alert("Registration successful!");
            },
            error: function(xhr) {
                alert("Error: " + xhr.responseText);
            }
        });
    });

    $("#login-form").submit(function(event) {
        event.preventDefault();
        let username = $("#login-username").val();
        let password = $("#login-password").val();
        $.ajax({
            url: "/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: username, password: password }),
            success: function() {
                $("#register-login-form").hide();
                $("#chat-room").show();
                setupWebSocket(username, password);
            },
            error: function(xhr) {
                alert("Error: " + xhr.responseText);
            }
        });
    });

    $("#input-form").submit(function(event) {
        event.preventDefault();
        let inputText = $("#input-text").val();
        ws.send(JSON.stringify({ text: inputText }));
        $("#input-text").val("");
    });
});
