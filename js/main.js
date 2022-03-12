conversion_save_text = '';
working_conversion_text = '';
last_working_convert = '';
remainder_binary_add = 0;
allmultiply_work = ''
binary_pass_out = ''

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

function add_numbers(first, second, first_length, second_length, current_index) {

    if (first_length > current_index) {

        if (second_length > current_index) {
            var current_sum = Number(first[first_length - current_index - 1]) + Number(second[second_length - current_index - 1])
            if (current_sum > 1) {

                if (++remainder_binary_add > 1) {
                    $('#binary_simulation').append('1 ')
                    remainder_binary_add--
                } else {
                    $('#binary_simulation').append('0 ')
                }

            } else {
                if (remainder_binary_add > 1) {
                    $('#binary_simulation').append('1 ')
                    remainder_binary_add--
                } else {
                    $('#binary_simulation').append(current_sum + ' ')
                }
            }
        } else {

        }
        setTimeout(function () {
            add_numbers(first, second, first_length, second_length, ++current_index)
        }, 400)
    } else {

    }

}

function halfAdder(a, b) {
    const sum = xor(a, b);
    const carry = and(a, b);
    return [sum, carry];
}

function fullAdder(a, b, carry) {
    halfAdd = halfAdder(a, b);
    const sum = xor(carry, halfAdd[0]);
    carry = and(carry, halfAdd[0]);
    carry = or(carry, halfAdd[1]);
    return [sum, carry];
}

function xor(a, b) {
    return (a === b ? 0 : 1);
}

function and(a, b) {
    return a == 1 && b == 1 ? 1 : 0;
}

function or(a, b) {
    return (a || b);
}

function addBinary(a, b) {

    let sum = '';
    let carry = '';

    for (var i = a.length - 1; i >= 0; i--) {
        if (i == a.length - 1) {
            //half add the first pair
            const halfAdd1 = halfAdder(a[i], b[i]);
            sum = halfAdd1[0] + sum;
            carry = halfAdd1[1];
        } else {
            //full add the rest
            const fullAdd = fullAdder(a[i], b[i], carry);
            sum = fullAdd[0] + sum;
            carry = fullAdd[1];
        }
    }

    return carry ? carry + sum : sum;
}

function multiply_sequence(first, second, first_length, second_length, current_index) {
    if (current_index < second_length) {
        var multiplier = second[second_length - current_index - 1]
        var mutlipli = Number(multiplier * first)
        mutlipli = ("" + mutlipli).split('')
        mutlipli = mutlipli.join(" ")
        if (multiplier == 0) {
            mutlipli = '';
            for (var li = 0; li < first_length; li++) {
                mutlipli = mutlipli + ' ' + '0'
            }
        }
        for (var i = 0; i < current_index; i++) {
            mutlipli = mutlipli + ' ' + '0'
        }
        $('#binary_simulation').append(mutlipli)
        $('#binary_simulation').append('<br> ')

        if (current_index == 0) {
            allmultiply_work = allmultiply_work + '' + mutlipli.split(" ").join("")
        } else {
            allmultiply_work = allmultiply_work + '+' + mutlipli.split(" ").join("")
        }

        setTimeout(function () {
            multiply_sequence(first, second, first_length, second_length, ++current_index)
        }, 3000)
    } else {
        for (var fl = 0; fl < second_length; fl++) {
            $('#binary_simulation').append('--')
            $('#binary_simulation').append('--')
        }
        $('#binary_simulation').append('<br> ')
        setTimeout(multiply_add_end, 2000)
    }
}

function multiply_add_end() {
    allmultiply_work = allmultiply_work.split('+')
    current_total = 0;

    for (var cl = 0; cl < allmultiply_work.length; cl++) {
        current_yes = allmultiply_work[cl]
        binar1 = parseInt(current_yes, 2)
        current_total = Number(current_total) + Number(binar1)
    }

    current_total = current_total.toString(2)
    current_total = ("" + current_total).split('')
    current_total = current_total.join(" ")
    $('#binary_simulation').append(current_total)
}

