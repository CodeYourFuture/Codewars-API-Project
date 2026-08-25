export class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" integrity="sha512-ApSLB1Pd3/bZN8fWB/RG9YhN/7bd9Hkf3AGaE2mPfebjrxagjuBtx2GcgdqIlJkUzwylBo61r9Xa9NmgBI0swA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <style>
        .wrapper{
        height: auto;
        width:auto;
        margin:0;
        padding:2px;
        display: flex;
        justify-content: space-around;
        flex-wrap:wrap;
        
        }


.wrapper h3 {
    color: #38BDF8;
    font-size: 2rem;
    letter-spacing: 2px;
}

.wrapper p {
    color: #A1A1AA;
    max-width: 400px;
}


.wrapper a {
    display: block;
    color: #A1A1AA;
    text-decoration: none;
    margin-bottom: 10px;
    transition: 0.3s;
}


.wrapper a:hover {
    color: #38BDF8;
    transform: translateX(5px);
}


        
        
        </style>
        
        <div class="wrapper">
        
        <div>
        <h3>
        Code Arena
        </h3>
      <p> Defeat Algorithms</p>
      <p> Master Challenges </P>
      <p> Become A Code Warrior</p>
        </div>
        
        <div>
        <h3>Navigation</h3>

       <p> <a href="./codeArena.html">Code Arena</a> </p>
       <p> <a href="./kata.html">Katas</a></p>
        <p><a href="./warrior.html">Warriors</a></p>
        <p> <a href="./rank.html">Ranks</a></p>
        </div>

        <div>
        <h3>Resources</h3>

        <p> <a href="">Git Hub</a></p>
        <p> <a href="">Documentation</a></p>
        <p> <a href="">API</a></p>
        </div>
        <div>
        <h3>
        Connect
        </h3>
  <p>  <a href="">  <label htmlFor="">  Facebook <i class="fa-brands fa-facebook"></i></label></a></p>
 <p> <a href=""> <label htmlFor="">  Tiktok <i class="fa-brands fa-tiktok"></i></label></a></p> 
<p><a href=""> <label htmlFor="">  Whatsapp <i class="fa-brands fa-whatsapp"></i></label></a> </p> 

        </div>
        
        </div> `;
  }
}
customElements.define("app-footer", Footer);
