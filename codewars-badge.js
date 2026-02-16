// This native web component fetches data from the Codewars API and renders it as a badge
// Here is some information about web component https://developer.mozilla.org/en-US/docs/Web/Web_Components
// Here is the link to the Codewars API Docs: https://dev.codewars.com/#get-user

class CodeWarsBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "tanibien";
  }

  async connectedCallback() {
    try {
      const response = await fetch(`https://www.codewars.com/api/v1/users/${this.userName}`);
      const data = await response.json();
      this.render(data);
    } catch (e) {
      this.shadowRoot.innerHTML = `<p>Error loading profile</p>`;
    }
  }

  render(data) {
    const color = data.ranks.overall.color || "grey";
    // Чтобы гарантировать контраст, мы используем белый текст на темном фоне
    this.shadowRoot.innerHTML = `
      <style>
        .badge {
          background: #1e1e1e;
          color: #ffffff;
          border: 2px solid #ffffff;
          border-left: 10px solid ${color};
          padding: 20px;
          border-radius: 8px;
          width: 280px;
          margin-bottom: 20px;
        }
        .name { font-size: 1.5rem; font-weight: bold; margin-bottom: 10px; }
        .rank { font-weight: bold; color: #ffffff; background: #444; padding: 4px 8px; border-radius: 4px; display: inline-block; }
        .info { margin-top: 15px; font-size: 1.1rem; }
      </style>
      <section class="badge" aria-label="Codewars Profile">
        <div class="name">${data.username}</div>
        <div class="rank">Rank: ${data.ranks.overall.name}</div>
        <div class="info">
          <div>Honor: <strong>${data.honor}</strong></div>
        </div>
      </section>
    `;
  }
}

class CodewarsLanguages extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "tanibien";
  }

  async connectedCallback() {
    try {
      const response = await fetch(`https://www.codewars.com/api/v1/users/${this.userName}`);
      const data = await response.json();
      this.render(data.ranks.languages);
    } catch (e) { console.error(e); }
  }

  render(langs) {
    let listItems = "";
    for (let l in langs) {
      // Убираем сложные роли, используем стандартные теги для 100% Accessibility
      listItems += `<li style="margin-bottom: 10px;">${l}: <strong>${langs[l].name}</strong></li>`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        .container {
          background: #1e1e1e;
          color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          width: 280px;
          border: 1px solid #333;
        }
        h2 { color: #ffffff; font-size: 1.2rem; margin-top: 0; }
        ul { list-style: none; padding: 0; margin: 0; }
      </style>
      <section class="container" aria-label="Languages">
        <h2>Coding Skills</h2>
        <ul>${listItems}</ul>
      </section>
    `;
  }
}

customElements.define("codewars-badge", CodeWarsBadge);
customElements.define("codewars-languages", CodewarsLanguages);