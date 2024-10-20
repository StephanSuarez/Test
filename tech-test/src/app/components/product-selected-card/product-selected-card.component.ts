import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-selected-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-selected-card.component.html',
  styleUrls: ['./product-selected-card.component.css']
})
export class ProductSelectedCardComponent implements OnInit {
  @Input() product: any[] = []; 
  @Output() productUpdated = new EventEmitter<any>();

  quantity: number = 140;
  suggestedPrice: number = 6;

  undCost:number = 0;
  undMarg:number = 0.0;
  perMarg:number = 0;

  ngOnInit() {
    if (this.product.length > 0) {
        const product = this.product[0];
        this.quantity = product.amount;

        this.undCost = parseFloat(product.import_cost.toFixed(2));
        this.suggestedPrice = parseFloat((this.undCost + (this.undCost * 30 / 100)).toFixed(2));
        this.undMarg = parseFloat((this.suggestedPrice - this.undCost).toFixed(2));
        this.perMarg = parseFloat(((this.undMarg / this.suggestedPrice) * 100).toFixed(2));
    } else {
        console.warn('El producto no está disponible o está vacío.');
    }

    this.emitProductData();
  }

  emitProductData() {
    console.warn('---')
    console.log(this.undCost * this.quantity,)
    this.productUpdated.emit({
      importCost: this.undCost * this.quantity,
      sell: this.suggestedPrice * this.quantity
    });
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
    this.emitProductData()
  }

  increaseQuantity() {
    this.quantity++;
    this.emitProductData()
  }

  onQuantityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.quantity = parseInt(input.value, 10);
    this.emitProductData();
  }

  onSuggestedPriceChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.suggestedPrice = parseFloat(input.value);
    this.emitProductData();
  }
}
