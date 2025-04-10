// WebAruhaz.js - Fő vezérlő osztály
class WebAruhaz {
    constructor() {
      this.katalogus = new TermekKatalogus([]);
      this.kosar = new Kosar();
      this.init();
    }
    
    init() {
      // Kezdeti termékek betöltése
      this.termekekBetoltese();
      
      // Nézetek kezelése
      this.nezetekKezelesenek();
      
      // Eseményfigyelők beállítása
      this.esemenyekBeallitasa();
      
      // Kezdeti nézetek renderelése
      this.termeklistaRenderelese();
      this.kategoriakRenderelese();
      
      // Kosár eseményfigyelők
      this.kosarEsemenyekBeallitasa();
    }
    
    termekekBetoltese() {
      // Termékek betöltése a termekAdatok listából
      termekAdatok.forEach(adat => {
        const termek = new Termek(
          adat.id,
          adat.nev,
          adat.ar,
          adat.leiras,
          adat.kep,
          adat.kategoria
        );
        this.katalogus.termekHozzaadasa(termek);
      });
    }
    
    nezetekKezelesenek() {
      const termeklistaGomb = document.getElementById('termeklista-gomb');
      const kosarGomb = document.getElementById('kosar-gomb');
      const termekekNezet = document.getElementById('termekek-nezet');
      const kosarNezet = document.getElementById('kosar-nezet');
      const kosarMegtekintesGomb = document.getElementById('kosar-megtekintese-gomb');
      
      // Termék lista gomb
      termeklistaGomb.addEventListener('click', () => {
        termekekNezet.classList.remove('hidden');
        kosarNezet.classList.add('hidden');
        termeklistaGomb.classList.add('active');
        kosarGomb.classList.remove('active');
      });
      
      // Kosár gomb a fejlécben
      kosarGomb.addEventListener('click', () => {
        this.kosarNezetMegjelenites();
      });
      
      // "Kosár megtekintése" gomb az oldalsávban
      kosarMegtekintesGomb.addEventListener('click', () => {
        this.kosarNezetMegjelenites();
      });
    }
    
    kosarNezetMegjelenites() {
      const termekekNezet = document.getElementById('termekek-nezet');
      const kosarNezet = document.getElementById('kosar-nezet');
      const termeklistaGomb = document.getElementById('termeklista-gomb');
      const kosarGomb = document.getElementById('kosar-gomb');
      
      termekekNezet.classList.add('hidden');
      kosarNezet.classList.remove('hidden');
      termeklistaGomb.classList.remove('active');
      kosarGomb.classList.add('active');
      
      // Frissítsük a kosár nézetet
      this.kosar.teljesKosarFrissitese();
    }
    
    esemenyekBeallitasa() {
      // Keresés input
      document.getElementById('kereses-input').addEventListener('input', (e) => {
        this.katalogus.keresesNevSzerint(e.target.value);
        this.termeklistaRenderelese();
      });
      
      // Kategória szűrő
      document.getElementById('kategoria-szuro').addEventListener('change', (e) => {
        this.katalogus.szuresKategoriaSzerint(e.target.value);
        this.termeklistaRenderelese();
      });
      
      // Vásárlás gomb
      document.getElementById('vasarlas-gomb').addEventListener('click', () => {
        if (!this.kosar.kosarUres()) {
          alert('Köszönjük a vásárlást! A rendelést feldolgoztuk.');
          // Itt lehetne tovább vinni a vásárlás folyamatát
        } else {
          alert('A kosár üres, kérjük válasszon termékeket!');
        }
      });
    }
    
    kosarEsemenyekBeallitasa() {
      // Feliratkozás a kosár frissítési eseményére
      this.kosar.esemenyFeliratkozas('frissitve', () => {
        this.termeklistaRenderelese();
      });
    }
    
    termeklistaRenderelese() {
      const termekListaElem = document.getElementById('termek-lista');
      termekListaElem.innerHTML = '';
      
      this.katalogus.szurtTermekek.forEach(termek => {
        const termekElem = document.createElement('div');
        termekElem.className = 'col-md-4 mb-4';
        termekElem.innerHTML = `
          <div class="card">
            <img src="${termek.kep}" class="card-img-top" alt="${termek.nev}">
            <div class="card-body">
              <h5 class="card-title">${termek.nev}</h5>
              <p class="card-text">${termek.leiras}</p>
              <p class="card-text">${termek.ar} Ft</p>
              <button class="btn btn-primary kosar-hozzaadas" data-id="${termek.id}">Kosárba</button>
            </div>
          </div>
        `;
        
        termekListaElem.appendChild(termekElem);
      });
      
      // Eseményfigyelők hozzáadása a "Kosárba" gombokhoz
      document.querySelectorAll('.kosar-hozzaadas').forEach(gomb => {
        gomb.addEventListener('click', (e) => {
          const termekId = parseInt(e.target.dataset.id);
          const termek = this.katalogus.termekek.find(t => t.id === termekId);
          if (termek) {
            this.kosar.hozzaadas(termek);
          }
        });
      });
    }
    
    kategoriakRenderelese() {
      const kategoriaSzuro = document.getElementById('kategoria-szuro');
      kategoriaSzuro.innerHTML = '<option value="mind">Összes kategória</option>';
      
      this.katalogus.kategoriakLekerdezese().forEach(kategoria => {
        const opcio = document.createElement('option');
        opcio.value = kategoria;
        opcio.textContent = kategoria;
        kategoriaSzuro.appendChild(opcio);
      });
    }
  }