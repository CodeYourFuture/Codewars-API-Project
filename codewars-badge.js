// This native web component fetches data from the Codewars API and renders it as a badge
// Here is some information about web component https://developer.mozilla.org/en-US/docs/Web/Web_Components
// Here is the link to the Codewars API Docs: https://dev.codewars.com/#get-user

class CodeWarsBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "avatarit";
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

  // fetch the data from the Codewars API
  async fetchActivity() {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${this.userName}`
    );
    const data = await response.json();
    this.userData = data; // set the userData property with the fetched data
  }

  render() {
    const overall = this.userData?.ranks?.overall || {};
    const name = this.userData?.name || this.userName;
    const clan = this.userData?.clan || "No Clan";
    const honor = this.userData?.honor ?? "n/a";
    const rankName = overall?.name || "n/a";
    const score = overall?.score ?? "n/a";
    const rankColor = overall?.color || "#";
  
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --rank: ${rankColor};
          display: inline-block;
          font-family: Arial, sans-serif;
          font-size: 1.1rem;
          text-align: left;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          background: linear-gradient(to right,rgb(15, 4, 4),rgb(0, 0, 0));
          color: #111;
        }
        data { color: var(--rank); }
        .row { margin: 0.25rem 0; }
      </style>
  
      <data value="${score}">
        <strong class="row">Name: ${name}</strong>
        <div class="row">Rank: ${rankName}</div>
        <div class="row">Clan: ${clan}</div>
        <div class="row">Honor: ${honor}</div>
        <div class="row">Score: ${score}</div>
      </data>
    `;
  }
  
}
class CodeWarsRecent extends HTMLElement {
  static get observedAttributes() { return ['username', 'limit', 'page']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.username = this.getAttribute('username') || 'CodeYourFuture';
    this.limit = Number(this.getAttribute('limit') || 5);
    this.page = Number(this.getAttribute('page') || 0);
    this.renderSkeleton();
  }

  connectedCallback() {
    this.load();
  }

  attributeChangedCallback(name, _old, _val) {
    if (!this.isConnected) return;
    this.username = this.getAttribute('username') || this.username;
    this.limit = Number(this.getAttribute('limit') || this.limit);
    this.page = Number(this.getAttribute('page') || this.page);
    this.renderSkeleton();
    this.load();
  }

  $(sel) { return this.shadowRoot.querySelector(sel); }

  renderSkeleton() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font: 16px/1.5 system-ui, sans-serif; }
        .card {
          background: #12151c;
          border: 1px solid #2a2f3a;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: #f4f6f9;
        }
        .status { min-height: 1.25rem; opacity: 0.9; }
        .error { color: #ff8a8a; }
        ul { list-style: none; margin: 0.5rem 0 0; padding: 0; }
        li {
          margin: 0.5rem 0;
          padding: 0.6rem 0.8rem;
          border: 1px solid #2a2f3a;
          border-radius: 10px;
          background: #0f1218;
        }
        a { color: #9dff00; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .meta { font-size: 0.9rem; opacity: 0.85; }
        .tags { display: inline-flex; gap: .4rem; flex-wrap: wrap; }
        .tag {
          border: 1px solid #2a2f3a;
          border-radius: 999px;
          padding: .1rem .45rem;
          font-size: .85rem;
        }
      </style>
      <div class="card">
        <div class="status" role="status" aria-live="polite">
          Loading recent katas for "${this.username}"…
        </div>
        <ul id="list" aria-label="Recently completed katas"></ul>
      </div>
    `;
  }

  async load() {
    const status = this.$('.status');
    const list = this.$('#list');
    list.innerHTML = '';

    try {
      const url = `https://www.codewars.com/api/v1/users/${encodeURIComponent(this.username)}/code-challenges/completed?page=${this.page}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

      const data = await res.json();
      console.log('[codewars-recent] completed:', data); // helpful for debugging

      const items = (data.data || []).slice(0, this.limit);
      if (!items.length) {
        status.textContent = 'No completed katas found (yet).';
        return;
      }

      const frag = document.createDocumentFragment();
      for (const item of items) {
        const li = document.createElement('li');
        const id = item.id || item.slug || '';
        const kataUrl = id ? `https://www.codewars.com/kata/${id}` : '#';
        const title = item.name || item.slug || 'Untitled kata';
        const when = item.completedAt ? new Date(item.completedAt) : null;
        const langs = item.completedLanguages || [];

        li.innerHTML = `
          <div class="title">
            <a href="${kataUrl}" target="_blank" rel="noopener noreferrer">${this.escape(title)}</a>
          </div>
          <div class="meta">
            ${when ? `Completed ${when.toLocaleDateString()}` : 'Completed (date unknown)'}
            ${langs.length ? ` • <span class="tags">${langs.map(l => `<span class="tag">${this.escape(l)}</span>`).join('')}</span>` : ''}
          </div>
        `;
        frag.appendChild(li);
      }

      list.appendChild(frag);
      status.textContent = '';
    } catch (err) {
      console.error('[codewars-recent] fetch error:', err);
      status.classList.add('error');
      status.textContent = 'Could not load recent katas. Check the username or try again later.';
    }
  }

  escape(str) {
    return String(str)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#39;');
  }
}

customElements.define('codewars-recent', CodeWarsRecent)

customElements.define("codewars-badge", CodeWarsBadge);
