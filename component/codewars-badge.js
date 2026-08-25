// This native web component fetches data from the Codewars API and renders it as a badge
// Here is some information about web component https://developer.mozilla.org/en-US/docs/Web/Web_Components
// Here is the link to the Codewars API Docs: https://dev.codewars.com/#get-user

 export class CodeWarsBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "Edakofonime";
    this.userData = [];
  }

  connectedCallback() {
    
        this.render();
      
  }

  

  render() {
    this.shadowRoot.innerHTML = `
    <style>
        :host {
           --rank: ${this.userData.ranks.overall.color};
           --scores:${this.userData.ranks.languages.javascript.color};
           font: 600 100%/1 system-ui, sans-serif;

           
        }
        data { 
            color: var(--rank);
            border: 3px solid; 
            padding: .25em .5em;
        } 
                
      </style>
        <data value="${this.userData.ranks.overall.score}"> Rank:
        ${this.userData.ranks.overall.name}
        </data>
        
        
        `;
    
  }
}

customElements.define("codewars-badge", CodeWarsBadge);

