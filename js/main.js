conversion_save_text = '';
working_conversion_text = '';
last_working_convert = '';

function convert_numbers(convert_value, base_from, base_to, convert_length, current_index) {

    var current_index_use = convert_value[convert_length - current_index - 1]
    var multiply_base = base_from + "^" + current_index
    if (current_index == 0) {
        $('#binary_simulation').append("= " + current_index_use + " x " + multiply_base)
        conversion_save_text = current_index_use + " x " + multiply_base
    } else {
        $('#binary_simulation').append(" + " + current_index_use + " x " + multiply_base)
        conversion_save_text = conversion_save_text + " + " + current_index_use + " x " + multiply_base
    }

    if (current_index != (convert_length - 1)) {
        setTimeout(function () {
            convert_numbers(convert_value, base_from, base_to, convert_length, ++current_index)
        }, 400)
    } else {
        $('#binary_simulation').append("<br>")
        conversion_save_text = conversion_save_text.split(" + ")
        setTimeout(function () {
            continue_conversion(conversion_save_text.length, 0)
        }, 400)
    }

}

function continue_conversion(working_length, current_index) {

    var current_working = conversion_save_text[current_index]
    current_working = current_working.split(' x ')
    var new_work = current_working[1].split('^')
    var new_work = Math.pow(Number(new_work[0]), Number(new_work[1]))
    if (current_index == 0) {
        $('#binary_simulation').append("= " + current_working[0] + ' x ' + new_work)
        working_conversion_text = current_working[0] + ' x ' + new_work
    } else {
        $('#binary_simulation').append(' + ' + current_working[0] + ' x ' + new_work)
        working_conversion_text = working_conversion_text + ' + ' + current_working[0] + ' x ' + new_work
    }

    if (current_index != (working_length - 1)) {
        setTimeout(function () {
            continue_conversion(conversion_save_text.length, ++current_index)
        }, 400)
    } else {
        $('#binary_simulation').append("<br>")
        working_conversion_text = working_conversion_text.split(" + ")
        setTimeout(function () {
            conversion_last_step(working_conversion_text.length, 0)
        }, 400)
    }

}

function conversion_last_step(working_length, current_index) {
    var current_working = working_conversion_text[current_index]
    current_working = current_working.split(' x ')
    var worked = Number(current_working[0]) * Number(current_working[1])
    if (current_index == 0) {
        $('#binary_simulation').append("= " + worked)
        last_working_convert = worked
    } else {
        $('#binary_simulation').append(' + ' + worked)
        last_working_convert = last_working_convert + ' + ' + worked
    }

    if (current_index != (working_length - 1)) {
        setTimeout(function () {
            conversion_last_step(working_conversion_text.length, ++current_index)
        }, 400)
    } else {
        $('#binary_simulation').append("<br>")
        setTimeout(last_convert_step, 300)
    }
}

function last_convert_step() {
    var last_work = last_working_convert.split(' + ')
    var total_add = 0;
    for (var add_work = 0; add_work < last_work.length; add_work++) {
        total_add = total_add + Number(last_work[add_work])
    }
    $('#binary_simulation').append("= " + total_add)
}


$('document').ready(function () {

    $('#convert_binary_to_denary').on('click', function () {

        $('#binary_simulation').html('')
        $('#convert_binary_to_denary').attr('disabled', true)
        $('#binary_to_denary').attr('disabled', true)

        var binary_value = $('#binary_to_denary').val()
        var base_from = 2
        var base_to = 10
        var convert_length = binary_value.length

        setTimeout(function () {
            convert_numbers(binary_value, base_from, base_to, convert_length, 0)
        }, 400)

        return false

    })

    $('#Reset').on('click', function () {
        console.log('aaaa')
        $('#convert_binary_to_denary').removeAttr('disabled')
        $('#binary_to_denary').removeAttr('disabled')
    })

})