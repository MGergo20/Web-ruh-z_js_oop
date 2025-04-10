// Kosar.js - Kosár osztály definíciója
class Kosar {
    constructor() {
      this.tetelek = [];
      this.esemenyek = {};
    }
    
    hozzaadas(termek, mennyiseg = 1) {
      // Ellenőrizzük, hogy a termék már szerepel-e a kosárban
      const meglevoTetel = this.tetelek.find(tetel => tetel.termek.id === termek.id);
      
      if (meglevoTetel) {
        meglevoTetel.mennyiseg += mennyiseg;
      } else {
        this.tetelek.push({ termek, mennyiseg });
      }
      
      this.frissites();
      this.esemenyTrigger('frissitve');
    }
    
    eltavolitas(termekId) {
      this.tetelek = this.tetelek.filter(tetel => tetel.termek.id !== termekId);
      this.frissites();
      this.esemenyTrigger('frissitve');
    }
    
    mennyisegModositasa(termekId, mennyiseg) {
      const tetel = this.tetelek.find(tetel => tetel.termek.id === termekId);
      if (tetel) {
        tetel.mennyiseg = mennyiseg;
        if (tetel.mennyiseg <= 0) {
          this.eltavolitas(termekId);
          return;
        }
      }
      
      this.frissites();
      this.esemenyTrigger('frissitve');
    }
    
    vegosszegetSzamol() {
      return this.tetelek.reduce((osszeg, tetel) => osszeg + (tetel.termek.ar * tetel.mennyiseg), 0);
    }
    
    tetelekSzama() {
      return this.tetelek.reduce((osszeg, tetel) => osszeg + tetel.mennyiseg, 0);
    }
    
    kosarUres() {
      return this.tetelek.length === 0;
    }
    
    frissites() {
      this.minikosarFrissitese();
      this.teljesKosarFrissitese();
      
      // Kosár számláló frissítése a fejlécben
      const kosarSzamlalo = document.getElementById('kosar-szamlalo');
      kosarSzamlalo.textContent = this.tetelekSzama();
    }
    
    minikosarFrissitese() {
      const kosarTetelek = document.getElementById('kosar-tetelek-mini');
      const kosarOsszesen = document.getElementById('kosar-osszesen-mini');
      
      kosarTetelek.innerHTML = '';
      
      if (this.kosarUres()) {
        kosarTetelek.innerHTML = '<p>A kosár üres</p>';
      } else {
        this.tetelek.forEach(tetel => {
          const tetelElem = document.createElement('div');
          tetelElem.className = 'mb-2 d-flex justify-content-between align-items-center';
          tetelElem.innerHTML = `
            <span>${tetel.termek.nev} (${tetel.mennyiseg} db)</span>
            <span>${tetel.termek.ar * tetel.mennyiseg} Ft</span>
          `;
          kosarTetelek.appendChild(tetelElem);
        });
      }
      
      kosarOsszesen.textContent = `${this.vegosszegetSzamol()} Ft`;
    }
    
    teljesKosarFrissitese() {
      const kosarTetelek = document.getElementById('kosar-tetelek-teljes');
      const kosarOsszesen = document.getElementById('kosar-osszesen-teljes');
      
      kosarTetelek.innerHTML = '';
      
      if (this.kosarUres()) {
        kosarTetelek.innerHTML = '<div class="alert alert-info">A kosár üres</div>';
      } else {
        // Táblázat fejléc
        const tabla = document.createElement('table');
        tabla.className = 'table table-striped';
        tabla.innerHTML = `
          <thead>
            <tr>
              <th>Termék</th>
              <th>Ár</th>
              <th>Mennyiség</th>
              <th>Összesen</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody id="kosar-tetelek-tabla"></tbody>
        `;
        
        kosarTetelek.appendChild(tabla);
        const tablaTorzs = document.getElementById('kosar-tetelek-tabla');
        
        this.tetelek.forEach(tetel => {
          const sor = document.createElement('tr');
          sor.innerHTML = `
            <td>${tetel.termek.nev}</td>
            <td>${tetel.termek.ar} Ft</td>
            <td>
              <div class="input-group input-group-sm" style="width: 120px;">
                <button class="btn btn-outline-secondary mennyiseg-csokkentes" data-id="${tetel.termek.id}">-</button>
                <input type="number" class="form-control text-center mennyiseg-input" value="${tetel.mennyiseg}" min="1" data-id="${tetel.termek.id}">
                <button class="btn btn-outline-secondary mennyiseg-noveles" data-id="${tetel.termek.id}">+</button>
              </div>
            </td>
            <td>${tetel.termek.ar * tetel.mennyiseg} Ft</td>
            <td>
              <button class="btn btn-sm btn-danger tetel-eltavolitas" data-id="${tetel.termek.id}">Törlés</button>
            </td>
          `;
          
          tablaTorzs.appendChild(sor);
        });
        
        // Eseményfigyelők hozzáadása
        this.esemenyFigyelokHozzaadasa();
      }
      
      kosarOsszesen.textContent = `${this.vegosszegetSzamol()} Ft`;
    }
    
    esemenyFigyelokHozzaadasa() {
      // Eseményfigyelők a teljes kosár nézethez
      document.querySelectorAll('.tetel-eltavolitas').forEach(gomb => {
        gomb.addEventListener('click', (e) => {
          const termekId = parseInt(e.target.dataset.id);
          this.eltavolitas(termekId);
        });
      });
      
      document.querySelectorAll('.mennyiseg-input').forEach(input => {
        input.addEventListener('change', (e) => {
          const termekId = parseInt(e.target.dataset.id);
          const mennyiseg = parseInt(e.target.value);
          this.mennyisegModositasa(termekId, mennyiseg);
        });
      });
      
      document.querySelectorAll('.mennyiseg-noveles').forEach(gomb => {
        gomb.addEventListener('click', (e) => {
          const termekId = parseInt(e.target.dataset.id);
          const tetel = this.tetelek.find(tetel => tetel.termek.id === termekId);
          if (tetel) {
            this.mennyisegModositasa(termekId, tetel.mennyiseg + 1);
          }
        });
      });
      
      document.querySelectorAll('.mennyiseg-csokkentes').forEach(gomb => {
        gomb.addEventListener('click', (e) => {
          const termekId = parseInt(e.target.dataset.id);
          const tetel = this.tetelek.find(tetel => tetel.termek.id === termekId);
          if (tetel && tetel.mennyiseg > 1) {
            this.mennyisegModositasa(termekId, tetel.mennyiseg - 1);
          }
        });
      });
    }
    
    // Egyszerű eseménykezelő rendszer
    esemenyFeliratkozas(esemenyNev, callback) {
      if (!this.esemenyek[esemenyNev]) {
        this.esemenyek[esemenyNev] = [];
      }
      this.esemenyek[esemenyNev].push(callback);
    }
    
    esemenyTrigger(esemenyNev) {
      if (this.esemenyek[esemenyNev]) {
        this.esemenyek[esemenyNev].forEach(callback => callback());
      }
    }
  }