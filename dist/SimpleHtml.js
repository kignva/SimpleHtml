﻿(function () {
    /*
        Javascript library to load web, data using html elements attributes
        Message: {Type: Error, Text: There is an error}
    */
    var SimpleHtml = {
        VERSION: "0.1",
        ClassName: "simple-html",
        JsonDataAttributeName: "sh-data-json",
        Messages: [],
        Error: "",
        // events
        LogChange: null,
        

        htmlAjax: function () {
            if (arguments.length === 0) {
                this.log("arguments empty.");
                return false;
            }

            var args = [];
            [].push.apply(args, arguments);
            var element = args.shift(),
                shData = args.shift();

            if (!element || !shData) {
                this.log("Invalid parameters");
                return false;
            }

            SimpleHtml.ajax({
                url: shData.url,
                type: 'GET',
                dataType: 'HTML',
                success: function (html) {
                    //element.html("").append(html);
                    element.innerHTML = html;
                }

            });

        },
        
        /*
            query string format: "name=value&anothername="+encodeURIComponent(myVar)+"&so=on"
            options = {url: "", success: function(){}}
        */
        ajax: function(options) {
            if (!options) return;
            
            var xhr;
            if (window.XMLHttpRequest)  // Chrome, Firefox, IE7+ , ...
            {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) // IE6 and older
            {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                } 
                catch (e) {
                    try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    } 
                    catch (e) {}
                }
            }
            
            if (!xhr) {
                this.log( "Can not create XMLHTTP instance.");
                return false;
            }
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4)   // complete 
                {
                    if (xhr.status === 200)  // Success 
                    {
                        if (options.success) {
                            options.success(xhr.responseText);
                        } 
                    } else {
                        
                    }
                } else {
                    // still not ready
                }
            } 
            
            var type = options.type || "GET";
            var async = options.async || true;
            
            if (options.url){
                xhr.open(type, options.url, async);
            }
            
            if (options.contentType) {
                xhr.setRequestHeader("Content-Type", options.contentType);
            }
            
            xhr.send(options.data);
            
            
        },
        
        log: function(text, type, data) {
            type = type || "Info";
            this.Messages.push({
                Type: type, 
                Text: text, 
                Data: data,
                DateTime: new Date()
                });
            if (this.LogChange && typeof this.LogChange === 'function')
            {
                this.LogChange.call(this, this.Messages);
            }
        },

        addEvent: function (element, eventName, fn) {
            if (element.addEventListener) {
                element.addEventListener(eventName, fn, false);
            }
            else if (element.attachEvent)   // IE
            {
                element.attachEvent("on" + eventName, fn);
            }
        }

    }

    SimpleHtml.addEvent(window, "load", function () {
        var simpleHtmls = document.getElementsByClassName(SimpleHtml.ClassName);
        [].forEach.call(simpleHtmls, function(element) {
            var shData = JSON.parse(element.getAttribute(SimpleHtml.JsonDataAttributeName));
            SimpleHtml.htmlAjax(element, shData);
        });
    });
    
    SimpleHtml.LogChange = function(messages){
        //console.log(messages[messages.length - 1]);
    }

}());