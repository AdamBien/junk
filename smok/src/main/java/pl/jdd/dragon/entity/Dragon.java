package pl.jdd.dragon.entity;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

public class Dragon {
    
    @Schema(readOnly = true)
    public String name;

    @Schema(example = "something dangerous like e.g explosion")
    public String capabilities;


    public int age;

	public Dragon(String name, String capabilities, int age) {
		this.name = name;
		this.capabilities = capabilities;
		this.age = age;
	}

    
}
