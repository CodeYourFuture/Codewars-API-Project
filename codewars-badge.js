class CodeWarsBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "Richiealx";
    this.userData = null;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = "<p>Loading badge...</p>";

    this.fetchActivity()
      .then(() => {
        this.render();
      })
      .catch((error) => {
        console.error(error);
        this.renderError();
      });
  }

  async fetchActivity() {
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
          font: 600 100%/1.4 system-ui, sans-serif;
        }

        .badge {
          border: 2px solid ${this.userData.ranks.overall.color};
          border-radius: 10px;
          padding: 1rem;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          text-align: left;
        }

        h2 {
          margin: 0 0 0.75rem;
          font-size: 1.8rem;
        }

        p {
          margin: 0.5rem 0;
          font-size: 1rem;
        }

        .rank {
          color: ${this.userData.ranks.overall.color};
          font-weight: 700;
        }
      </style>

      <div class="badge">
        <h2>${this.userData.username}</h2>
        <p><strong>Rank:</strong> <span class="rank">${this.userData.ranks.overall.name}</span></p>
        <p><strong>Score:</strong> ${this.userData.ranks.overall.score}</p>
        <p><strong>Honor:</strong> ${this.userData.honor}</p>
        <p><strong>Completed Kata:</strong> ${this.userData.codeChallenges.totalCompleted}</p>
      </div>
    `;
  }

  renderError() {
    this.shadowRoot.innerHTML = `
      <p>Failed to load Codewars badge.</p>
    `;
  }
}

customElements.define("codewars-badge", CodeWarsBadge);