function convert_denary(convert_value, base_from, base_to, convert_length, current_index) {
    var current_check = Number(convert_value / base_to)
    current_check = parseInt(current_check)
    if ((current_check * base_to) == convert_value) {
        passing = 0
    } else {
        passing = convert_value - (current_check * base_to)
    }
    binary_pass_out = passing + '' + binary_pass_out
    $('#binary_simulation').append('<br>')
    $('#binary_simulation').append(base_to + ' &nbsp;&nbsp; | &nbsp;&nbsp; ' + current_check + ' &nbsp;&nbsp;&nbsp;&nbsp; ' + passing)
    if (current_check != 0) {
        setTimeout(function () {
            convert_denary(current_check, base_from, base_to, convert_length, 0)
        }, 400)
    } else {
        $('#binary_simulation').append('<br>')
        $('#binary_simulation').append('<br>')
        $('#binary_simulation').append('<br>')
        $('#binary_simulation').append(' = ' + binary_pass_out)
    }
}


$('document').ready(function () {

    $('#binary_to_denary').on('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-1]/g, '').replace(/(.{4})/g, '$1 ').trim();
    })

    $('#binary1').on('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-1]/g, '').replace(/(.{4})/g, '$1 ').trim();
    })

    $('#binary2').on('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-1]/g, '').replace(/(.{4})/g, '$1 ').trim();
    })

    $('#denary_to_binary').on('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
    })

    $('#octa_to_denary').on('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-7]/g, '').replace(/(.{4})/g, '$1 ').trim();
    })

    $('#octal1').on('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-7]/g, '').replace(/(.{4})/g, '$1 ').trim();
    })

    $('#octal2').on('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-7]/g, '').replace(/(.{4})/g, '$1 ').trim();
    })

    $('#add_binary_numbers').on('click', function () {

        var binary1 = $('#binary1').val()
        var binary2 = $('#binary2').val()
        var binary1_length = binary1.length
        var binary2_length = binary2.length

        if (binary1 == '' || binary1 == NaN || binary1 == ' ' || binary2 == '' || binary2 == NaN || binary2 == ' ') {
            alert('Please Input Binary Numbers')
        } else {

            first = binary1.split('')
            second = binary2.split('')

            $('#binary_simulation').html('&nbsp;&nbsp;&nbsp;&nbsp;')

            for (var fl = 0; fl < binary1_length; fl++) {
                $('#binary_simulation').append(binary1[fl] + ' ')
            }

            $('#binary_simulation').append('<br>+ ')

            for (var sl = 0; sl < binary2_length; sl++) {
                $('#binary_simulation').append(binary2[sl] + ' ')
            }

            $('#binary_simulation').append('<br> ')


            $('#add_binary_numbers').attr('disabled', true)
            $('#binary1').attr('disabled', true)
            $('#binary2').attr('disabled', true)
            setTimeout(function () {
                $('#binary_simulation').append('----')
                if (binary1_length >= binary2_length) {
                    for (var fl = 0; fl < binary1_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    // Added_Binary = addBinary(binary1, binary2)
                } else if (binary1_length < binary2_length) {
                    for (var fl = 0; fl < binary2_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    // Added_Binary = addBinary(binary2, binary1)
                }
                binar1 = parseInt(binary1, 2)
                binar2 = parseInt(binary2, 2)
                Added_Binary = Number(binar1) + Number(binar2)
                Added_Binary = Added_Binary.toString(2)
                Added_Binary = Added_Binary.split('')
                Added_Binary = Added_Binary.join(" ")
                $('#binary_simulation').append(Added_Binary)
            }, 400)

        }

    })

    $('#subtract_binary_numbers').on('click', function () {

        var binary1 = $('#binary1').val()
        var binary2 = $('#binary2').val()
        var binary1_length = binary1.length
        var binary2_length = binary2.length

        if (binary1 == '' || binary1 == NaN || binary1 == ' ' || binary2 == '' || binary2 == NaN || binary2 == ' ') {
            alert('Please Input Binary Numbers')
        } else {

            first = binary1.split('')
            second = binary2.split('')

            $('#binary_simulation').html('&nbsp;&nbsp;&nbsp;&nbsp;')

            for (var fl = 0; fl < binary1_length; fl++) {
                $('#binary_simulation').append(binary1[fl] + ' ')
            }

            $('#binary_simulation').append('<br>+ ')

            for (var sl = 0; sl < binary2_length; sl++) {
                $('#binary_simulation').append(binary2[sl] + ' ')
            }

            $('#binary_simulation').append('<br> ')


            $('#subtract_binary_numbers').attr('disabled', true)
            $('#binary1').attr('disabled', true)
            $('#binary2').attr('disabled', true)
            setTimeout(function () {
                $('#binary_simulation').append('----')
                if (binary1_length >= binary2_length) {
                    for (var fl = 0; fl < binary1_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    // Added_Binary = addBinary(binary1, binary2)
                } else if (binary1_length < binary2_length) {
                    for (var fl = 0; fl < binary2_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    // Added_Binary = addBinary(binary2, binary1)
                }
                binar1 = parseInt(binary1, 2)
                binar2 = parseInt(binary2, 2)
                Added_Binary = Number(binar1) - Number(binar2)
                Added_Binary = Added_Binary.toString(2)
                Added_Binary = Added_Binary.split('')
                Added_Binary = Added_Binary.join(" ")
                $('#binary_simulation').append(Added_Binary)
            }, 400)

        }

    })

    $('#add_octal_numbers').on('click', function () {

        var binary1 = $('#octal1').val()
        var binary2 = $('#octal2').val()
        var binary1_length = binary1.length
        var binary2_length = binary2.length

        if (binary1 == '' || binary1 == NaN || binary1 == ' ' || binary2 == '' || binary2 == NaN || binary2 == ' ') {
            alert('Please Input Octal Numbers')
        } else {

            first = binary1.split('')
            second = binary2.split('')

            $('#binary_simulation').html('&nbsp;&nbsp;&nbsp;&nbsp;')

            for (var fl = 0; fl < binary1_length; fl++) {
                $('#binary_simulation').append(binary1[fl] + ' ')
            }

            $('#binary_simulation').append('<br>+ ')

            for (var sl = 0; sl < binary2_length; sl++) {
                $('#binary_simulation').append(binary2[sl] + ' ')
            }

            $('#binary_simulation').append('<br> ')


            $('#add_octal_numbers').attr('disabled', true)
            $('#octal1').attr('disabled', true)
            $('#octal2').attr('disabled', true)
            setTimeout(function () {
                $('#binary_simulation').append('----')
                if (binary1_length >= binary2_length) {
                    for (var fl = 0; fl < binary1_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    // Added_Binary = addBinary(binary1, binary2)
                } else if (binary1_length < binary2_length) {
                    for (var fl = 0; fl < binary2_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    // Added_Binary = addBinary(binary2, binary1)
                }
                binar1 = parseInt(binary1, 8)
                binar2 = parseInt(binary2, 8)
                Added_Binary = Number(binar1) + Number(binar2)
                Added_Binary = Added_Binary.toString(8)
                Added_Binary = Added_Binary.split('')
                Added_Binary = Added_Binary.join(" ")
                $('#binary_simulation').append(Added_Binary)
            }, 400)

        }

    })

    $('#multiply_binary_numbers').on('click', function () {

        var binary1 = $('#binary1').val()
        var binary2 = $('#binary2').val()
        var binary1_length = binary1.length
        var binary2_length = binary2.length

        if (binary1 == '' || binary1 == NaN || binary1 == ' ' || binary2 == '' || binary2 == NaN || binary2 == ' ') {
            alert('Please Input Binary Numbers')
        } else {

            first = binary1.split('')
            second = binary2.split('')

            $('#binary_simulation').html('&nbsp;&nbsp;&nbsp;&nbsp;')

            for (var fl = 0; fl < binary1_length; fl++) {
                $('#binary_simulation').append(binary1[fl] + ' ')
            }

            $('#binary_simulation').append('<br>x ')

            for (var sl = 0; sl < binary2_length; sl++) {
                $('#binary_simulation').append(binary2[sl] + ' ')
            }

            $('#binary_simulation').append('<br> ')


            $('#multiply_binary_numbers').attr('disabled', true)
            $('#binary1').attr('disabled', true)
            $('#binary2').attr('disabled', true)
            setTimeout(function () {
                $('#binary_simulation').append('----')
                if (binary1_length >= binary2_length) {
                    for (var fl = 0; fl < binary1_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    setTimeout(function () {
                        multiply_sequence(binary1, binary2, binary1_length, binary2_length, 0)
                    }, 3000)

                } else if (binary1_length < binary2_length) {
                    for (var fl = 0; fl < binary2_length; fl++) {
                        $('#binary_simulation').append('--')
                    }
                    $('#binary_simulation').append('<br>')
                    setTimeout(function () {
                        multiply_sequence(binary2, binary1, binary2_length, binary1_length, 0)
                    }, 3000)
                }
            }, 400)

        }

    })

    $('#convert_binary_to_denary').on('click', function () {

        var binary_value = $('#binary_to_denary').val()
        var base_from = 2
        var base_to = 10
        var convert_length = binary_value.length

        if (binary_value == '' || binary_value == NaN || binary_value == ' ') {
            alert('Please Input Binary Numbers')
        } else {

            $('#convert_binary_to_denary').attr('disabled', true)
            $('#binary_to_denary').attr('disabled', true)
            setTimeout(function () {
                convert_numbers(binary_value, base_from, base_to, convert_length, 0)
            }, 400)

        }

        return false

    })

    $('#convert_octa_to_denary').on('click', function () {

        var binary_value = $('#octa_to_denary').val()
        var base_from = 8
        var base_to = 10
        var convert_length = binary_value.length

        if (binary_value == '' || binary_value == NaN || binary_value == ' ') {
            alert('Please Input Octa Numbers')
        } else {

            $('#convert_octa_to_denary').attr('disabled', true)
            $('#octa_to_denary').attr('disabled', true)
            setTimeout(function () {
                convert_numbers(binary_value, base_from, base_to, convert_length, 0)
            }, 400)

        }

        return false

    })

    $('#convert_denary_to_binary').on('click', function () {
        var binary_value = $('#denary_to_binary').val()
        var base_from = 10
        var base_to = 2
        var convert_length = binary_value.length

        if (binary_value == '' || binary_value == NaN || binary_value == ' ') {
            alert('Please Input Denary Numbers')
        } else {

            $('#denary_to_binary').attr('disabled', true)
            $('#convert_denary_to_binary').attr('disabled', true)
            $('#binary_simulation').html(base_to + '  |  ' + binary_value)
            $('#binary_simulation').append('<br>')
            $('#binary_simulation').append('---------------------')
            $('#binary_simulation').append('<br>')
            setTimeout(function () {
                convert_denary(binary_value, base_from, base_to, convert_length, 0)
            }, 400)

        }

        return false
    })

    $('#convert_denary_to_octa').on('click', function () {
        var binary_value = $('#denary_to_octa').val()
        var base_from = 10
        var base_to = 8
        var convert_length = binary_value.length

        if (binary_value == '' || binary_value == NaN || binary_value == ' ') {
            alert('Please Input Denary Numbers')
        } else {

            $('#denary_to_octa').attr('disabled', true)
            $('#convert_denary_to_octa').attr('disabled', true)
            $('#binary_simulation').html(base_to + '  |  ' + binary_value)
            $('#binary_simulation').append('<br>')
            $('#binary_simulation').append('---------------------')
            $('#binary_simulation').append('<br>')
            setTimeout(function () {
                convert_denary(binary_value, base_from, base_to, convert_length, 0)
            }, 400)

        }

        return false
    })

    $('#Reset').on('click', function () {
        $('#convert_binary_to_denary').removeAttr('disabled')
        $('#binary_to_denary').val('')
        $('#binary_to_denary').removeAttr('disabled')
        $('#add_binary_numbers').removeAttr('disabled')
        $('#binary1').removeAttr('disabled')
        $('#binary2').removeAttr('disabled')
        $('#binary1').val('')
        $('#binary2').val('')
        $('#binary_simulation').html('')
        $('#convert_octa_to_denary').removeAttr('disabled')
        $('#octa_to_denary').removeAttr('disabled')
        $('#octa_to_denary').val('')
        $('#add_octal_numbers').removeAttr('disabled')
        $('#octal1').removeAttr('disabled')
        $('#octal2').removeAttr('disabled')
        $('#octal1').val('')
        $('#octal2').val('')
        $('#multiply_binary_numbers').removeAttr('disabled')
        $('#convert_denary_to_binary').removeAttr('disabled')
        $('#denary_to_binary').removeAttr('disabled')
        $('#denary_to_binary').val('')
        $('#convert_denary_to_octa').removeAttr('disabled')
        $('#subtract_binary_numbers').removeAttr('disabled')
        $('#denary_to_octa').removeAttr('disabled')
        $('#denary_to_octa').val('')
    })

})