class CodewarsTopLanguages extends HTMLElement {
  connectedCallback() {
    const USERNAME = encodeURIComponent("Houssam LH");
    fetch(`https://www.codewars.com/api/v1/users/${USERNAME}`)
      .then(res => res.json())
      .then(data => this.render(data))
      .catch(err => console.error(err));
  }

  render(data) {
    const languages = Object.entries(data.ranks.languages)
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 3)
      .map(([lang, info]) => `<li>${lang}: ${info.name} (${info.score} pts)</li>`)
      .join('');

    this.innerHTML = `
      <div class="top-languages">
        <h3>Top 3 Languages</h3>
        <ul>${languages}</ul>
      </div>
    `;
  }
}

customElements.define("codewars-top-languages", CodewarsTopLanguages);
