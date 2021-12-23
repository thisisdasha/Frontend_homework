import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "recipe-details/:name", component: RecipeDetailsComponent },
      { path: "shopping-list", component: ShoppingListComponent },
      { path: "", redirectTo: "/recipe-details/kekw", pathMatch: "full" },
    ]),
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
