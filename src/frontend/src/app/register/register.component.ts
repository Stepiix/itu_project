import { Router } from '@angular/router';
import { AuthserviceService } from './../services/authservice.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authserviceService: AuthserviceService, private router: Router, private session: SessionService) {
    this.registrationForm = this.formBuilder.group({
      user_firstname: ['', Validators.required],
      user_lastname: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', Validators.required] //tady by se jeste mohl pridat neco ze treba heslo musi byt dlouhe aspon 6 pismen
    });
  }

  onSubmit() {
    if (this.registrationForm && this.registrationForm.valid) {
      this.authserviceService.register(this.registrationForm.value).subscribe(
        (response) => {
          console.log('Registrace proběhla úspěšně', response);
          console.log("id: ", response.user.id);
          console.log("jmeno: ", response.user.user_firstname);
          console.log("prijmeni: ", response.user.user_lastname);
          console.log("email: ", response.user.user_email)  ;
          
          this.session.startUserSession(response.user.id, response.user.user_firstname, response.user.user_lastname, response.user.user_email);
          alert("uspesne ses prihlasil");//TODO vylepsit
          this.router.navigate(['/']);

          // Provedení dalších akcí po úspěšné registraci, například přesměrování na jinou stránku nebo zobrazení potvrzující zprávy
          // this.router.navigate(['/success-page']); // Přesměrování
          // this.showSuccessMessage = true; // Zobrazení potvrzující zprávy
        },
        (error) => {
          console.error('Chyba při registraci', error);
          // Zde můžete zpracovat chybu, například zobrazením chybové zprávy uživateli
          // this.errorMessage = 'Chyba při registraci: ' + error.message;
        }
      );
    }
  }
}
