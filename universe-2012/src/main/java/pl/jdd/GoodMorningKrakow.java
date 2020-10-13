package pl.jdd;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class GoodMorningKrakow {
    
    @Inject
    String complexConfiguration;
    
    @Inject
    ThreadStarter ts;
    
    
    @PostConstruct
    public void init(){
        System.out.println("EJB");
    }

    public String getMessage(){
        ts.execute(new Runnable(){

            @Override
            public void run() {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ex) {
                    Logger.getLogger(GoodMorningKrakow.class.getName()).log(Level.SEVERE, null, ex);
                }
                System.out.println("Done!! " + new Date());
            }
        });
        return "EJB hello " + this.complexConfiguration;
    }
    
}
