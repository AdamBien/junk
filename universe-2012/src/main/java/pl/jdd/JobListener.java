/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.jdd;

import java.io.IOException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.event.Observes;
import javax.enterprise.event.TransactionPhase;
import javax.servlet.AsyncContext;

/**
 *
 * @author abien
 */
public class JobListener {
    
    public void successful(@Observes(during = TransactionPhase.AFTER_SUCCESS) String message){
        System.out.println("+++++++++ Received: " + message);
    }
    public void failed(@Observes(during = TransactionPhase.AFTER_FAILURE) String message){
        System.out.println("----------- Received: " + message);
    }
    
    public void onWindowRequest(@Observes AsyncContext ac){
        try {
            ac.getResponse().getWriter().println("From EJB " +new Date());
        } catch (IOException ex) {
            Logger.getLogger(JobListener.class.getName()).log(Level.SEVERE, null, ex);
        }
        ac.complete();
    }
    
}
