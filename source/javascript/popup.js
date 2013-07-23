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

var currentTab;

chrome.tabs.getSelected(null, function (tab) {

    currentTab = getDomain(tab.url);

    $("#domain-info").append(" " + currentTab + " <img src='" + tab.favIconUrl + "'/>");

});

$(document).ready(function() {

    chrome.storage.sync.get({blocked_domains: []}, function(obj) {

        setInput("start");
        setInput("end");
        setCheckbox("monday");
        setCheckbox("tuesday");
        setCheckbox("wednesday");
        setCheckbox("thursday");
        setCheckbox("friday");
        setCheckbox("saturday");
        setCheckbox("sunday");

        if ($.inArray(currentTab, obj.blocked_domains) !== -1) {

            $("#block").attr("checked", "checked");

        } else {

            $("#start").attr("disabled", "disabled");
            $("#end").attr("disabled", "disabled");
            $("#monday").attr("disabled", "disabled");
            $("#tuesday").attr("disabled", "disabled");
            $("#wednesday").attr("disabled", "disabled");
            $("#thursday").attr("disabled", "disabled");
            $("#friday").attr("disabled", "disabled");
            $("#saturday").attr("disabled", "disabled");
            $("#sunday").attr("disabled", "disabled");

        }

    });

    $("#block").change(function() {

        if ($(this).prop("checked")) {

            chrome.storage.sync.get({blocked_domains: []}, function(obj) {

                obj.blocked_domains.push(currentTab);

                chrome.storage.sync.set({blocked_domains: obj.blocked_domains});

            });

            $("#start").removeAttr("disabled");
            $("#end").removeAttr("disabled");
            $("#monday").removeAttr("disabled");
            $("#tuesday").removeAttr("disabled");
            $("#wednesday").removeAttr("disabled");
            $("#thursday").removeAttr("disabled");
            $("#friday").removeAttr("disabled");
            $("#saturday").removeAttr("disabled");
            $("#sunday").removeAttr("disabled");

        } else {

            chrome.storage.sync.get({blocked_domains: []}, function(obj) {

                obj.blocked_domains.splice(obj.blocked_domains.indexOf(currentTab), 1);

                chrome.storage.sync.set({blocked_domains: obj.blocked_domains});

            });

            $("#start").attr("disabled", "disabled");
            $("#end").attr("disabled", "disabled");
            $("#monday").attr("disabled", "disabled");
            $("#tuesday").attr("disabled", "disabled");
            $("#wednesday").attr("disabled", "disabled");
            $("#thursday").attr("disabled", "disabled");
            $("#friday").attr("disabled", "disabled");
            $("#saturday").attr("disabled", "disabled");
            $("#sunday").attr("disabled", "disabled");

        }

    });

    addInputStorage("start");
    addInputStorage("end");
    addCheckboxStorage("monday");
    addCheckboxStorage("tuesday");
    addCheckboxStorage("wednesday");
    addCheckboxStorage("thursday");
    addCheckboxStorage("friday");
    addCheckboxStorage("saturday");
    addCheckboxStorage("sunday");

});

function addInputStorage(input) {

    $("#" + input).change(function() {

        var obj = {};
        obj[currentTab + "_" + input] = $(this).val();

        chrome.storage.sync.set(obj);

    });

}

function addCheckboxStorage(input) {

    $("#" + input).change(function() {

        var obj = {};
        obj[currentTab + "_" + input] = $(this).prop("checked");

        chrome.storage.sync.set(obj);

    });

}

function setInput(input) {

    var key = currentTab + "_" + input;
    var obj = {};
    obj[key] = "";

    chrome.storage.sync.get(obj, function(obj1) {

        $("#" + input).val(obj1[key]);

    });

}

function setCheckbox(input) {

    var key = currentTab + "_" + input;
    var obj = {};
    obj[key] = "";

    chrome.storage.sync.get(obj, function(obj1) {

        if (obj1[key] === true) {

            $("#" + input).attr("checked", "checked");

        } else if (obj1[key] === false) {

            $("#" + input).removeAttr("checked");

        }

    });

}

function getDomain(url) {

    var element = document.createElement("a");

    element.href = url;

    return element.hostname;

}
