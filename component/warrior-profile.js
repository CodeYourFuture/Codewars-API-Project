export class Profile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._userData = null;
    this._load= true;
  }

  connectedCallback() {
    this.render();
  }
  set load(data) {

    this._load = data;
this.render()
  }

  get load() {
    
    return this._load;
  }

  set userData(data) {
    this._userData = data;
    this.render();
  }
  set load(data) {
    this._load = data;
    this.render();
  }
  get load() {
    return this._load;
  }
  get userData() {
    return this._userData;
  }

  renderLoading() {
    return ` 
    <style>
    .profile{
    display:flex;
    flex-direction:column;
    height:55vh;
    padding-bottom:3rem;
    
    }

    .message {
    
    height:80%;
    width:100%
    }
    .message p{
    
  text-align:center;
  font-size: 5rem;
font-weight: 300;
letter-spacing: 1px;
color: #85a8db;
  
    }

    .input-profile{
    display:flex;
    justify-content: space-between;
    margin: 2rem;
    height:5%;
    align-items:center;
    }

    
 .input-profile p {
 
    width: 100px;
    
    padding: 12px 16px;
    border: 2px solid #18181B ;
    border-radius: 8px;
    background-color:  rgba(1, 9, 20, 0.82);
    color:  #A1A1AA;
    font-size: 16px;
    outline: none;
    text-align:center;
 
 
 }

    .btn-profile{
    
    display:flex;
    gap:10px;
    width: 25%;
    align-items:center;
    
    }

    input{
    width: 250px;
    height:20%;
    padding: 12px 16px;
    border: 2px solid #268adc;
    border-radius: 8px;
    background-color:   #18181B ;
    color:  white;
    font-size: 16px;
    outline: none;
    
    
    }

    
button{
background: rgba(1, 9, 20, 0.82);
color: white;
border-radius: 10px;
width:100px;
height:48px;
color: #A1A1AA;
border:solid  rgba(1, 9, 20, 0.82);

}
.error-message {
  color: #b42318;
  background-color: #fef3f2;
  border: 1px solid #fecdca;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px 0;
  font-size: 32px;
  font-weight:700;
  line-height: 1.5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align:center;
}


    button:hover{
    
    
transform: translateY(-5px);
box-shadow: 0 0 25px #268adc;
    
    }
    
    </style>
    
    
    <div class="profile">
    

<div class=input-profile>
<div class="btn-profile">
<input type="text" placeholder="Enter Codewar Username" />
<button>View Profile</button>
</div>
<p> Warrior Profile </p>
</div>

<div class="message">
 <div class="error-message" ${this._load ? 'style="visibility:hidden"' : ""}> Oops! unmatched credentials</div> 
<p> See What You Have Been Upto Lately!</p>
</div>
   
    
    </div>`;
  }

  renderData() {
    return `
    
<style>
 h1 { font-size: 3rem;
font-weight: 800;
letter-spacing: 3px;
color: #85a8db;
text-align: center;
margin-top:4px;
        
        
}
.profile-wrapper{
        
justify-content:space-around;
display:flex;
flex-wrap:wrap;
        
 }



.username{
        
width:12rem;
 height: 2rem;
padding: 0.4rem;
background: rgba(1, 9, 20, 0.82);
border-radius: 3px;
text-align:center;
margin-bottom: 5px;
        
        
}

        .username p{
        
        color: #3461a3;}

        .table-wrapper{
        
        
        height: 20rem;}

table{

width: 80%;
margin-top:3rem;
margin-left: 11rem;
border: 2px solid #27272A;
height:auto;
 border-collapse: collapse;
}


thead {
    background:rgba(1, 9, 20, 0.82);
    
}

th {
    padding: 16px;
    text-align: left;
    font-size: 1rem;
    letter-spacing: 1px;
    border:1px solid #27272A;
    color: white;
}

td {
    padding: 14px 16px;
    border: 1px solid #27272A;
    color: white;
}
        
        
        </style>
        
        <div>
        <h1>Welcome to Your Profile ${this._userData.name
          .split(" ")
          .map((name) => name[0].toUpperCase()+name.slice(1))
          .join(" ")}</h1>
        <div class="profile-wrapper">

          
    <label class='username' for=""> <p> Username: ${this._userData.username.toUpperCase()}</p></label>  
      <label  class='username' for=""> <p>Rank: ${this._userData.ranks.overall.name.toUpperCase()}</p></label>  
      <label class="username" for=""> <p>Honor: ${this._userData.honor}</p></label>  
      <label class ='username' for=""> <p>Katas Completed: ${this._userData.codeChallenges.totalCompleted}</p></label>  
        </div>
      <div class="table-wrapper">
     
        <table> 
        <thead>
        <tr>
        <th> Languages</th>
        <th> Rank</th>
        <th> Score</th>
        </tr>
        </thead>
<tbody>
      <tr>
      <td> Javascript</td>
      <td> ${this._userData.ranks.overall.rank}</td>
      <td> ${this._userData.ranks.languages.javascript ? this._userData.ranks.languages.javascript.score : 0}</td>
      </tr>
      
      <tr>
     <td> SQL</td>
      <td> ${this._userData.ranks.languages.sql ? this.userData.ranks.languages.sql.name : "Not ranked"}</td>
      <td> ${this._userData.ranks.languages.sql ? this.userData.ranks.languages.sql.score : 0}</td>
      </tr>
        
              
      <tr>
     <td>Go </td>
      <td> ${this._userData.ranks.languages.go ? this.userData.ranks.languages.go.name : "Not ranked"}</td>
      <td> ${this._userData.ranks.languages.go ? this.userData.ranks.languages.go.score : 0}</td>
      </tr>
            
      <tr>
     <td> Ruby</td>
      <td> ${this._userData.ranks.languages.ruby ? this.userData.ranks.languages.rugby.name : "Not ranked"}</td>
      <td> ${this._userData.ranks.languages.ruby ? this.userData.ranks.languages.rugby.score : 0}</td>
      </tr>
      </tbody>
        </table>
      
      </div>
        
        </div> `;
  }

  render() {
    if (this._userData) {
      this.shadowRoot.innerHTML = this.renderData();
    } else {
      this.shadowRoot.innerHTML = this.renderLoading();

      const submitBtn = this.shadowRoot.querySelector("button");
      const inputElement = this.shadowRoot.querySelector("input");

      submitBtn.addEventListener("click", () => {
        if(inputElement.value==="") return
        this.dispatchEvent(
          new CustomEvent("user-input", {
            bubbles: true,
            compose: true,
            detail: inputElement.value,
          }),
        );

        inputElement.value = "";
      });
    }
  }
}

customElements.define("warrior-profile", Profile);
