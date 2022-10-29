var currentTime = moment();
var containerEl = $(".container");

function init() {
    $('#currentDay').text(currentTime.format("dddd, MMMM Do"));

    for (i = 9; i <= 17; i++) {
        var row = $('<div>');
        row.addClass('row time-block');
        
        var hourIndex = i;

        if (hourIndex < currentTime.format('H')){
            row.addClass('past');
        } else if (hourIndex == currentTime.format('H')){
            row.addClass('present');
        } else {
            row.addClass('future');
        }

        var period = "am";
        if (hourIndex>=12){
            period = "pm";
        }
        if (hourIndex>=13){
            hourIndex -= 12;
        }

        var hour = $('<div class = "hour col-md-1"></div>');
        hour.text(hourIndex + period);

        row.append(hour);

        var textArea = $('<textarea class="description col-md-10"></textarea');
        row.append(textArea);

        var btn = $('<button class="saveBtn col-md-1"></button>');
        btn.append($('<i class ="fas fa-save"></i>'));
        row.append(btn);
        
        containerEl.append(row);
    }
}

init();