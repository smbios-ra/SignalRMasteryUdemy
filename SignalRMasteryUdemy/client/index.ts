﻿import * as signalR from "@microsoft/signalr"

import { CustomLogger } from "./customLogger"

var counter = document.getElementById("viewCounter");

//  Create Connection
let connection = new signalR.HubConnectionBuilder()
    //  .configureLogging(signalR.LogLevel.Trace)
    .configureLogging(new CustomLogger())
    .withUrl("/hub/view")
    .build();

//  On View Update Message from Client
connection.on("viewCountUpdate", (value: number) => {
    counter.innerText = value.toString();
});

//  Notify server we're watching
function notify() {
    connection.send("notifyWatching");
}

//  Start Connection
function startSuccess() {
    console.log("Connected.");
    notify();
}
function startFail() {
    console.log("Connection failed.");
}
connection.start().then(startSuccess, startFail);