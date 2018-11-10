$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyADyMhaUY538kcH3xC4f2hbjAHaSaVrkdg",
        authDomain: "train-scheduler-12e82.firebaseapp.com",
        databaseURL: "https://train-scheduler-12e82.firebaseio.com",
        projectId: "train-scheduler-12e82",
        storageBucket: "train-scheduler-12e82.appspot.com",
        messagingSenderId: "1037375049477"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-time-btn").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#trainNameInput").val().trim();
        var trainDestination = $("#destinationInput").val().trim();
        var firstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("HH:mm");
        var trainFrequency = $("#frequencyInput").val().trim();

        var newTrain = {
            name: trainName,
            destination: trainDestination,
            firstTrainTime: firstTrainTime,
            frequency: trainFrequency
        };

        database.ref().push(newTrain);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().firstTrainTime;
        var trainFrequency = childSnapshot.val().frequency;

        var tFrequency = trainFrequency;
        var firstTime = firstTrainTime;
        var firstTimeConverted = moment(firstTime, "HH:mm");
        var diffTime = moment().diff(firstTimeConverted, "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(moment(nextTrain).format("hh:mm A")),
            $("<td>").text(tMinutesTillTrain)
        );
        $("#train-table > tbody").append(newRow);
    });

});




