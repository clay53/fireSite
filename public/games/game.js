// Initialize Firebase

/*globals firebase */
var config = {
	apiKey: "AIzaSyDRPXy5D2edzLBojnWxFQrHAf5_nRzn_BE",
	authDomain: "firesite-9b2ae.firebaseapp.com",
	databaseURL: "https://firesite-9b2ae.firebaseio.com",
	projectId: "firesite-9b2ae",
	storageBucket: "firesite-9b2ae.appspot.com",
	messagingSenderId: "480944655925"
};
firebase.initializeApp(config);

const db = firebase.database();

// Functions

function timeConverter(UNIX_timestamp){
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = (date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec);
	return time;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const gameID = getParameterByName('gameID')
const gameRef = db.ref('games/' + gameID);

console.log('gameID: ' + gameID);

const gameTitle = document.getElementById('title');
const gameDescription = document.getElementById('desc');
const gameDownloads = document.getElementById('downloads');

gameRef.once('value', function (game) {
    var gameKey = game.key;
    var gameName = game.val().name;
    var gameUpdated = game.val().updated;
    var gameDesc = game.val().description;
    
    console.log('key: ' + gameKey);
    console.log('name: ' + gameName);
    console.log('updated: ' + gameUpdated);

    title.appendChild(document.createTextNode(gameName));
    gameDescription.appendChild(document.createTextNode(gameDesc));

    game.ref.child('platforms').once('value', function (platforms) {
        console.log('platforms: [');
        platforms.forEach(function (platform) {
            var platformKey = platform.key;
            var platformName = platform.val().name;
            var platformUpdated = platform.val().updated;

            console.log('key: ' + platformKey);
            console.log('name: ' + platformName);
            console.log('updated: ' + platformUpdated);

            var platformLi = document.createElement('li');
            
            var platformLiH3 = document.createElement('h3');
            var platformLiH3Text = document.createTextNode(platformName);

            platformLiH3.appendChild(platformLiH3Text);
            platformLi.appendChild(platformLiH3);

            platform.ref.child('versions').once('value', function (versions) {
                var platformVersions = document.createElement('ul');
                console.log('versions: [');
                versions.forEach(function (version) {
                    var versionKey = version.key;
                    var versionDownload = version.val().download;
                    var versionVersion = version.val().version;
                    var versionReleased = version.val().released;

                    console.log('key: ' + versionKey);
                    console.log('download: ' + versionDownload);
                    console.log('version: ' + versionVersion);
                    console.log('released: ' + versionReleased);

                    var versionLi = document.createElement('li');

                    var versionLiA = document.createElement('a');
                    var versionLiAHref = document.createAttribute('href');
                    versionLiAHref.value = versionDownload;
                    versionLiA.setAttributeNode(versionLiAHref);

                    var versionLiAText = document.createTextNode(versionVersion + " Released: " + timeConverter(versionReleased));
                    versionLiA.appendChild(versionLiAText);

                    versionLi.appendChild(versionLiA);
                    platformVersions.appendChild(versionLiA);
                });
                platformLi.appendChild(platformVersions);
                console.log(']');
            });
            gameDownloads.appendChild(platformLi);
        });
        console.log(']');
    }).catch (function (error) {
        console.log("Error getting platforms: " + error);
    });
}).catch(function (error) {
	console.log("Error getting game: " + error);
});