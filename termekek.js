import Termek from "./Termek.js";

export default class Termekek {
  constructor(termekLista) {
    this.termekLista = termekLista;
    this.kosarLista = [];
    this.megjelenit();
  }

  megjelenit() {
    for (let index = 0; index < this.termekLista.length; index++) {
      const elem = this.termekLista[index];
      new Termek(index, elem);
    }
  }

  keresesNevSzerint(nev) {
    // Keresési logika név szerint
  }

  termekHozzaadas(event) {
    // Termék hozzáadása a listához
  }

  kosarMegjelenit() {
    // Kosár megjelenítése
  }

  vegOsszeg() {
    // Végösszeg kiszámítása
    return this.kosarLista.reduce((sum, item) => sum + item.ar, 0);
  }
}
