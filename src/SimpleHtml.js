(function () {
    /*
        Javascript library to load web, data using html elements attributes
        
    */
    var SimpleHtml = {
        VERSION: "0.1",
        ClassName: "simple-html",
        JsonDataAttributeName: "sh-data-json",
        Message: "",
        Error: "",

        htmlAjax: function () {
            //console.log(arguments);

            if (arguments.length === 0) {
                Message = "arguments empty.";
                return false;
            }

            var args = [];
            [].push.apply(args, arguments);
            var element = args.shift(),
                shData = args.shift();

            //console.log(element);
            //console.log(shData);

            if (!element || !shData) {
                Message = "invalid parameters";
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
                Message = "Can not create XMLHTTP instance.";
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


    //console.log("Version: ", SimpleHtml.VERSION);
    SimpleHtml.addEvent(window, "load", function () {
        
        var simpleHtmls = document.getElementsByClassName(SimpleHtml.ClassName);
        [].forEach.call(simpleHtmls, function(element) {
            //console.log(element.getAttribute(SimpleHtml.JsonDataAttributeName));
            var shData = JSON.parse(element.getAttribute(SimpleHtml.JsonDataAttributeName));
            SimpleHtml.htmlAjax(element, shData);
        })
        
        // $(".simple-html").each(function () {
        //     var shData = JSON.parse($(this).attr("sh-data-json"));

        //     //console.log(shData);
        //     SimpleHtml.htmlAjax(this, shData);
        // });

    });

}());