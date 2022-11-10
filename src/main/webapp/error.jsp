<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: voron
  Date: 27.10.2022
  Time: 9:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
    <link rel="icon" href="img/punisher.ico">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">
    <script src="js/jquery-3.6.1.js"></script>
</head>
<body>
<form action="${pageContext.request.contextPath}">
    <button type="submit" id="back-button" style="margin-top: 0">
        back
    </button>
</form>
    <div class="error-cell">
        ${sessionScope.errorMessage}
    </div>
</body>
</html>
