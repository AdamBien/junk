/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.jdd;

import javax.ejb.Asynchronous;
import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;

@Stateless
public class ThreadStarter {

    @Inject
    Event<String> jobListeners;
    
    @Asynchronous
    public void execute(Runnable r){
        r.run();
        jobListeners.fire("Done!");
        throw new RuntimeException("Just for fun");
    }
}
