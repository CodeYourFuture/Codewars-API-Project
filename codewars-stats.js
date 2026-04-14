class CodewarsStats extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "Richiealx";
    this.userData = null;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = "<p>Loading stats...</p>";

    this.fetchStats()
      .then(() => {
        this.render();
      })
      .catch((error) => {
        console.error(error);
        this.renderError();
      });
  }

  async fetchStats() {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${this.userName}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    this.userData = data;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 420px;
          width: 100%;
          font: 500 100%/1.4 system-ui, sans-serif;
        }

        .stats {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 1rem;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          text-align: left;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        p {
          margin: 0.5rem 0;
          font-size: 1rem;
        }
      </style>

      <div class="stats">
        <h3>Codewars Stats</h3>
        <p><strong>Total Completed:</strong> ${this.userData.codeChallenges.totalCompleted}</p>
        <p><strong>Total Authored:</strong> ${this.userData.codeChallenges.totalAuthored}</p>
        <p><strong>Leaderboard Position:</strong> ${this.userData.leaderboardPosition}</p>
      </div>
    `;
  }

  renderError() {
    this.shadowRoot.innerHTML = `
      <p>Failed to load Codewars stats.</p>
    `;
  }
}

customElements.define("codewars-stats", CodewarsStats);
