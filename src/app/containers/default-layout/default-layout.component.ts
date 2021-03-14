import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) { }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    // TODO: implementar logout da aplicação
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
