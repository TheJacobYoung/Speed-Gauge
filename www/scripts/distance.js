
(function () {
    document.getElementById('submit').addEventListener('click', getDistance);

    function getDistance() {
        var hours = $('#hours-input').val();
        if (hours.length == 0)
            hours = 0
        var minutes = $('#minutes-input').val();
        if (minutes.length == 0)
            minutes = 0
        var seconds = $('#seconds-input').val();
        if (seconds.length == 0)
            seconds = 0

        var minutes_pace = $('#minutes-pace-input').val();
        if (minutes_pace.length == 0)
            minutes_pace = 0
        var seconds_pace = $('#seconds-pace-input').val();
        if (seconds_pace.length == 0)
            seconds_pace = 0

        if (hours < 0 || minutes < 0 || seconds < 0 || minutes_pace < 0 || seconds_pace < 0) {
            $('#distance').hide();
            $('#error').text("All inputs must be positive");
            $('#error').show();
        }
        else if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(minutes_pace) || isNaN(seconds_pace)) {
            $('#distance').hide();
            $('#error').text("All inputs must be numeric");
            $('#error').show();
        }
        else {
            $('#error').hide();
            var total_seconds = seconds + minutes * 60 + hours * 3600;
            var total_seconds_pace = seconds_pace + minutes_pace * 60;
            var distance = total_seconds / total_seconds_pace;
            var unit = $('input[name="unit"]:checked').val();
            if (unit == "miles") {
                $('#miles').text('Miles: ' + distance);
                $('#km').text('KM: ' + distance * 1.60934);
            }
            else if (unit == "km") {
                $('#km').text('KM: ' + distance);
                $('#miles').text('Miles: ' + distance * 0.621371);
            }
            $('#distance').show();
        }
    }
})();

