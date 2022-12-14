<%--
  Created by IntelliJ IDEA.
  User: van1k
  Date: 15.10.2022
  Time: 21:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab 2</title>
  <link rel="icon" href="img/punisher.ico">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/style.css">
  <script src="js/jquery-3.6.1.js"></script>
  <script src="js/main.js" type="module"></script>
  <script src="js/canvas.js" type="module"></script>
  <script>
    function changeValue(value) {
      $("#r-value").val(value);
      $(":button").each(function () {
        if ($(this).val() == $("#r-value").val()) {
          $(this).removeClass();
          $(this).toggleClass("r-button-activated");
        } else {
          $(this).removeClass("r-button-activated");
          $(this).addClass("r-button");
        }
      })
    }
  </script>
  <script type="text/javascript">
    function drawHit(x, y, ctx) {
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    function loadData(x,y,r) {
      let canvas = document.getElementById("graph")
      let ctx = canvas.getContext("2d")
      ctx.beginPath()
      drawHit(x * (154 / r) + 330, Math.abs(y * (154 / r) - 340), ctx)
      ctx.fill()
    }
  </script>
</head>
<body>
<table id="main-table">
  <tr>
    <td class="main-header-cell">
      <h1 id="student-info" nickname="@gamatacy">Воронин Иван Александрович</h1>
    </td>
    <td class="group-cell">
      <h2>P32312</h2>
    </td>
    <td class="var-cell">
      <h2><a href="https://github.com/gamatacy/weblab1" class="git-link">№3104</a></h2>
    </td>
  </tr>
  <tr>
    <td class="input-cell">
      <table id="coord-table">
        <tr>
          <td class="coord-name">X</td>
          <td>
            <label for="check-1" class="x-label">-4</label>
            <input type="checkbox" class="x-checkbox" id="check-1" value="-4" name="r">
            <label for="check-2" class="x-label">-3</label>
            <input type="checkbox" class="x-checkbox" id="check-2" value="-3" name="r">
            <label for="check-3" class="x-label">-2</label>
            <input type="checkbox" class="x-checkbox" id="check-3" value="-2" name="r">
            <label for="check-4" class="x-label">-1</label>
            <input type="checkbox" class="x-checkbox" id="check-4" value="-1" name="r">
            <label for="check-5" class="x-label">0</label>
            <input type="checkbox" class="x-checkbox" id="check-5" value="0" name="r">
            <label for="check-1" class="x-label">&nbsp1</label>
            <input type="checkbox" class="x-checkbox" id="check-6" value="1" name="r">
            <label for="check-2" class="x-label">&nbsp2</label>
            <input type="checkbox" class="x-checkbox" id="check-7" value="2" name="r">
            <label for="check-3" class="x-label">&nbsp3</label>
            <input type="checkbox" class="x-checkbox" id="check-8" value="3" name="r">
            <label for="check-4" class="x-label">&nbsp4</label>
            <input type="checkbox" class="x-checkbox" id="check-9" value="4" name="r">

          </td>
        </tr>
        <tr>
          <td class="coord-name">Y</td>
          <td>
            <input type="text" class="y-text-area" name="y"
                   placeholder="                       Число от -5 до 3">
            <!-- стыдно :( --->
          </td>
        </tr>
        <tr>
          <td class="coord-name">
            R
          </td>
          <td>
            <input type="button" onclick="changeValue(this.value)" value="1" class="r-button">
            <input type="button" onclick="changeValue(this.value)" value="2" class="r-button">
            <input type="button" onclick="changeValue(this.value)" value="3" class="r-button">
            <input type="button" onclick="changeValue(this.value)" value="4" class="r-button">
            <input type="button" onclick="changeValue(this.value)" value="5" class="r-button">
            <input type="hidden" name="r" id="r-value" value="">
          </td>
        </tr>
      </table>
      <button type="submit" class="check-button">check</button>
    </td>
    <td class="coord-area-cell" colspan="2">
      <div>
        <canvas id="graph" height="676" width="674"></canvas>
        <c:forEach items="${sessionScope.data}" var="element">
          <input type="hidden" name="hit" class="hit-value" value='{"x": "${element.x}","y": "${element.y}","r": "${element.r}"}'>
        </c:forEach>
      </div>
    </td>
  </tr>
</table>
</body>
</html>