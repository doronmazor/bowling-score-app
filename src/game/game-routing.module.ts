import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameContainerComponent } from './game-container/game-container.component';

const routes: Routes = [
  {
    path: '',
    component: GameContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
