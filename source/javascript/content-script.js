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

port.postMessage({"showPageAction": true});
port.onMessage.addListener(function(message) {

    if (message.blockWebsite) {

        var content = "<div style='background: #FAFAFA; width: 800px; margin: 64px auto 0; border: 1px solid #EFEFEF; border-radius: 16px; padding: 32px;'><h1 style='font: 32px normal \"Segoe UI\", \"Tahoma\", sans-serif; margin: 0;'>" + message.blockTitle + "</h1><hr /><p style='font: 12px normal \"Helvetica\", \"Verdana\", \"Arial\", sans-serif;'>" + message.blockMessage.replace("[domain]", message.blockWebsite) + "</p></div>";

        document.body.innerHTML = content;

        var i = 0, refresh = setInterval(function() {

            i++;

            if (i > 20) {

                clearInterval(refresh);
                return;

            }

            if (decodeEntities(document.body.innerHTML) !== decodeEntities(content)) {

                document.body.innerHTML = content;

            }

        }, 250);

    }

});

var decodeEntities = (function() {

    var element = document.createElement("div");

    function decodeHTMLEntities (html) {

        if (html && typeof html === "string") {

            html = html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "");
            html = html.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, "");
            element.innerHTML = html;
            html = element.textContent;
            element.textContent = "";

        }

        return html;

    }

    return decodeHTMLEntities;

})();
