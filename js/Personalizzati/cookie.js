var cookiesPolicy = {

    popupZIndex: "10000",

    colorOfButton: "#007bce",


    cookieExpiresDays: 30,

    cookieValue: "0",
    showPopup: false,
    popup: null,

    start: function() {
        window.addEventListener("load", cookiesPolicy.onLoad, false);
    },
    onLoad: function() {
        console.log("LOADED " + window.location.href);
        cookiesPolicy.getCookie();
        cookiesPolicy.createPopup();
    },
    getCookie: function() {
        var nameOfGeneral = cookiesPolicy.cookieGeneral + "=";
        var nameOfPreferences = cookiesPolicy.cookieCheckPref + "=";
        var nameOfStatistics = cookiesPolicy.cookieCheckStat + "=";
        var nameOfMarketing = cookiesPolicy.cookieCheckMark + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(nameOfGeneral) == 0) {
                cookiesPolicy.cookieValue = c.substring(nameOfGeneral.length, c.length);
            }
            if (c.indexOf(nameOfPreferences) == 0) {
                cookiesPolicy.prefCheckValue = c.substring(nameOfPreferences.length, c.length);
            }
            if (c.indexOf(nameOfStatistics) == 0) {
                cookiesPolicy.statCheckValue = c.substring(nameOfStatistics.length, c.length);
            }
            if (c.indexOf(nameOfMarketing) == 0) {
                cookiesPolicy.markCheckValue = c.substring(nameOfMarketing.length, c.length);
            }

        }
        return "";
    },
    createPopup: function() {
        cookiesPolicy.popup = document.createElement("div");
        var cssElement = document.createElement("style");
        cookiesPolicy.popup.id = "cookiePopup";
        cookiesPolicy.popup.innerHTML = cookiesPolicy.loadPopupContent();
        cssElement.innerHTML = cookiesPolicy.loadCSS();
        var element = document.getElementsByTagName("body")[0];
        element.appendChild(cookiesPolicy.popup);
        element.appendChild(cssElement);
        if (window.location.href === cookiesPolicy.urlCookiePolicy) {
            cookiesPolicy.popup.style.display = "none";
            if (cookiesPolicy.cookieValue === "1") {
                cookiesPolicy.loadScript();
            }
        } else if (cookiesPolicy.cookieValue === "1") {
            cookiesPolicy.popup.style.display = "none";
            cookiesPolicy.loadScript();
        }
    },
    loadPopupContent: function() {
        var checkForPref = "<input type=\"checkbox\" name=\"preferences\" value=\"preferences\" " + cookiesPolicy.prefCheckValue + "><span class=\"checkboxtext\">Preferenze</span>";
        var checkForStat = "<input type=\"checkbox\" name=\"statistics\" value=\"statistics\" " + cookiesPolicy.statCheckValue + "><span class=\"checkboxtext\">Statistiche</span>";
        var checkForMark = "<input type=\"checkbox\" name=\"marketing\" value=\"marketing\" " + cookiesPolicy.markCheckValue + "><span class=\"checkboxtext\">Marketing</span>";
        var allPrefScript = document.querySelectorAll("script[data-starcookie=\"preferences\"]");
        if (allPrefScript.length === 0) {
            checkForPref = "";
        }
        var allStatScript = document.querySelectorAll("script[data-starcookie=\"statistics\"]");
        if (allStatScript.length === 0) {
            checkForStat = "";
        }
        var allMarkScript = document.querySelectorAll("script[data-starcookie=\"marketing\"]");
        if (allMarkScript.length === 0) {
            checkForMark = "";
        }
        var htmlCode = "<div id=\"cookieBox consent-popup\">" +
            "<p>Questo sito utilizza i cookies per offrirti la migliore esperienza di navigazione. <a href='' class='more-info' style='color: var(--color3);' target='_blank'>Maggiori Informazioni</a>." +
            "<a id='accept' onClick=\"cookiesPolicy.loadScript()\" style='cursor: pointer;'> Accetto</a>" +
            "</p>" +

            "</div>";
        return htmlCode;
    },
    loadCSS: function() {
        var style = "#cookiePopup {" +
            "position: fixed; " +
            "z-index: " + cookiesPolicy.popupZIndex + ";" +
            "left: 80px; " +
            "bottom: 0; " +
            "height: 7vh; " +
            "width: 100%; " +
            "color: #ddd;" +
            "background-color: var(--secondaryColor);" +
            "padding: 2rem 8rem;" +
            "border-top: 1px solid var(--primaryColor);" +
            "} " +
            "#accept{" +
            "background-color: transparent;" +
            "color: var(--primaryColor) !important;" +
            "}" +
            ".more-info:hover{" +
            "text-decoration: none !important;" +
            "}" +

            "#accept:hover{" +
            "color: white;+"
        "}" +
        ".more-info:hover{" +
        "color: white;" +
        "}" +

        "@media screen and (max-width:768px) { " +
        "#cookiePopup {" +
        "padding-top: 6vh; " +
        "} " +
        "#cookiePopup #cookieBox #checkboxContainer div.singleCheckBox{" +
        "display: block; " +
        "padding: 5px 0; " +
        "} " +
        "} ";
        return style;
    },
    loadScript: function() {
        var d = new Date();
        d.setTime(d.getTime() + (cookiesPolicy.cookieExpiresDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var popupIsVisible = (cookiesPolicy.popup.style.display === "block" || cookiesPolicy.popup.style.display === "");
        if (popupIsVisible) {
            document.cookie = cookiesPolicy.cookieGeneral + "=1;" + expires + ";path=/";
        }
        if (document.querySelector("input[name=\"preferences\"]") != null) {
            if (document.querySelector("input[name=\"preferences\"]").checked) {
                var allPrefScript = document.querySelectorAll("script[data-starcookie=\"preferences\"]");
                for (var i = 0; i < allPrefScript.length; i++) {
                    allPrefScript[i].setAttribute("type", "text/javascript");
                    try {
                        eval(allPrefScript[i].text);
                    } catch (err) {
                        //doNothing
                    }
                }
                if (popupIsVisible) {
                    cookiesPolicy.prefCheckValue = "checked";
                    document.cookie = cookiesPolicy.cookieCheckPref + "=" + cookiesPolicy.prefCheckValue + ";" + expires + ";path=/";
                }
            } else if (popupIsVisible) {
                cookiesPolicy.prefCheckValue = "";
                document.cookie = cookiesPolicy.cookieCheckPref + "=" + cookiesPolicy.prefCheckValue + ";" + expires + ";path=/";
            }
        }
        if (document.querySelector("input[name=\"statistics\"]") != null) {
            if (document.querySelector("input[name=\"statistics\"]").checked) {
                var allStatScript = document.querySelectorAll("script[data-starcookie=\"statistics\"]");
                for (var i = 0; i < allStatScript.length; i++) {
                    allStatScript[i].setAttribute("type", "text/javascript");
                    try {
                        var newCode = document.createElement("script");
                        newCode.text = allStatScript[i].text;
                        document.body.appendChild(newCode);
                        eval(allStatScript[i].text);
                    } catch (err) {
                        console.log(err);
                        //doNothing
                    }
                }
                if (popupIsVisible) {
                    cookiesPolicy.statCheckValue = "checked";
                    document.cookie = cookiesPolicy.cookieCheckStat + "=" + cookiesPolicy.statCheckValue + ";" + expires + ";path=/";
                }
            } else if (popupIsVisible) {
                cookiesPolicy.statCheckValue = "";
                document.cookie = cookiesPolicy.cookieCheckStat + "=" + cookiesPolicy.statCheckValue + ";" + expires + ";path=/";
            }
        }
        if (document.querySelector("input[name=\"marketing\"]") != null) {
            if (document.querySelector("input[name=\"marketing\"]").checked) {
                var allMarkScript = document.querySelectorAll("script[data-starcookie=\"marketing\"]");
                for (var i = 0; i < allMarkScript.length; i++) {
                    allMarkScript[i].setAttribute("type", "text/javascript");
                    try {
                        eval(allMarkScript[i].text);
                    } catch (err) {
                        //doNothing
                    }
                }
                if (popupIsVisible) {
                    cookiesPolicy.markCheckValue = "checked";
                    document.cookie = cookiesPolicy.cookieCheckMark + "=" + cookiesPolicy.markCheckValue + ";" + expires + ";path=/";
                }
            } else if (popupIsVisible) {
                cookiesPolicy.markCheckValue = "";
                document.cookie = cookiesPolicy.cookieCheckMark + "=" + cookiesPolicy.markCheckValue + ";" + expires + ";path=/";
            }
        }
        if (popupIsVisible) {
            cookiesPolicy.popup.style.display = "none";
        }
    },
    showPopup: function() {
        cookiesPolicy.popup.style.display = "block";
    }
};
cookiesPolicy.start();