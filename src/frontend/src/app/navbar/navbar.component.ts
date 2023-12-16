import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true; //promena pro login a register aby se potom nezobrazoval navbare
  userInfo: any;
  constructor(private session: SessionService) { }

  ngOnInit(): void {
    this.userInfo = this.session.getUserSession();
  }
}
