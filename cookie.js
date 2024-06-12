function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getProgress() {
    var progress = getCookie("progress");
    if (progress === null) {
        return 0;
    }
    return parseInt(progress, 10);
}

function checkAccess(orderNumber) {
    var progress = getProgress();
    var messageElement = document.getElementById("message");
    var themeMetaTag = document.querySelector('meta[name="theme-color"]');
    if (progress < orderNumber) {
        messageElement.innerHTML = "We are<br> not so far<br> into our<br> friendship";
        messageElement.style.color = "#333"; // Black text for locked state
        if (themeMetaTag) {
            themeMetaTag.setAttribute("content", "#ffffff"); // White theme color for locked state
        } else {
            var newMetaTag = document.createElement('meta');
            newMetaTag.name = "theme-color";
            newMetaTag.content = "#ffffff";
            document.head.appendChild(newMetaTag);
        }
    } else {
        document.body.classList.add("unlocked");
        messageElement.style.color = "white"; // White text for unlocked state
        document.getElementById("content").style.display = "block";
        if (themeMetaTag) {
            themeMetaTag.setAttribute("content", "#000000"); // Black theme color for unlocked state
        } else {
            var newMetaTag = document.createElement('meta');
            newMetaTag.name = "theme-color";
            newMetaTag.content = "#000000";
            document.head.appendChild(newMetaTag);
        }
        if (progress < orderNumber + 1) {
            setCookie("progress", orderNumber + 1, 365);
        }
    }
}
