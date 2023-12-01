import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true; //promena pro login a register aby se potom nezobrazoval navbare

  constructor() { }

  ngOnInit(): void {
  }
}
