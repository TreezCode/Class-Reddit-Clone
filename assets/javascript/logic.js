$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAth4J3q0fA2kZoJ0mrsWZsORGv1szSSDM",
        authDomain: "class-reddit.firebaseapp.com",
        databaseURL: "https://class-reddit.firebaseio.com",
        projectId: "class-reddit",
        storageBucket: "class-reddit.appspot.com",
        messagingSenderId: "240036141571"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    database.ref('/items').once('value').then(function (snapshot) {
        var results = snapshot.val();
        for (var id in results) {
            buildItemElement(results[id]);
        }
    })


    function buildItemElement(item) {
        var $template = $('#content-template').clone();
        var newItem = $template.prop('content');

        $(newItem).find('.content-title').text(item.title);
        $(newItem).find('.votes').text(item.votes);
        $(newItem).find('.content-link').attr('href', item.link).attr('target', '_blank');
        $(newItem).find('.content-meta').text(item.user + ' posted at ' + moment(item.createdAt).fromNow());

        $('#list').append(newItem);

    };
});