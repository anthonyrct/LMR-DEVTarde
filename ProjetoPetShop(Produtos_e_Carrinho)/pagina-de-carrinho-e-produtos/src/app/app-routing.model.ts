import { NgModule } from'@angular/core';
import { RouterModule, Routes } from'@angular/router';
import { FinalizarComponent } from './finalizar/finalizar.component';
import { ProdutosComponent } from './produtos/produtos.component';


const routes: Routes = [
{ path: 'finalizar', component: FinalizarComponent },
{ path: 'produtos', component: ProdutosComponent },
{ path: "",redirectTo:'index', pathMatch: 'full' },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule {}