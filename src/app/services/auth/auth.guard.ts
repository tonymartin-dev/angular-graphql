import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private authSvc: AuthService,
		private route: Router
	) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {

		this.authSvc.checkSession().subscribe(
			() => { },
			() => {
				console.log('byebye')
				this.route.navigate(['/'])
			}
		)


		return true;
		//return this.AuthService.isLoggedIn;

	}


}
