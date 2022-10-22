package servlets

import jakarta.json.Json
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import kotlin.math.pow

@WebServlet("checkServlet")
class AreaCheckServlet : HttpServlet() {

    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {
        val startTime = System.nanoTime()

        val x = req.getParameter("x").toFloat()
        val y = req.getParameter("y").toFloat()
        val r = req.getParameter("r").toFloat()

        val result = checkCircle(x, y, r) || checkSquare(x, y, r) || checkTriangle(x, y, r)

        val response = createJsonResponse(x, y, r, result, (System.nanoTime() - startTime) / 10000)

        resp.writer.println(response)

    }

    private fun checkCircle(x: Float, y: Float, r: Float): Boolean {
        return (x.pow(2) + y.pow(2) <= (r / 2).pow(2)) && (x >= 0 && y <= 0)
    }

    private fun checkSquare(x: Float, y: Float, r: Float): Boolean {
        return (x >= -r / 2 && x <= 0) && (y <= r && y >= 0)
    }

    private fun checkTriangle(x: Float, y: Float, r: Float): Boolean {
        return (y <= ((r - x) / 2)) && (y <= (r / 2) && y >= 0) && (x >= 0 && x <= r)
    }

    private fun createJsonResponse(x: Float, y: Float, r: Float, result: Boolean, execTime: Long): String {
        val jsonBuilder = Json.createObjectBuilder()
        jsonBuilder.add("x", x.toDouble())
        jsonBuilder.add("y", y.toDouble())
        jsonBuilder.add("r", r.toDouble())
        jsonBuilder.add("result", result)
        jsonBuilder.add("execTime", execTime)
        return jsonBuilder.build().toString()

    }

}