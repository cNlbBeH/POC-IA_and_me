import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Participant } from '../../shared/models/participant.model';

@Component({
  selector: 'app-participant-inscription',
  templateUrl: './participant-inscription.component.html',
  styleUrls: ['./participant-inscription.component.css'],
  imports:[ReactiveFormsModule]
})
export class ParticipantInscriptionComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Participant>();

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
        street: [''],
        number: [''],
        postalCode: [''],
        city: ['']
      })
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  onSave(): void {
    if (this.form.invalid) return;

    const participant: Participant = {
      id: '', // généré côté parent ou backend
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      birthDate: this.form.controls['birthDate'].value,
      phone: this.form.controls['phone'].value,
      email: this.form.controls['email'].value,
      preferredCommunication: this.form.controls['preferredCommunication'].value,
      address: {
        street: this.form.controls['address'].value.street,
        number: this.form.controls['address'].value.number,
        postalCode: this.form.controls['address'].value.postalCode,
        city: this.form.controls['address'].value.city
      }
    };

    this.save.emit(participant);
  }
}
