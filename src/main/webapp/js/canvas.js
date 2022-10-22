import * as main from "./main.js";
import {changeCheckButtonText} from "./main.js";

$(document).ready(function () {
    let canvas = document.getElementById("graph")
    let ctx = canvas.getContext("2d")

    loadData(ctx)

    $("#graph").mousemove(function (event) {
        let r = $("#r-value").val();

        if (r != "") {
            $(".check-button").html((`X: ${getCoordinate(event.offsetX, "r", r).toString().substring(0,4)} Y: ${getCoordinate(event.offsetY, "y", r).toString().substring(0,4)}`))
        }
    })

    $("#graph").mouseout(function(){
        $(".check-button").html("check")
    })

    $("#graph").click(function (event) {
        let r = $("#r-value").val();

        if (r == "") {
            main.changeCheckButtonText("Select R")
            return false
        }

        sendRequest(
            getCoordinate(event.offsetX, "r", r),
            getCoordinate(event.offsetY, "y", r),
            r
        )

        drawHit(event.offsetX, event.offsetY, ctx)

    })

    function sendRequest(x, y, r) {
        let time = new Date().getTime()
        $.get({
            url: "./request",
            data: {
                x: x,
                y: y,
                r: r
            },
            dataType: 'JSON'
        }).done(function (data) {
            data.time = time
            main.appendData(data)
            main.saveData(data)
        })

    }

    //cringe, but works 
    function getCoordinate(coordinate, coordinate_name, r) {
        let segment = 154 / r
        if (coordinate_name == "r") {
            return (coordinate - 330) / segment
        } else {
            return (340 - coordinate) / segment
        }

    }

})

function drawHit(x, y, ctx) {
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
}

function loadData(ctx) {
    let storage = sessionStorage.getItem("storage");
    if (storage != null) {
        JSON.parse(storage).data.forEach(function (element) {
            ctx.beginPath()
            drawHit(element.x * (154 / element.r) + 330, Math.abs(element.y * (154 / element.r) - 340), ctx)
            ctx.fill()
        })
    }
}