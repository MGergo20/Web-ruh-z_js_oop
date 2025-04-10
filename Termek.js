class Termek {
  constructor(index, adat) {
    this.index = index;
    this.adat = adat;
    this.szuloElem = null;
    this.buttonElem = null;
  }

  megjelenit() {
    
  }

  kosarbaRak(atrak, detail) {
    // Kosárba helyezés esemény létrehozása
    const customEvent = new CustomEvent(atrak, { detail: this.index });
    window.dispatchEvent(customEvent);
  }
}
