import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HistoryComponent } from './components/history/history.component';
import { AccountComponent } from './components/account/account.component';
import { PlanComponent } from './components/plan/plan.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashComponent } from './components/dash/dash.component';

const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'plan', component: PlanComponent},
  {path: 'account', component: AccountComponent},
  {path: 'activity', component: ProfileComponent},
  { path: 'users/:userId', component: ProfileComponent },
  { path: 'carbon', component: DashComponent },
  {path: '', redirectTo: 'map', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
