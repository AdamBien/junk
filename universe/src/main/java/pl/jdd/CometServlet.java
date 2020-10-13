/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.jdd;

import java.io.IOException;
import java.io.PrintWriter;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author abien
 */
@WebServlet(name = "CometServlet", urlPatterns = {"/CometServlet"},asyncSupported = true)
public class CometServlet extends HttpServlet {

    @Inject
    Event<AsyncContext> listeners;
            
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        AsyncContext startAsync = request.startAsync();
        listeners.fire(startAsync);
    }


}
