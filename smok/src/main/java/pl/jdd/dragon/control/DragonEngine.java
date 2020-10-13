package pl.jdd.dragon.control;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.management.RuntimeErrorException;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.metrics.annotation.Counted;

import pl.jdd.dragon.entity.Dragon;

@Dependent
public class DragonEngine {

    @Inject
    @ConfigProperty(name = "smok.name",defaultValue = "wawelski")
    String name;

    @Counted
    @Retry(maxRetries = 2)
    public Dragon create() {
        System.out.println("DragonEngine.create() .");
        throw new RuntimeException("just for fun");

    }
    
    public Dragon unstableDragonCreation() {
        return new Dragon("fake dragon", "spit fire, eat children", 500);
    }
    
}
