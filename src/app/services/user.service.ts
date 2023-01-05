import {Injectable} from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
         signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, getAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user: any;

    constructor(private auth: Auth) {}

    register(email, password){
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email, password){
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    /* loginWithGoole() {
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    } */

    loginWithGoole() {
    return GoogleAuth.signIn();
/*     const credential = this.auth.credential(googleUser);
    return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential); */
  }

    loginWithGithub() {
        return signInWithPopup(this.auth, new GithubAuthProvider());
    }

    loginWithFacebook() {
        return signInWithPopup(this.auth, new FacebookAuthProvider());
    }

    logout() {
        return signOut(this.auth);
    }

    getAuth() {
        return getAuth();
    }

}
