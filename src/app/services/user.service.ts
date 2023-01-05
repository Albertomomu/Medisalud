import {Injectable} from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
         signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, getAuth,
         signInWithCredential } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user: any;
    type: string;

    constructor(private auth: Auth) {}

    getMobileOperatingSystem() {
        const userAgent = navigator.userAgent;

        if (/android/i.test(userAgent)) {
            this.type = 'android';
        }else{
            this.type = 'web';
        }
    }

    register(email, password){
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email, password){
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    /* loginWithGoole() {
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    } */

    async loginWithGoole() {
    this.getMobileOperatingSystem();
    if(this.type === 'android'){
        const response = await GoogleAuth.signIn();
        const idToken = response.authentication.idToken;
        const credential = GoogleAuthProvider.credential(idToken);
        return signInWithCredential(this.auth, credential);
    }else{
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }

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
