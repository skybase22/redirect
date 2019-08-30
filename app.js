function generateURL() {
    var redirectURL = document.getElementById('redirectURL');
    insertURL(redirectURL.value);
}
window.onload = function () {
    getURL();
    showURL();
    saveSearch()
}

function insertURL(fullURL) {
    if (fullURL != "") {
        var firebaseRef = firebase.database().ref("myUrl");
        firebaseRef.push({
            fullURL: fullURL
        });
        alert("insert success");
    } else {
        alert("insert failed");
    }
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

function showURL() {
    console.log("search")
    var storedValue = localStorage.getItem("searchURL");
    var storedValues = storedValue
    console.log("this is st", storedValues)
    if(storedValues != null){
        var database = firebase.database().ref("myUrl");
        database.once('value', function (snapshot) {
            if (snapshot.exists()) {
                var content =  '';
                snapshot.forEach(function (data) {
                    var fullURL = data.val().fullURL;
                    if(fullURL.includes(storedValues))
                    {
                        var keyURL = data.key;
                        content += '<tr>';
                        content += '<td>' + "https://ppsu-52213.firebaseapp.com?redirect=" + keyURL + '</td>'; //column1
                        content += '<td> <a href=' + fullURL + '>' + fullURL + '</a></td>'; //column1
                        content += '</tr>';
                    }
                    
                });
                //content = content + '</tbody>'
                $('#myTable').append(content);
            }
        });
    }
    else {
        console.log("search2")
        var database = firebase.database().ref("myUrl");
        database.once('value', function (snapshot) {
            if (snapshot.exists()) {
                var content = '';
                snapshot.forEach(function (data) {
                    var fullURL = data.val().fullURL;
                        var keyURL = data.key;
                        content += '<tr>';
                        content += '<td>' + "https://ppsu-52213.firebaseapp.com?redirect=" + keyURL + '</td>'; //column1
                        content += '<td> <a href=' + fullURL + '>' + fullURL + '</a></td>'; //column1
                        content += '</tr>';
                });git init
                 $('#myTable').append(content);
            }
        });
    }
    
}

function saveSearch() {
    var inputURL= document.getElementById("searchURL");
    localStorage.setItem("searchURL", inputURL.value);
}