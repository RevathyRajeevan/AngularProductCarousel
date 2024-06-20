import { Component } from '@angular/core';
import { Product } from '../../models/products.interface';
import { category } from '../../models/category.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Product[] = [];
  category:category[]=[];
  
 
  constructor() {
    this.fetchData();
  }
 
  async fetchData() {
    const url = 'https://dummyjson.com/products';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      const products=data.products
      this.products=products
      const beauty_products = data.products.filter(
        (product: Product) => product.category === 'beauty'
      );
      const grocery_products = data.products.filter(
        (product: Product) => product.category === 'groceries'
      );
      const fragrance_products = data.products.filter(
        (product: Product) => product.category === 'fragrances'
      );
      const furniture_products = data.products.filter(
        (product: Product) => product.category === 'furniture'
      );
      this.category = [
        {
          name: 'Beauty Products',
          product: beauty_products,
        },
        {
          name: 'Grocery Products',
          product: grocery_products,
        },
        {
          name: 'Fragrance Products',
          product: fragrance_products,
        },
        {
          name: 'Furniture Products',
          product: furniture_products,
        },
      ];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}}
