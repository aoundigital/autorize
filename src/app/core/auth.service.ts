import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProfile } from './user-profile.model'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

  isLoggedIn() {
    return !!this.afAuth.currentUser;
  }

  async createUserDocument() {
    //pegar usuário
    const user = await this.afAuth.currentUser;
    //criar objeto com os novos dados
    const userProfile: UserProfile = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      specialty: '',
      ip: ''
    };

    //inserir no banco do firebase os dados
    return this.afs.doc(`users/${user.uid}`).set(userProfile);
  }

  updateUserDocument(userProfile: UserProfile){
    return this.afs.doc(`users/${userProfile.uid}`).update(userProfile);
  }
}
