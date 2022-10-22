package servlets

import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

@WebServlet(name="controllerServlet", value=["/request"])
class ControllerServlet: HttpServlet() {

    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {
        val params = req.parameterMap
        if (params.containsKey("x") && params.containsKey("y") && params.containsKey("r")){
            req.getRequestDispatcher("checkServlet").forward(req, resp)
        }
    }

}