import { Component, EventEmitter, HostListener, inject, output, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Participant } from '../../shared/models/participant.model';
import { Router } from '@angular/router';

// --- Custom validator: code postal BE 4 chiffres et >= 1000
function bePostalCodeValidator(ctrl: AbstractControl): ValidationErrors | null {
  const raw = (ctrl.value ?? '').toString().trim();
  if (!raw) return null; // laisser 'required' gérer le vide
  // 4 chiffres
  if (!/^\d{4}$/.test(raw)) return { postalFormat: true };
  const n = Number(raw);
  if (n < 1000 || n > 9999) return { postalRange: true };
  return null;
}

// --- Numéro: ex. 12, 12A, 12/3, 12-b, 12B/4 ...
// Au minimum: commence par un nombre, puis optionnel suffixe alphanumérique, slash, tiret, espace.
const HOUSE_NUMBER_REGEX = /^\d+\s*[A-Za-z]?(?:[\/\-]\s*\d+[A-Za-z]?)?$/;

@Component({
  selector: 'app-participant-inscription',
  templateUrl: './participant-inscription.component.html',
  styleUrls: ['./participant-inscription.component.css'],
  imports: [ReactiveFormsModule],
})
export class ParticipantInscriptionComponent {
  private router = inject(Router);

  @HostListener('document:keydown.escape') onEsc() { this.close(); }
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [''],
      phone: [''],
      email: ['', Validators.email],
      preferredCommunication: ['email'],
      address: this.fb.group({
        street: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(2)],
        }),
        number: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.pattern(HOUSE_NUMBER_REGEX),
          ],
        }),
        postalCode: this.fb.control('', {
          validators: [Validators.required, bePostalCodeValidator],
        }),
        city: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(2)],
        }),
      }),
    });
  }


 // Accès par 'controls["email"]' comme tu veux :
  get c() {
    return this.form.controls;
  }

  close(): void {
    this.router.navigate(['/participants'], {
      replaceUrl: true,
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const participant: Participant = {
      id: '', // généré côté parent ou backend
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      birthDate: this.form.controls['birthDate'].value,
      phone: this.form.controls['phone'].value,
      email: this.form.controls['email'].value,
      preferredCommunication:
        this.form.controls['preferredCommunication'].value,
      address: {
        street: this.form.controls['address'].value.street,
        number: this.form.controls['address'].value.number,
        postalCode: this.form.controls['address'].value.postalCode,
        city: this.form.controls['address'].value.city,
      },
    };
  }
}
