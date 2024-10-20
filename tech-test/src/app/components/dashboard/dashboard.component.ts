import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() totalImportCost: number = 0;
  @Input() totalSellValue: number = 0;

  tImportCost: number = 0;
  tSellValue: number = 0;

  importCosts = {
    fleteMaritimo: 0,
    documentacion: 0,
    seguroCarga: 0,
    demoras: 0,
    transporteTerrestre: 0,
    manejo: 0,
    iva: 0,
    aranceles: 0,
    agenteAduanero: 0,
    comisionSticky: 0
  };

  totalImportCostContainer: number = 0;

  ngOnInit() {
    this.tImportCost = this.totalImportCost;
    this.tSellValue = this.totalSellValue;
    this.generateRandomImportCosts();
    this.calculateTotalImportCost();
  }

  // Detectamos cambios en los @Input
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalImportCost'] && changes['totalImportCost'].currentValue !== changes['totalImportCost'].previousValue) {
      this.tImportCost = changes['totalImportCost'].currentValue;
      this.generateRandomImportCosts(); // Genera nuevos costos en función del nuevo total de importación
      this.calculateTotalImportCost();  // Recalcula el costo total
    }

    if (changes['totalSellValue'] && changes['totalSellValue'].currentValue !== changes['totalSellValue'].previousValue) {
      this.tSellValue = changes['totalSellValue'].currentValue;
    }
  }

  generateRandomImportCosts() {
    this.importCosts.fleteMaritimo = 0.0025 * this.tImportCost;
    this.importCosts.documentacion = 0.0015 * this.tImportCost;
    this.importCosts.seguroCarga = 0.0025 * this.tImportCost;
    this.importCosts.demoras = 0.001 * this.tImportCost;
    this.importCosts.transporteTerrestre = 0.055 * this.tImportCost;
    this.importCosts.manejo = 0.005 * this.tImportCost;
    this.importCosts.iva = 0.005 * this.tImportCost;
    this.importCosts.aranceles = 0.025 * this.tImportCost;
    this.importCosts.agenteAduanero = 0.025 * this.tImportCost;
    this.importCosts.comisionSticky = 0.001 * this.tImportCost;
  }

  calculateTotalImportCost() {
    this.totalImportCostContainer = Object.values(this.importCosts).reduce((sum, cost) => sum + cost, 0);
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
