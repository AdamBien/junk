/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.jdd;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

/**
 *
 * @author abien
 */
public class Configurator {
    
    @Produces
    public String configures(InjectionPoint ip,Environment e){
        Class<?> declaringClass = ip.getMember().getDeclaringClass();
        String name = ip.getMember().getName();
        return declaringClass.getName() + "##"+name + e;
    }
}
