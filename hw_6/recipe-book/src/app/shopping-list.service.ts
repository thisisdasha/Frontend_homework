import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/data/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  subject: Subject<Ingredient[]> = new Subject<Ingredient []>();
  ingredients: Ingredient[] = [];

  constructor() {
  }

  add(name: string, quantity: number) {
    this.ingredients = [...this.ingredients, {name, quantity}];
    this.removeDublicates();
    this.subject.next(this.ingredients);
  }

  remove(name: string) {
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.name != name);
    this.subject.next(this.ingredients);
  }

  changeQuantity(name: string, new_quantity: number) {
    if (new_quantity <= 0){
      this.remove(name);
      return;
    }
    const ingredient = this.ingredients.find((ingredient) => ingredient.name == name)
    ingredient.quantity = new_quantity;
    this.subject.next(this.ingredients);
  }

  removeDublicates() {
    const unique_ingredients_index: Map<string, number> = new Map<string, number>();
    const unique_ingredients: Ingredient[] = [];
    for (const ingredient of this.ingredients) {
      if (!unique_ingredients_index.has(ingredient.name)){
        unique_ingredients_index.set(ingredient.name, unique_ingredients.length);
        unique_ingredients.push({
          name: ingredient.name,
          quantity: 0,
        })
      }
      const index = unique_ingredients_index.get(ingredient.name);
      unique_ingredients[index].quantity += ingredient.quantity;
    }
    this.ingredients = unique_ingredients;
  }
}
