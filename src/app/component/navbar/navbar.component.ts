import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() title!: string;

  constructor(
    private readonly router: Router,
  ){}
  
  navigate(path: string){
    this.router.navigate([path]);
  }
}
