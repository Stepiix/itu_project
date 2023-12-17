import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loginFailed = false;

  constructor(private fb: FormBuilder, private auth: AuthserviceService, private session: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required]]
    });
  }

  async prihlasit(): Promise<void> {
    this.loginFailed = false;

    if (this.form.valid) {
      const credentials = {
        email: this.form.value.user_email,
        password: this.form.value.user_password
      };

      this.auth.login(credentials).subscribe(
        (response) => {
          console.log('Uživatel byl úspěšně přihlášen:', response);
          console.log('uzivatelo id je: ' + response.user.user_id);
          console.log('uzivatelovo jmeno je: ' + response.user.user_firstname);
          console.log('uzivatelovo prijmeni je: ' + response.user.user_lastname);
          console.log('uzivateluv email je: ' + response.user.user_email);
          console.log('fotka -----------',response.user.user_photo )
          this.session.startUserSession(response.user.user_id, response.user.user_firstname, response.user.user_lastname, response.user.user_email, response.user.user_photo);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Chyba při přihlašování:', error);
          this.loginFailed = true;
        }
      );
    }
  }
}
