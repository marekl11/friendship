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
    if (progress < orderNumber) {
        messageElement.innerHTML = "We are\n not so far\n into our\n friendship";
        messageElement.style.color = "#333"; // Black text for locked state
    } else {
        document.body.classList.add("unlocked");
        messageElement.style.color = "white"; // White text for unlocked state
        document.getElementById("content").style.display = "block";
        if (progress < orderNumber + 1) {
            setCookie("progress", orderNumber + 1, 365);
        }
    }
}
