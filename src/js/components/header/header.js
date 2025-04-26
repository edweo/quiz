const template = document.createElement('template')
template.innerHTML = `
    <style>
        #root {
            box-sizing: border-box;
            background-color: #000;
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 10px;
            padding: 0 20px;
            box-shadow: 0 0 16px rgba(0, 0, 0, 0.7);
            height: 80px;
        }
            
        ::slotted(img) {
            max-width: calc(80px*0.45);
            max-height: calc(80px*0.45);
        }
        
    </style>
    
    <div id="root">
        <slot name="header-logo"></slot>
        <h2 id="title"></h2>
    </div>
`
class Header extends HTMLElement {
  #title
  #logo

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.#title = this.shadowRoot.querySelector('#title')
    this.#logo = this.shadowRoot.querySelector('#logo')
  }

  static get observedAttributes () {
    return ['title']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this.#title.textContent = newValue
        break
    }
  }

  connectedCallback () {
    if (this.hasAttribute('title')) {
      this.#title.textContent = this.getAttribute('title')
    }
  }
}

customElements.define('page-header', Header)
