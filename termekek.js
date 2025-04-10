class Termekek {
  constructor() {
    this.termekLista = [];
    this.kosarLista = [];
  }

  megjelenit() {
    // Termékek listájának megjelenítése
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
