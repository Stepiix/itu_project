import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthserviceService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required]]
    });
  }

  prihlasit(): void {
    if (this.form.valid) {
      const credentials = {
        email: this.form.value.user_email,
        password: this.form.value.user_password
      };

      this.auth.login(credentials).subscribe(
        (response) => {
          // Zde můžete zpracovat odpověď z přihlašovacího požadavku
          console.log('Uživatel byl úspěšně přihlášen:', response);
        },
        (error) => {
          // Zde můžete zpracovat chybu při přihlášení
          console.error('Chyba při přihlašování:', error);
        }
      );
    }
  }
}
