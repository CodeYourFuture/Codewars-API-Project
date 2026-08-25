

export class Hero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
img{

height:25%;
width:35%;
border-radius: 15px;
}
.wrapper{
    min-height: 100vh;
    background:linear-gradient(135deg, #09090B, #111827);


}
h1,

h2{
font-size: 5rem;
font-weight: 800;
letter-spacing: 3px;
color: #85a8db;

}

h1 {
    text-align: center;
    margin-top:2px;
}
.hero-wrapper{
display:flex;
height: 30%;
width:99%;
gap:10px;
margin:10px 0 0 10px;
padding: 10px  0 0 0;

}

.hero-text{
width:65%;
padding:20px;
align-item:center;

}

p{
font-size: 1.4rem;
color: #85a8db;
line-height: 1.8;

}


.test-wrapper{

display:flex;
gap:15px;
flex-direction:column;
gap:20px;

}

.sub-wrapper{

display:flex;
height:80%;
width:100%;
gap:5px;
flex-wrap:wrap;
justify-content:space-between;
}

.text-img{
width:100%;
height:100%;
object-fit: cover;

}

.img-container{

height:100%;
width:30%;
padding:10px;
display: flex;
flex-direction:column;
justify-content:center;
align-items:center;

}

.text-img1{

height: 100%;
width: 100%;
object-fit: cover;

}

.cont{
height:250px;
width:100%;

}


.warrior a {
    width: 200px;
    padding: 12px 16px;
    border: 2px solid #18181B ;
    border-radius: 8px;
    background-color:  #268adc;
    color:  white;
    font-size: 16px;
    outline: none;
    text-decoration:none;
}


a:hover{

transform: translateY(-5px);
box-shadow: 0 0 25px #268adc;

}





</style>

<div class="wrapper">
<div class="hero-wrapper">
<div class="hero-text">
<h1>CODE WARS</h1>
<h2>Enter the Code Battle Field</h2>


<div class='test-wrapper'>
<div class='sub-wrapper'>

<div class="img-container">
<div class="cont"><img class="text-img" src="./asset/algorithms.jpeg" alt="" /></div>
<P>Defeat algorithms</P>
</div>


<div class="img-container">

<div class="cont"> <img class= "text-img" src="./asset/master challenges.jpeg" alt="" /> </div>
<P>Master challenges</P>
</div>

<div class="img-container">

<div class="cont"><img class="text-img" src="./asset/code warrior.jpeg" alt="" /> </div>
<P>Become a coding warrior</P>
</div>

</div>


<div class="warrior">
<a href="./warrior.html">View Warrior Profile</a>


</div>

</div>


</div>
<img src="./asset/hero.jpeg" />
</div>



</div> `;

  
  }
}

customElements.define("app-hero", Hero);
