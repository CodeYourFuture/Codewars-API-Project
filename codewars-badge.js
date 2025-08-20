class CodewarsBadge extends HTMLElement {
  connectedCallback() {
    const USERNAME = encodeURIComponent("Houssam LH");
    fetch(`https://www.codewars.com/api/v1/users/${USERNAME}`)
      .then(res => res.json())
      .then(data => this.render(data))
      .catch(err => console.error(err));
  }

  render(data) {
    this.innerHTML = `
      <div class="badge">
        <h2>${data.username}</h2>
        <p>Overall Rank: ${data.ranks.overall.name}</p>
        <p>Total Completed Challenges: ${data.codeChallenges.totalCompleted}</p>
        <p>Honor: ${data.honor}</p>
        <p>JavaScript Rank: ${data.ranks.languages.javascript.name}</p>
      </div>
    `;
  }
}

customElements.define("codewars-badge", CodewarsBadge);

