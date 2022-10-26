<%@ page import="java.util.Date" %><%--
  Created by IntelliJ IDEA.
  User: van1k
  Date: 26.10.2022
  Time: 15:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Results</title>
    <link rel="icon" href="img/punisher.ico">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">
    <script src="js/jquery-3.6.1.js"></script>
    <script src="js/main.js" type="module"></script>
    <script src="js/canvas.js" type="module"></script>
</head>
<body>
<form action="${pageContext.request.contextPath}">
    <button type="submit" id="back-button">
        back
    </button>
</form>
<table id="results-table">
    <tr class="result-row">
        <th class="result-cell">result</th>
        <th class="result-cell">X</th>
        <th class="result-cell">Y</th>
        <th class="result-cell">R</th>
        <th class="result-cell">time</th>
        <th class="result-cell">execution time</th>
    </tr>
    <c:forEach items="${sessionScope.data}" var="element">
        <tr class="result-row">
            <th class="result-cell">${element.result}</th>
            <th class="result-cell">${element.x}</th>
            <th class="result-cell">${element.y}</th>
            <th class="result-cell">${element.r}</th>
            <th class="result-cell"><%= new Date() %></th>
            <th class="result-cell">${element.execTime}ms</th>
        </tr>
    </c:forEach>
</table>
<img src="./img/finger.png" class="finger-img">
</body>
</html>
