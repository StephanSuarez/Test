import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductSelectedCardComponent } from "../../components/product-selected-card/product-selected-card.component";
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';


interface Container {
  products: any[];
}



@Component({
  selector: 'app-container',
  standalone: true,
  imports: [NavbarComponent, ProductSelectedCardComponent, DashboardComponent, CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  private apiBaseUrl: string = environment.api.url;
  container: Container = { products: [] };
  products: any[] = [];

  totalImportCost: number = 0;
  totalSellValue: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let containerCode = localStorage.getItem('containerCode');

    if (containerCode) {
      // Hacer una petición para obtener la información del contenedor
      this.http.get<Container>(`${this.apiBaseUrl}/container/${containerCode}`).subscribe(
        (container: Container) => {
          this.container = container;

          const productCodes = container.products.map(product => product.code);

          this.loadProductDetails(productCodes);
        },
        error => {
          console.error('Error al obtener el contenedor:', error);
        }
      );
    }
  }

  loadProductDetails(productCodes: string[]): void {
    this.products = [];

    productCodes.forEach(code => {
      this.http.get<any>(`${this.apiBaseUrl}/products/searchByCode?code=${code}`).subscribe(
        (productResponse: any) => {
          if (productResponse.length > 0) {
            const product = productResponse[0];
  
            // Buscar el producto en el contenedor para obtener el amount y volume
            const containerProduct = this.container.products.find(p => p.code === code);
  
            // Crear un nuevo objeto que incluya los campos adicionales
            const productWithContainerData = {
              ...product,
              amount: containerProduct ? containerProduct.ammount : 0, // Agregar el campo amount
              volume: containerProduct ? containerProduct.volume : 0   // Agregar el campo volume
            };
  
            this.products.push(productWithContainerData);
          }
        },
        error => {
          console.error(`Error al obtener el producto con código ${code}:`, error);
        }
      );
    });
  }
  
  handleProductUpdate(updatedProductData: { importCost: number; sell: number }) {
    setTimeout(() => {
      this.totalImportCost += updatedProductData.importCost;
      this.totalSellValue += updatedProductData.sell;
      console.warn('---')
      console.log('Total Import Cost:', this.totalImportCost);
      console.log('Total Sell Value:', this.totalSellValue);
    });
  }
  
}
