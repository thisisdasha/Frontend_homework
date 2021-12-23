import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/data/recipe';
import { initial_recipes } from 'src/data/recipe-list';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  recipes: Recipe[] = initial_recipes

  constructor() { }

  ngOnInit(): void {
  }

}
