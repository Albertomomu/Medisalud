import {Injectable} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
         signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private auth: Auth) {}

    register(email, password){
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email, password){
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    loginWithGoole() {
        return signInWithPopup(this.auth, new GoogleAuthProvider());
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

}
