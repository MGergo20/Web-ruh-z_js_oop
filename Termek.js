export default class Termek {
  constructor(index, adat) {
    this.index = index;
    this.adat = adat;
    this.szuloElem = document.getElementsByClassName("art")[0];
    this.buttonElem = document.getElementsByClassName("btn btn-primary")[0];
    this.megjelenit();
  }

  megjelenit() {
    let html = `<div class="card shadow-sm" style="width: 18rem;">
                  <img src="kepek/${this.adat.kep}" class="card-img-top" alt="${this.adat.nev}">
                  <div class="card-body">
                    <h5 class="card-title">${this.adat.nev}</h5>
                    <p class="card-text">${this.adat.leiras || "Ez egy szuper termék!"}</p>
                    <p class="fw-bold">${this.adat.ar} Ft</p>
                    <a href="#" class="btn btn-primary">Kosárba</a>
                  </div>
                </div>`;
  
    this.szuloElem.insertAdjacentHTML("beforeend", html);
  }

  kosarbaRak(atrak, detail) {
    // Kosárba helyezés esemény létrehozása
    const customEvent = new CustomEvent(atrak, { detail: this.index });
    window.dispatchEvent(customEvent);
  }
}
