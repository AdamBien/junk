import { html, render } from "./lit-html.js";

class Smok extends HTMLElement { 

    connectedCallback() {
        const message = "some fire"
        const template = html`
            <button @click=${_=> this.spitFire()}>spit fire</button>
            <h2>Smok ${this.getAttribute('message')} from Wawel with ${message}</h2>
        `;
        console.log(template);        
        render(template,this);
    }

    spitFire() { 
        console.log("spitting like crazy");
    }

}

customElements.define('jdd-smok', Smok);

