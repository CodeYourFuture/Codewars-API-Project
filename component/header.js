class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this._userData = null;
  }

  set userData(data) {
    this._userData = data;
    this.render();
  }
  get userData() {
    return this._userData;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
  <style>
  .wrapper{
  
height:65px;
min-width:320px;
gap:10px;
margin:10px 0 0 10px;
padding: 10px  0 0 0;
padding:10px;
border-radius:5px;
  

  }

  .container{
  
  display:flex;
  height:100%;
  width:100%;
  justify-content: space-around;
  align-items:center;
  background-color:  #192538a1;
  border-radius:10px;
  flex-wrap:wrap;
  
  }

  a {
  color:#FFFFFF;
  text-decoration:none
  }
img {

height:65px;
width:65px;
}
  
  </style>
    
    <header class="wrapper">
    
    <div class="container">
   <a href="./"> <img src='./asset/codewar.png'> </img></a>
    <a href="./">Home</a>
    <a href="./warrior.html">Warrior Profile</a>
   <a href="./kata.html"> Kata</a>  
    <a href="./rank.html"> Ranks</a>
    
    
    </div>
    
    </header>
    
    `;
  }
}

customElements.define("app-header", Header);

export { Header };
