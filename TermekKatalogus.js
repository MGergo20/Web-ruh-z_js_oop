// TermekKatalogus.js - TermekKatalogus osztály definíciója
class TermekKatalogus {
    constructor(termekek = []) {
      this.termekek = termekek;
      this.szurtTermekek = [...termekek];
    }
    
    termekHozzaadasa(termek) {
      this.termekek.push(termek);
      this.szurtTermekek = [...this.termekek];
    }
    
    keresesNevSzerint(kereses) {
      if (!kereses) {
        this.szurtTermekek = [...this.termekek];
      } else {
        this.szurtTermekek = this.termekek.filter(termek => 
          termek.nev.toLowerCase().includes(kereses.toLowerCase())
        );
      }
      return this.szurtTermekek;
    }
    
    szuresKategoriaSzerint(kategoria) {
      if (!kategoria || kategoria === 'mind') {
        this.szurtTermekek = [...this.termekek];
      } else {
        this.szurtTermekek = this.termekek.filter(termek => 
          termek.kategoria === kategoria
        );
      }
      return this.szurtTermekek;
    }
    
    kategoriakLekerdezese() {
      return [...new Set(this.termekek.map(termek => termek.kategoria))];
    }
  }