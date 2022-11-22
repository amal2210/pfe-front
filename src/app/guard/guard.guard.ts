import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { HeaderComponent } from '../components/header/header.component';
@Injectable({
  providedIn: 'root'
})

//Guards" permettent de contrôler l'accès à une "route" 
//Une "Guard" d'activation est un service qui implémente l'interface CanActivate.
export class GuardGuard implements CanActivate {

  constructor(private router: Router, private authentifier: AuthServiceService) {

  }

  canActivate(): boolean {
    //Cette méthode est appelée à chaque demande d'accès à la "route" 
    //indiquant si l'accès à la "route" est autorisé ou non.

    if (localStorage.getItem('state') == "1") {

      return true;

    } else {

      this.router.navigateByUrl("/")


      return false;
    }

  }


}












