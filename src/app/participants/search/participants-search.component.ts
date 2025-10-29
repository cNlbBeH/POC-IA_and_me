import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-participants-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './participants-search.component.html',
  styleUrls: ['./participants-search.component.css']
})
export class ParticipantsSearchComponent {
  form = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    city: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });

  search = output<any>();

  searchParticipant() {
    this.search.emit({
      lastName: this.form.controls.lastName.value,
      firstName: this.form.controls.firstName.value,
      city: this.form.controls.city.value,
      email: this.form.controls.email.value,
      phone: this.form.controls.phone.value
    });
  }

  reset() {
    this.form.reset();
    this.searchParticipant();
  }
}
