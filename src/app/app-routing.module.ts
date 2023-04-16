import { AuthGuard } from './guard/authGuard';
import { IndexComponent } from './views/index/index.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MypageComponent } from './views/mypage/mypage.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'index', component: IndexComponent, canActivate: [AuthGuard]},
  {path:'mypage', component: MypageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
