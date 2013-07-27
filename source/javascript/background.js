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

var script = document.createElement("script");

script.src = "languages/english.js";
script.type = "text/javascript";

document.getElementsByTagName("head")[0].appendChild(script);

chrome.runtime.onConnect.addListener(function(port) {

    console.assert(port.name == "tb_runtime");
    port.onMessage.addListener(function(message) {

        if (message.applyTimeBlocked === true && port.sender.tab) {

            var domain = getDomain(port.sender.tab.url);

            chrome.storage.sync.get({blocked_domains: []}, function(obj) {

                if ((obj.blocked_domains.filter(function(data) { return data == domain; }))[0]) {

                    var d = new Date();
                    var hours = d.getHours();
                    var minutes = d.getMinutes();
                    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]; // *waves fist angrily in the air*

                    var obj1 = {};
                    obj1[domain + "_" + days[d.getDay()]] = "";

                    chrome.storage.sync.get(obj1, function(obj2) {

                        var obj3 = {};
                        obj3[domain + "_start"] = "00:00";

                        chrome.storage.sync.get(obj3, function(obj4) {

                            var d1 = new Date();
                            d1.setHours(obj4[domain + "_start"].split(":")[0]);
                            d1.setMinutes(obj4[domain + "_start"].split(":")[1]);

                            var obj5 = {};
                            obj5[domain + "_end"] = "23:59";

                            chrome.storage.sync.get(obj5, function(obj6) {

                                var d2 = new Date();
                                d1.setHours(obj6[domain + "_end"].split(":")[0]);
                                d1.setMinutes(obj6[domain + "_end"].split(":")[1]);

                                if (obj2[domain + "_" + days[d.getDay()]] && d.getHours() <= d1.getHours() && (d.getHours() != d1.getHours() || d.getMinutes() <= d1.getMinutes()) && d.getHours() >= d2.getHours() && (d.getHours() != d2.getHours() || d.getMinutes() >= d2.getMinutes())) {

                                    port.postMessage({

                                        "blockWebsite": domain,
                                        "blockTitle": tb_language["#lan-blocked-title"],
                                        "blockMessage": tb_language["#lan-blocked-message"],
                                        "timeLeft": d.getTime() - d2.getTime()

                                    });

                                }

                            });

                        });

                    });

                }

            });

            chrome.pageAction.show(port.sender.tab.id);

        }

    });

});

function getDomain(url) {

    var element = document.createElement("a");

    element.href = url;

    return element.hostname;

}
