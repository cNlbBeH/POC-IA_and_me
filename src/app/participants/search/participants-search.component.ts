import { Component, inject, output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParticipantsService } from '../participants.service';

@Component({
  standalone: true,
  selector: 'app-participants-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './participants-search.component.html',
  styleUrls: ['./participants-search.component.css'],
})
export class ParticipantsSearchComponent {
  private participantsService = inject(ParticipantsService);

  form = new FormGroup({
    lastName: new FormControl('', [Validators.maxLength(50)]),
    firstName: new FormControl('', [Validators.maxLength(50)]),
    city: new FormControl('', [Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
  });

  searchParticipant() {
    this.participantsService.loadParticipants({
      lastName: this.form.controls.lastName.value ?? '',
      firstName: this.form.controls.firstName.value ?? '',
      city: this.form.controls.city.value ?? '',
      email: this.form.controls.email.value ?? '',
      phone: this.form.controls.phone.value ?? '',
    });
  }

  reset() {
    this.form.reset();
  }
}
