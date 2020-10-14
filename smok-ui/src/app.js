class Smok extends HTMLElement { 

    connectedCallback() {
        const message = "some fire"
        this.innerHTML = `
            <button>spit fire</button>
            <h2>Smok ${this.getAttribute('message')} from Wawel with ${message}</h2>
        `;
        this.querySelector('button').onclick = _ => console.log("smok spits fire");
    }

}

customElements.define('jdd-smok', Smok);

