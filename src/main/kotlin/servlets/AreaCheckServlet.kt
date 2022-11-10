package servlets

import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import ResultInfo
import java.util.*
import kotlin.collections.ArrayList
import kotlin.math.pow

@WebServlet("checkServlet")
class AreaCheckServlet : HttpServlet() {

    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {
        val startTime = System.nanoTime()
        val date = Date()

        try {

            val x = req.getParameter("x").toFloat()
            val y = req.getParameter("y").toFloat()
            val r = req.getParameter("r").toFloat()

            val result = checkCircle(x, y, r) || checkSquare(x, y, r) || checkTriangle(x, y, r)
            val execTime = (System.nanoTime() - startTime) / 10000

            val resultInfo = ResultInfo(result, x, y, r, "${date.hours}:${date.minutes}:${date.seconds}", execTime)

            if (req.session.getAttribute("data") == null) {
                req.session.setAttribute("data", arrayListOf<ResultInfo>(resultInfo))
            } else {
                val results = req.session.getAttribute("data") as MutableList<ResultInfo>
                results.add(resultInfo)
                req.session.setAttribute("data", results)
            }

            resp.writer.println(req.contextPath + "/results.jsp")

        } catch (e: Exception) {
            req.session.setAttribute("errorMessage", e.message)
            resp.sendRedirect(req.contextPath + "/error.jsp")
        }
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

}