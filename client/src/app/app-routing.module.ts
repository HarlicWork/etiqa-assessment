import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './users/register/register.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:userId', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
