var currentTime = moment();
var containerEl = $(".container");
var storedTasks = JSON.parse(localStorage.getItem('storedTasks'));

function init() {
    // Sets the current day header to display the current day
    $('#currentDay').text(currentTime.format("dddd, MMMM Do"));

    // The storedTasks array is pulled from local storage on page load; if it is empty,
    // this conditional initializes it as an array of empty strings
    if (storedTasks == null) {
        storedTasks = [];
        for (i = 0; i < 9; i++) {
            storedTasks.push('');
        }
    }

    // Creates the hourly blocks, iterating from 9 to 17
    for (i = 9; i <= 17; i++) {
        var row = $('<div class = "row time-block"></div');

        var hourIndex = i;

        // Formats the blocks by comparing to current time
        if (hourIndex < currentTime.format('H')) {
            row.addClass('past');
        } else if (hourIndex == currentTime.format('H')) {
            row.addClass('present');
        } else {
            row.addClass('future');
        }

        // Sets the text to am or pm
        var period = "am";
        if (hourIndex >= 12) {
            period = "pm";
        }

        // Convert the text to 12 hour time
        if (hourIndex >= 13) {
            hourIndex -= 12;
        }

        // Create the hour, textarea, and button elements and appends them to the row element
        var hour = $('<div class = "hour col-md-1"></div>');
        hour.text(hourIndex + period);

        row.append(hour);

        var textArea = $('<textarea class="description col-md-10"></textarea');
        // Populates with saved tasks if they were loaded
        textArea.text(storedTasks[i - 9]);
        row.append(textArea);

        var btn = $('<button class="saveBtn col-md-1"></button>');
        btn.append($('<i class ="fas fa-save"></i>'));
        row.append(btn);

        // Append the row to the main container
        containerEl.append(row);
    }

}

init();

// Save the text in the textarea elements to local storage
$('.saveBtn').on('click', function () {
    var task = $(this).siblings('.description').val();
    var index = $(this).parent().index();
    storedTasks[index] = task
    localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
    })
