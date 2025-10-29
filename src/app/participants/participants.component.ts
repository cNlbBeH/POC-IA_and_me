import { Component, inject } from '@angular/core';
import { ParticipantsSearchComponent } from './search/participants-search.component';
import { ParticipantsListComponent } from './list/participants-list.component';
import { ParticipantsService } from './participants.service';
import { ParticipantSearch } from '../shared/models/participant.model';

@Component({
  standalone: true,
  selector: 'app-participants',
  imports: [ParticipantsSearchComponent, ParticipantsListComponent],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent {
  participantsService = inject(ParticipantsService);

  onSearchParticipant(form: ParticipantSearch) {
    this.participantsService.loadParticipants(form);
    //this.participantsService.patchCriteria(form);
  }

  onSort({ active, direction }: { active: 'lastName'|'firstName'|'city'; direction: 'asc'|'desc' }) {
    this.participantsService.patchCriteria({ sort: active, order: direction });
  }

  onUpdate(p: any) {
    this.participantsService.update(p.id, { ...p, lastName: p.lastName + ' (modifié)' });
  }

  onRemove(p: any) {
    this.participantsService.delete(p.id);
  }

  onDisplayNewParticipantForm(){
    // Code ici pour afficher le formulaire dans la modale
  }

  onCreate() {
    this.participantsService.create({
      firstName: 'Ada', lastName: 'Lovelace',
      email: 'ada@example.com', phone: '+32470...',
      address: { street: 'Rue Démo', number: '1', postalCode: '4000', city: 'Liège' }
    });
  }
}
