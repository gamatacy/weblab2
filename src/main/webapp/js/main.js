export {changeCheckButtonText}

$(document).ready(function () {

    //Takes coordinates, validates them and sends get request
    $(".check-button").click(function () {
            let x;
            let y = $(".y-text-area").val();
            let r = $("#r-value").val();

            $(".x-checkbox").each(function () {
                if ($(this).is(":checked")) {
                    x = $(this).val();
                    return false
                }
            })

            if (String(y) == "clear") {
                clearData()
                clearGraph()
                return false
            }

            if (x == undefined) {
                changeCheckButtonText("Select X")
                return false
            }

            if (r == "") {
                changeCheckButtonText("Select R")
                return false
            }

            if (!checkCoordsValid(x, y, r)) {
                changeCheckButtonText("Wrong Y")
                return false
            }

            let time = new Date()

            $.get({
                url: "./request",
                data: {
                    x: x,
                    y: y,
                    r: r,
                    time: time
                },
            }).done(function (data) {
                window.location.pathname = data
            })
        }
    )

    function checkCoordsValid(x, y, r) {
        return !!(checkX(x) && checkY(y) && checkX(r));
    }

    function checkY(y) {
        if (String(y).length > 4) {
            return false
        }

        return (y <= 5 && y >= -5)
    }

    function checkX(x) {
        return !(x === undefined)
    }

});

//Swap text in "check" button for a bit if coordinates aren't valid
function changeCheckButtonText(message) {
    $(".check-button").html(message)
    $(".check-button").toggleClass("check-button-active")
    setTimeout(() => {
            $(".check-button").html("check")
            $(".check-button").removeClass("check-button-active")
        },
        500)
}

function drawHit(x, y, r) {
    let canvas = document.getElementById("graph")
    let ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.arc(x * (154 / r) + 330, Math.abs(y * (154 / r) - 340), 3, 0, Math.PI * 2)
    ctx.fill()
}

function clearGraph() {
    let canvas = document.getElementById("graph")
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}