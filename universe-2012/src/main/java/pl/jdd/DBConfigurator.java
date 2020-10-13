/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.jdd;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.Specializes;
import javax.enterprise.inject.spi.InjectionPoint;

/**
 *
 * @author abien
 */
public class DBConfigurator extends Configurator{

    @Override @Produces @Specializes
    public String configures(InjectionPoint ip, Environment e) {
        return "from database";
    }
    
}
