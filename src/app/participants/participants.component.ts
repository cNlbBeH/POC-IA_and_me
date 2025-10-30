import { Component, inject } from '@angular/core';
import { ParticipantsSearchComponent } from './search/participants-search.component';
import { ParticipantsListComponent } from './list/participants-list.component';
import { ParticipantsService } from './participants.service';
import { ParticipantSearch } from '../shared/models/participant.model';
import { ParticipantInscriptionComponent } from './add/participant-inscription.component';

@Component({
  standalone: true,
  selector: 'app-participants',
  imports: [ParticipantsSearchComponent, ParticipantsListComponent, ParticipantInscriptionComponent],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
})
export class ParticipantsComponent {
  participantsService = inject(ParticipantsService);
  showNewParticipantForm = false;

  onSearchParticipant(form: ParticipantSearch) {
    this.participantsService.loadParticipants(form);
    //this.participantsService.patchCriteria(form);
  }

  onSort({
    active,
    direction,
  }: {
    active: 'lastName' | 'firstName' | 'city';
    direction: 'asc' | 'desc';
  }) {
    this.participantsService.patchCriteria({ sort: active, order: direction });
  }

  onUpdate(p: any) {
    this.participantsService.update(p.id, {
      ...p,
      lastName: p.lastName + ' (modifié)',
    });
  }

  onRemove(p: any) {
    this.participantsService.delete(p.id);
  }

  onDisplayNewParticipantForm(): void {
    this.showNewParticipantForm = true;
  }

  onCloseNewParticipantForm(): void {
    this.showNewParticipantForm = false;
  }

 /*  onDisplayNewParticipantForm(): void {
    const dialogRef = this.dialog.open(ParticipantInscriptionComponent, {
      width: '600px',
      disableClose: true,
      data: {}, // si tu veux passer des valeurs initiales
    });

    dialogRef.componentInstance.save.subscribe((participant: Participant) => {
      this.onCreate(participant);
      dialogRef.close();
    });

    dialogRef.componentInstance.close.subscribe(() => {
      dialogRef.close();
    });
  } */

  onCreate() {
    this.participantsService.create({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      phone: '+32470...',
      address: {
        street: 'Rue Démo',
        number: '1',
        postalCode: '4000',
        city: 'Liège',
      },
    });
    this.showNewParticipantForm = false;
  }
}
