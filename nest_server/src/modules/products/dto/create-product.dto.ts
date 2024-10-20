export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly stock: number;
  readonly import_cost: number;
  readonly category: string;
  readonly keywords: string[];
  readonly images: string[];
}
