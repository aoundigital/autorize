import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  action: 'login' | 'signup' = 'login';
  error: string;

  constructor(private afAuth: AngularFireAuth, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm){
    this.loading = true;
    this.error = null;
    const { email, password, firstName, lastName } = form.value;

    let resp;
    try {
      if (this.isSignUp) {
        resp = await this.afAuth.createUserWithEmailAndPassword(email, password); // cria o novo usuário
        await resp.user.updateProfile({ displayName: `${firstName} ${lastName}`});
        await this.auth.createUserDocument();
        form.reset(); //limpa o formulário
      } else {
        resp = await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      const uid = resp.user.uid; //id do usuário
      this.router.navigate([`/profile/${uid}`]); //se da certo vai para página de profile/id
    } catch (error) {
      console.log('erro:' , error.message);
      this.error = error.message;
    }
    this.loading = false;
  }

  get isLogin() {
    return this.action === 'login';
    console.log(this.action);

  }

  get isSignUp() {
    return this.action === 'signup';
    console.log(this.action);
  }


}
