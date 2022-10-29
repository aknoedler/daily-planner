var currentTime = moment();
var containerEl = $(".container");
var storedTasks = JSON.parse(localStorage.getItem('storedTasks'));

function init() {
    $('#currentDay').text(currentTime.format("dddd, MMMM Do"));

    if (storedTasks == null) {
        storedTasks = [];
        for (i = 0; i < 9; i++) {
            storedTasks.push('');
        }
    }

    for (i = 9; i <= 17; i++) {
        var row = $('<div class = "row time-block"></div');

        var hourIndex = i;

        if (hourIndex < currentTime.format('H')) {
            row.addClass('past');
        } else if (hourIndex == currentTime.format('H')) {
            row.addClass('present');
        } else {
            row.addClass('future');
        }

        var period = "am";
        if (hourIndex >= 12) {
            period = "pm";
        }
        if (hourIndex >= 13) {
            hourIndex -= 12;
        }

        var hour = $('<div class = "hour col-md-1"></div>');
        hour.text(hourIndex + period);

        row.append(hour);

        var textArea = $('<textarea class="description col-md-10"></textarea');
        textArea.text(storedTasks[i - 9]);
        row.append(textArea);

        var btn = $('<button class="saveBtn col-md-1"></button>');
        btn.append($('<i class ="fas fa-save"></i>'));
        row.append(btn);

        containerEl.append(row);
    }

}

init();

$('.saveBtn').on('click', function () {
    var task = $(this).siblings('.description').val();
    var index = $(this).parent().index();
    storedTasks[index] = task
    localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
    })
