/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.jdd;

import javax.enterprise.inject.Produces;

/**
 *
 * @author abien
 */
public class EnvironmentProvider {
    
    @Produces
    public Environment stage(){
        return Environment.TEST;
    }
}
