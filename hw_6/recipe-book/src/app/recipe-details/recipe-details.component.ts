import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/data/recipe';
import { initial_recipes } from 'src/data/recipe-list';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  activatedRoute: ActivatedRoute;
  recipe: Recipe;
  service: ShoppingListService;

  constructor(activatedRoute: ActivatedRoute, service: ShoppingListService) {
    this.activatedRoute = activatedRoute;
    this.service = service;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const name = params["name"];
      this.recipe = initial_recipes.find((recipe) => recipe.name == name);
    });
  }

  addToShoppingList() {
    for (const ingredient of this.recipe.ingredients){
      this.service.add(ingredient.name, ingredient.quantity);
    }
  }
}
