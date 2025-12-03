// // This native web component fetches data from the Codewars API and renders it as a badge
// // Here is some information about web component https://developer.mozilla.org/en-US/docs/Web/Web_Components
// // Here is the link to the Codewars API Docs: https://dev.codewars.com/#get-user

// class CodeWarsBadge extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//     this.userName = "BaselAdoum";
//     this.userData = [];
//   }

//   connectedCallback() {
//     this.fetchActivity()
//       .then(() => {
//         this.render();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   // fetch the data from the Codewars API
//   async fetchActivity() {
//     const response = await fetch(
//       `https://www.codewars.com/api/v1/users/${this.userName}`
//     );
//     const data = await response.json();
//     this.userData = data; // set the userData property with the fetched data
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//     <style>
//         :host {
//            --rank: ${this.userData.ranks.overall.color};
//            font: 600 100%/1 system-ui, sans-serif;
//         }
//         data { 
//             color: var(--rank);
//             border: 3px solid; 
//             padding: .25em .5em;
//         }      
//       </style>
//         <data value="${this.userData.ranks.overall.score}">
//         ${this.userData.ranks.overall.name}
//         </data>`;
//   }
  
  
// }

// customElements.define("codewars-badge", CodeWarsBadge);



// //console.log("testing")

// this is a nice full display of all info from api. be careful. there is only one render.
// no more than one render in the file with the same name. you add add a div. **check code below.
//   // render() {
//   //   this.shadowRoot.innerHTML = `
//   //   <style>
//   //       :host {
//   //          --rank-color: ${this.userData.ranks.overall.color};
//   //          font-family: system-ui, sans-serif;
//   //          display: inline-block;
//   //       }
        
//   //       .badge {
//   //           border: 3px solid var(--rank-color);
//   //           border-radius: 10px;
//   //           padding: 1.2em;
//   //           text-align: center;
//   //           min-width: 220px;
//   //           background: white;
//   //           box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   //       }
        
//   //       .username {
//   //           font-size: 1.3em;
//   //           font-weight: bold;
//   //           color: #333;
//   //           margin-bottom: 8px;
//   //       }
        
//   //       .main-rank {
//   //           color: var(--rank-color);
//   //           font-size: 1.8em;
//   //           font-weight: 800;
//   //           margin: 10px 0;
//   //           text-transform: uppercase;
//   //       }
        
//   //       .rank-score {
//   //           color: #666;
//   //           font-size: 0.9em;
//   //           margin-bottom: 15px;
//   //       }
        
//   //       .stats-grid {
//   //           display: grid;
//   //           grid-template-columns: 1fr 1fr;
//   //           gap: 15px;
//   //           margin: 15px 0;
//   //       }
        
//   //       .stat-box {
//   //           padding: 10px;
//   //           border-radius: 6px;
//   //           background: #f8f9fa;
//   //       }
        
//   //       .stat-value {
//   //           font-size: 1.5em;
//   //           font-weight: bold;
//   //           color: #2c3e50;
//   //       }
        
//   //       .stat-label {
//   //           font-size: 0.8em;
//   //           color: #7f8c8d;
//   //           margin-top: 5px;
//   //           text-transform: uppercase;
//   //           letter-spacing: 1px;
//   //       }
        
//   //       .language-item {
//   //           margin-top: 15px;
//   //           padding-top: 15px;
//   //           border-top: 1px solid #eee;
//   //       }
        
//   //       .language-name {
//   //           font-weight: bold;
//   //           color: #333;
//   //       }
        
//   //       .language-rank {
//   //           color: var(--rank-color);
//   //           font-weight: bold;
//   //           margin-left: 5px;
//   //       }
//   //     </style>
      
//   //     <div class="badge">
//   //       <!-- Username -->
//   //       <div class="username">${this.userData.username}</div>
        
//   //       <!-- Main Rank -->
//   //       <div class="main-rank">${this.userData.ranks.overall.name}</div>
//   //       <div class="rank-score">Score: ${this.userData.ranks.overall.score}</div>
        
//   //       <!-- Stats Grid -->
//   //       <div class="stats-grid">
//   //         <div class="stat-box">
//   //           <div class="stat-value">${this.userData.honor}</div>
//   //           <div class="stat-label">Honor</div>
//   //         </div>
          
//   //         <div class="stat-box">
//   //           <div class="stat-value">${this.userData.codeChallenges.totalCompleted}</div>
//   //           <div class="stat-label">Completed</div>
//   //         </div>
//   //       </div>
        
//   //       <!-- Languages -->
//   //       <div class="language-item">
//   //         <div style="font-size: 0.9em; color: #7f8c8d; margin-bottom: 5px;">Top Language:</div>
//   //         <div>
//   //           <span class="language-name">JavaScript</span>
//   //           <span class="language-rank">${this.userData.ranks.languages.javascript.name}</span>
//   //         </div>
//   //       </div>
//   //     </div>`;
//   // }

class CodeWarsBadge extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "BaselAdoum"; // ← PUT YOUR USERNAME HERE this will be added to the url
    this.userData = [];
  }

  connectedCallback() {
    this.fetchActivity()
      .then(() => {
        this.render();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async fetchActivity() {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${this.userName}` // this is an object created by json
    );
    const data = await response.json();
    this.userData = data;
  }

  // ONLY ONE render() method:
  render() {
    this.shadowRoot.innerHTML = `
    <style>
        .badge {
            border: 1px solid #ccc;
            padding: 10px;
            display: inline-block;
        }
        
        .username {
            font-weight: bold;
        }
      </style>
      
      <div class="badge">
        <div class="username">${this.userData.username}</div>
        <div class="challenges">Challenges: ${this.userData.codeChallenges.totalCompleted}</div>
        <div class="score">JavaScript Score: ${this.userData.ranks.languages.javascript.score}</div>
      </div>`;
  }
}

customElements.define("codewars-badge", CodeWarsBadge);
console.log("testing");




// this is the api info of my account 
//https://www.codewars.com/api/v1/users/BaselAdoum
//code tested. i finished a kata after i rendered the code. it moved from 19 completed challenges 
// to 20 completed challenges. YAAAAAAAAAAAAAAAAAAY