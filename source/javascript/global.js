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

var defaultValues = {

    "language": "languages/english.js"

};

var tb_languages = {

    "English": "languages/english.js",
    "Norsk (Bokmål)": "languages/norwegian.js"

};

$(document).ready(function() {

    chrome.storage.onChanged.addListener(function(changes, namespace) {

        for (key in changes) {

            console.log(key + " has been stored as \"" + changes[key].newValue + "\"");

        }

    });

    chrome.storage.sync.get({language: defaultValues.language}, function(obj) {

        var languageScript = document.createElement("script");

        languageScript.type = "text/javascript";
        languageScript.id = "language-script";
        languageScript.src = obj.language;

        $("head").append(languageScript);

        // Because chrome.storage.sync.get is asynchronous, the following code has to be inside it's callback

        for (var key in tb_language) {

            $(key).html(tb_language[key]);

        }

    });

});
