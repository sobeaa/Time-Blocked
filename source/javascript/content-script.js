/*
    
    Copyright 2013 Sondre Benjamin Aasen

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    
*/

var port = chrome.runtime.connect({name: "tb_runtime"});

port.postMessage({"applyTimeBlocked": true});
port.onMessage.addListener(function(message) {

    if (message.blockWebsite) {

        document.head.innerHTML = "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'/><title>Time Blocked</title>";
        document.body.innerHTML = "<div style='background: #FFFFFF; position: fixed; top: 0; right: 0; bottom: 0; left: 0;'><div style='background: #FAFAFA; width: 800px; margin: " + ((screen.height / 2) - 160) + "px auto 0; border: 1px solid #EFEFEF; border-radius: 16px; padding: 32px;'><h1 style='font: 32px normal \"Segoe UI\", \"Tahoma\", sans-serif; margin: 0;'>" + message.blockTitle + "</h1><hr /><p style='font: 12px normal \"Helvetica\", \"Verdana\", \"Arial\", sans-serif;'>" + message.blockMessage.replace("[domain]", message.blockWebsite) + "</p></div></div>";

    }

});
