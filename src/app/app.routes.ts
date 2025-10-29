import { Routes } from '@angular/router';
import { ParticipantsComponent } from './participants/participants.component';

export const routes: Routes = [
  { path: '', component: ParticipantsComponent },
  { path: '**', redirectTo: '' }
];
