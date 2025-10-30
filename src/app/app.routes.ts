import { Routes } from '@angular/router';
import { ParticipantsComponent } from './participants/participants.component';
import { ParticipantInscriptionComponent } from './participants/add/participant-inscription.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
    path: '',
    component: AppComponent,
    title: 'Activ\'Senior',
  },
  {
    path: 'participants',
    component: ParticipantsComponent,
    children: [
      {
        path: 'new',
        component: ParticipantInscriptionComponent,
       // canDeactivate: [canLeaveEditPage]
      },
    ],
    title: 'Participants',
  },
  { path: '**', redirectTo: '' },
];
