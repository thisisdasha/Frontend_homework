import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/data/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  service: ShoppingListService;

  constructor(service: ShoppingListService) {
    this.service = service;
    this.ingredients = service.ingredients;
  }

  ngOnInit(): void {
    this.service.subject.subscribe((value) => this.ingredients=value);
  }

  addSecretIngredient() {
    const name = window.prompt("Добавить продукт", "Введите название продукта");
    const quantity = parseInt(window.prompt("Количество", "1"));
    if (!name){
      window.alert('Вы не ввели название продукта');
      return; 
    }
    if (quantity <= 0 || isNaN(quantity)){
      window.alert('Некорректное количество');
      return; 
    }
    this.service.add(name, quantity);
  }

  increaseQuantity(ingredient: Ingredient) {
    this.service.changeQuantity(ingredient.name, ingredient.quantity + 1);
  }

  decreaseQuantity(ingredient: Ingredient) {
    this.service.changeQuantity(ingredient.name, ingredient.quantity - 1);
  }

  remove(ingredient: Ingredient) {
    this.service.remove(ingredient.name);
  }
}
