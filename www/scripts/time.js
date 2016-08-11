
(function () {
    document.getElementById('submit').addEventListener('click', getTime);

    function getTime() {
        var distance = $('#distance-input').val();
        if (distance.length == 0) {
            $('#time').hide();
            $('#error').text("Distance must be entered");
            $('#error').show();
        }
        else if (!parseFloat(distance)) {
            $('#time').hide();
            $('#error').text("Distance must be an integer greater than 0");
            $('#error').show();
        }
        else if (distance <= 0) {
            $('#time').hide();
            $('#error').text("Distance must be greater than 0");
            $('#error').show();
        }
        else {
            var minutes = $('#minutes-input').val();
            if (minutes.length == 0)
                minutes = 0
            var seconds = $('#seconds-input').val();
            if (seconds.length == 0)
                seconds = 0

            if (minutes < 0 || seconds < 0) {
                $('#time').hide();
                $('#error').text("All inputs must be positive");
                $('#error').show();
            }
            else if (isNaN(minutes) || isNaN(seconds)) {
                $('#time').hide();
                $('#error').text("All inputs must be numeric");
                $('#error').show();
            }
            else {
                $('#error').hide();
                var total_seconds = (parseInt(seconds) + minutes * 60) * distance;
                var h = Math.floor(total_seconds / 3600);
                var m = Math.floor(total_seconds % 3600 / 60);
                var s = Math.floor(total_seconds % 3600 % 60);
                var total_time = ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
                $('#time').text('Total Time: '+total_time);
                $('#time').show();
            }
        }
    }
})();

