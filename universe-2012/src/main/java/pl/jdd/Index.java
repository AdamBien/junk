package pl.jdd;

import javax.annotation.PostConstruct;
import javax.enterprise.inject.Model;
import javax.inject.Inject;

@Model
public class Index {

    @Inject
    GoodMorningKrakow gmk;
    
    @PostConstruct
    public void init(){
        System.out.println("Model");
    }
    
    public String hello(){
        return gmk.getMessage();
    }
    
}
