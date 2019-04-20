
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
    var DAY_IN_MS = 86400000;

    firebase.initializeApp(config);
    var database = firebase.database();

    // Once a value is changed in "items" then have firebase take snapshot of the data
    database.ref("items")
    .orderByChild("createdAt")
    .startAt(Date.now() - DAY_IN_MS)
    .on("child_added", function(snapshot) {
        if ($("#loadingMsg").is(":visible")) {
            $("#loadingMsg").hide();
        }
        var result = snapshot.val();
        result.id = snapshot.key;
        buildItemElement(result);
    });

    database.ref("items")
    .on("child_changed", function(snapshot) {
        var result = snapshot.val();
        result.id = snapshot.key;
        $("div.votes#" + result.id).text(result.votes)
    });

    function upVote() {
        var itemID = $(this).attr('id');
        firebase.database().ref('/items/' + itemID + '/votes')
        .transaction(function(currentVotes) {
            return currentVotes +1;
        });
    }
    function downVote() {
        var itemID = $(this).attr('id');
        firebase.database().ref('/items/' + itemID + '/votes')
        .transaction(function(currentVotes) {
            return currentVotes -1;
        });
    }
    // Function to create and clone a post using HTML references
    function buildItemElement(item) {
        var $template = $('#content-template').clone();
        var newItem = $template.prop('content');

        $(newItem).find('.content-title').text(item.title);
        $(newItem).find('.arrow').attr('id', item.id);
        $(newItem).find('.vote-up').on('click', upVote);
        $(newItem).find('.vote-down').on('click', downVote);
        $(newItem).find('.votes').text(item.votes).attr('id', item.id);
        $(newItem).find('.content-link').attr('href', item.link).attr('target', '_blank');
        $(newItem).find('.content-meta').text(item.user + ' posted ' + moment(item.createdAt).fromNow());

        // Prepend newly created post to "#list"
        $('#list').prepend(newItem);

    };


    // Click function to send input data from modal to firebase and display HTML
    $("#sharePost").on("click", function () {
        var link = $("#inputURL").val();
        var title = $("#inputTitle").val();
        var user = $("#inputUser").val();
        var createdAt = Date.now();
        var votes = 0;

        // Create a data object of variables
        var data = {
            link: link,
            title: title,
            user: user,
            createdAt: createdAt,
            votes: votes
        }
        // 
        var itemsListRef = database.ref("items");
        var newItemRef = itemsListRef.push(data, function (err) {
            if (err) {
                console.error("Error saving to firebase.", err)
            } else {
                console.log("Success saving to firebase!");
                $("#inputURL").val("");
                $("#inputTitle").val("");
                $("#inputUser").val();
                $("#addPost").modal("hide");
            }
        });
    });
});