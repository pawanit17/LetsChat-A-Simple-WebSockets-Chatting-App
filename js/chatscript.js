function clearTextInput()
{
    // Clear the user entered text message upon transmission to the server.
    $("#inputMessageTextBox").val("");
}

function sendMessage() {
    // Send the message to the server.
    ws.send( $("#inputMessageTextBox").val() );
    
    // And also add this message to the TextArea in the UI.
    $("#conversationHistoryTextArea").val( $("#conversationHistoryTextArea").val() + "\n" + "YOU: " + $("#inputMessageTextBox").val() );
}

// Establish a socket connection to port 8000 on the current host where the NodeJS back end is running.
let ws = new WebSocket("ws://localhost:8000");
ws.onopen = function(event) {
    console.log("Client: WebSocket request accepted.");
};

ws.onmessage = function(event) {
    console.log("Received from the server" + event.data);

    // If this is the first message, just add it to the TextArea without a New Line.
    // If this is not the case, append it to the TextArea instead.
    if( $("#conversationHistoryTextArea").val().trim().length > 0 )
        $("#conversationHistoryTextArea").val( $("#conversationHistoryTextArea").val() + "\n" + "SERVER: " + event.data );
    else
        $("#conversationHistoryTextArea").val( "SERVER: " + event.data );
};

