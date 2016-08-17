(function () { // executes automatically when file loads

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        document.getElementById('submit').addEventListener('click', getPace);

        //hide footer when input box is on focus
        $(document).on('focus', 'input, textarea', function () {
            $("footer[data-role=footer]").hide();
        });

        //show footer when input is NOT on focus
        $(document).on('blur', 'input, textarea', function () {
            $("footer[data-role=footer]").show();
        });
    };

    function getPace() {
        var distance = $('#distance-input').val();
        if (distance.length == 0) {
            $('#pace').hide();
            $('#error-msg').text("Distance must be entered");
            $('#error-msg').show();
        }
        else if (!parseFloat(distance)) {
            $('#pace').hide();
            $('#error-msg').text("Distance must be an integer greater than 0");
            $('#error-msg').show();
        }
        else if (distance <= 0) {
            $('#pace').hide();
            $('#error-msg').text("Distance must be greater than 0");
            $('#error-msg').show();
        }
        else {
            var hours = $('#hours-input').val();
            if (hours.length == 0)
                hours = 0
            var minutes = $('#minutes-input').val();
            if (minutes.length == 0)
                minutes = 0
            var seconds = $('#seconds-input').val();
            if (seconds.length == 0)
                seconds = 0

            if (hours < 0 || minutes < 0 || seconds < 0) {
                $('#pace').hide();
                $('#error-msg').text("All inputs must be positive");
                $('#error-msg').show();
            }
            else if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
                $('#pace').hide();
                $('#error-msg').text("All inputs must be numeric");
                $('#error-msg').show();
            }
            else {
                $('#error-msg').hide();
                function calculate_pace(total_seconds) {
                    var sec_per_unit = total_seconds / distance;
                    var pace_minutes = sec_per_unit / 60;
                    var pace_seconds = pace_minutes % 1; // the decimal of pace_minutes
                    pace_seconds = Math.round(60 * pace_seconds);
                    pace_minutes = Math.floor(pace_minutes);
                    pace_seconds = (pace_seconds < 10) ? ("0" + pace_seconds) : pace_seconds;
                    return pace_minutes + ":" + pace_seconds;
                }

                var unit = $('input[name="unit"]:checked').val();
                var mile_pace = "";
                var km_pace = "";
                var mph = "";
                if (unit == "miles") {
                    mile_pace = calculate_pace(hours * 3600 + minutes * 60 + parseInt(seconds));
                    km_pace = calculate_pace((hours * 3600 + minutes * 60 + parseInt(seconds)) * 0.621371); // ratio of km to mile
                    mph = (3600 * distance / (hours * 3600 + minutes * 60 + parseInt(seconds))).toFixed(2);
                }
                else if (unit == "km") {
                    mile_pace = calculate_pace((hours * 3600 + minutes * 60 + parseInt(seconds)) * 1.60934); // ratio of mile to km
                    km_pace = calculate_pace(hours * 3600 + minutes * 60 + parseInt(seconds));
                    mph = (3600 * distance / (hours * 3600 + minutes * 60 + parseInt(seconds)) * 0.621371).toFixed(2);
                }
                $('#pace').show();
                $('#mile-pace').text(mile_pace);
                $('#km-pace').text(km_pace);
                $('#mph').text(mph);
            }
        }
    }
})();


  
