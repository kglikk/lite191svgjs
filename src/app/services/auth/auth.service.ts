
import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: 'http://localhost:5000/callback', // https://electrisimvs.azurewebsites.net/
    
    scope: 'openid profile',      
  });

  userProfile: any;

  constructor(private router: Router) {
    /*
    // If authenticated, set local profile property and update login status subject
    // If token is expired, log out to clear any data from localStorage
    if (this.isAuthenticated()) {
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      //this.setLoggedIn(true);
    } else {
      this.logout();
    } */
  }
  
  public login(): void {
    this.auth0.authorize();
    
  }


  

  public handleAuthentication(): void {
    
    
    this.auth0.parseHash((err, authResult) => {
      
      if (authResult && authResult.accessToken && authResult.idToken) {
      
        window.location.hash = ''; 
        this._getProfile(authResult);
       // this.setSession(authResult);
       setTimeout( () => this.router.navigate(['/home']), 500); //nie za dobre rozwiązanie pewnie
       // this.router.navigate(['/home']);

       //this._getProfile(authResult);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });  
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this.setSession(authResult, profile);
    });
  }

  requestedScopes: string = 'openid profile read:timesheets create:timesheets';

  private setSession(authResult,profile): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem('access_token', authResult.accessToken);
    
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile; 

    //alert(localStorage.getItem('profile'));
    
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
    this.userProfile = undefined;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  //public getCurrentUser(authResult): number
  get currentUser() {
    let token = localStorage.getItem('id_token');
    if(!token) return null;

    
    //return new jwtHelper().decodeToken(token);

  }
    
  

}