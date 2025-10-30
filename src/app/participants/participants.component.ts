import { Component } from '@angular/core';
import { ParticipantsSearchComponent } from './search/participants-search.component';
import { ParticipantsListComponent } from './list/participants-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-participants',
  imports: [
    ParticipantsSearchComponent,
    ParticipantsListComponent,
    RouterLink,
    RouterOutlet
],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
})
export class ParticipantsComponent {}
