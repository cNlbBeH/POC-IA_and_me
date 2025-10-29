import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-participants-search',
  imports: [FormsModule],
  templateUrl: './participants-search.component.html',
  styleUrls: ['./participants-search.component.css']
})
export class ParticipantsSearchComponent {
  lastName = ''; firstName = ''; city = ''; email = ''; phone = '';
  readonly search = output<any>();

  emit() {
    this.search.emit({
      lastName: this.lastName,
      firstName: this.firstName,
      city: this.city,
      email: this.email,
      phone: this.phone
    });
  }

  reset() {
    this.lastName = this.firstName = this.city = this.email = this.phone = '';
    this.emit();
  }
}
