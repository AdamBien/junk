import { html, render } from "./lit-html.js";
import "./DatePicker.js";
class Smok extends HTMLElement {

    connectedCallback() {
        const message = "some fire"
        const template = html`
             <ui5-date-picker @change=${e => this.smokBirthday(e)} id="myDatepicker1"></ui5-date-picker>
            <button @click=${_ => this.spitFire()}>spit fire</button>
            <h2>Smok ${this.getAttribute('message')} from Wawel with ${message}</h2>
        `;
        console.log(template);
        render(template, this);
    }

    smokBirthday({ detail: { value } }) { 
        console.log(value);
    }

    async spitFire() { 
        const response = await fetch("http://localhost:8080/smok");
        const json = await response.json();
        const { capabilities, age, name } = json;
        console.log(`Smok data from backend: ${capabilities} ${age} ${name}`);
    }

}

customElements.define('jdd-smok', Smok);

