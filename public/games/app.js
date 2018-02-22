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

const gamesRef = db.ref('games').orderByChild('updated');

const gameList = document.getElementById('games');

gamesRef.once('value', function (games) {
	games.forEach(function (game) {
		var gameKey = game.key;
		var gameName = game.val().name;
		var gameUpdated = game.val().updated;
		var gameDesc = game.val().description;
		
		console.log('key: ' + gameKey);
		console.log('name: ' + gameName);
		console.log('updated: ' + gameUpdated);

		var gameLi = document.createElement('li');

		var gameLiA = document.createElement('a');

		var gameLiAHref = document.createAttribute('href');
		gameLiAHref.value = ("/games/game.html?gameID=" + game.key);
		gameLiA.setAttributeNode(gameLiAHref);
		
		var gameLiAText = document.createTextNode(gameName);
		gameLiA.appendChild(gameLiAText)

		gameLi.appendChild(gameLiA);
		gameList.appendChild(gameLi);

		game.ref.child('platforms').once('value', function (platforms) {
			console.log('platforms: [');
			platforms.forEach(function (platform) {
				console.log('name: ' + platform.val().name);
				console.log('updated: ' + platform.val().updated);
				platform.ref.child('versions').once('value', function (versions) {
					console.log('versions: [');
					versions.forEach(function (version) {
						console.log('download: ' + version.val().download);
						console.log('version: ' + version.val().version);
						console.log('released: ' + version.val().released);
					});
					console.log(']');
				});
			});
			console.log(']');
		}).catch (function (error) {
			console.log("Error getting platforms: " + error);
		});
	});
}).catch(function (error) {
	console.log("Error getting games: " + error);
});