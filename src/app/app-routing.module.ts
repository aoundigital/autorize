import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';

// const redirectUnauthorizeToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfile = () => map(user => user ? ['profile', (user as any). uid]: true);
const onlyAllowSelf = next => map(
  user => (!!user && next.params.id == (user as any).uid) || ['']
);

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectLoggedInToProfile} //redireciona se estiver logado para a pagina de profile.
},{
  path: 'profile/:id',
  component: ProfileComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: onlyAllowSelf } //redireciona se não estiver logado para a pagina de login.
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
