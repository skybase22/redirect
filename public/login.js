window.onload = function () {
    getURL();
}
function getURL() {
    const params = new URLSearchParams(document.location.search);
    const queryFormURL = params.get("redirect");
    if (queryFormURL != null) {
        redirectURL(queryFormURL);
    }
}

function redirectURL(queryURL) {
    var connectURL = "myUrl/" + queryURL
    var firebaseRef = firebase.database().ref(connectURL);
    firebaseRef.once('value').then(function (dataSnapshot) {
        window.location.replace(dataSnapshot.val().fullURL);
    });
}

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "noppadol" && password == "sangngam") {
        document.getElementById("form_id").action = "home.html";
        return false;
    }
    else {
        attempt--;// Decrementing by one.
        alert("You have left " + attempt + " attempt;");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}

$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});