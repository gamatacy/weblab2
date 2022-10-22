export {saveData, appendData, changeCheckButtonText, attempts}

let attempts = 0;
$(document).ready(function () {

    loadData();


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
                drawHit(data.x,data.y,data.r)
                appendData(data)
                saveData(data)
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


    //Loads data from localStorage
    function loadData() {
        let storage = sessionStorage.getItem("storage");
        if (storage == null) {
            sessionStorage.setItem("storage", '{"data": []}');
        } else {
            JSON.parse(storage).data.forEach(element =>
                appendData(element)
            )
        }
    }


    //Clears localStorage
    function clearData() {
        sessionStorage.clear()
        loadData()
        clearResultsTable()
        changeCheckButtonText("cleared")
    }


    //Delete all results and reset attempts counter
    function clearResultsTable() {
        $(".results-table").empty()
        $(".results-table").append(
            `<tr class="result-row">
            <th class="result-cell">result</th>
            <th class="result-cell">X</th>
            <th class="result-cell">Y</th>
            <th class="result-cell">R</th>
            <th class="result-cell">time</th>
            <th class="result-cell">execution time</th>
            <th class="result-cell">attempt</th>
        </tr>`
        )
        attempts = 0
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

//Appends one row to the html table
function appendData(data) {
    let time = new Date(data.time)
    $(".results-table").append(
        `<tr class='result-row'>
             <th class='result-cell'>${data.result}</th>
             <th class='result-cell'>${data.x.toString().substring(0, 4)}</th>
             <th class='result-cell'>${data.y.toString().substring(0, 4)}</th>
             <th class='result-cell'>${data.r.toString().substring(0, 4)}</th>
             <th class='result-cell'>${('0' + time.getHours()).substr(-2)}:${('0' + time.getMinutes()).substr(-2)}:${('0' + time.getSeconds()).substr(-2)}</td>
             <th class='result-cell'>${data.execTime.toString().substring(0, 7) + "ms"}</th>
             <th class="result-cell">${attempts}</th>
             </tr>
            `
    )
    attempts++
}

//${data.time.getHours()}:${data.time.getMinutes()}:${data.time.getSeconds()}
//Saves data to localStorage
function saveData(data) {
    const storage = sessionStorage.getItem("storage");
    const arr = JSON.parse(storage);
    arr.data.push(data);
    sessionStorage.setItem("storage", JSON.stringify(arr));
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