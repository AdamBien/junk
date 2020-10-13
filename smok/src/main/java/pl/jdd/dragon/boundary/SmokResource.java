package pl.jdd.dragon.boundary;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import pl.jdd.dragon.control.DragonEngine;
import pl.jdd.dragon.entity.Dragon;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("smok")
public class SmokResource {

    @Inject
    DragonEngine engine;

    @GET
    public Dragon get() {
        return this.engine.create();
    }


    @POST
    public void save(Dragon dragon) {
        System.out.println("SmokResource.save() " + dragon);
    }
    
    
}
