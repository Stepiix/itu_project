import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
    this.session.userSession$.subscribe(userSession => {
      this.userInfo = userSession;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo']) {
      this.userInfo = changes['userInfo'].currentValue;
    }
  }
}
