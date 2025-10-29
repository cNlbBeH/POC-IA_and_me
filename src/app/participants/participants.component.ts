import { Component, inject } from '@angular/core';
import { ParticipantsSearchComponent } from './search/participants-search.component';
import { ParticipantsListComponent } from './list/participants-list.component';
import { ParticipantsStore } from './participants.service';

@Component({
  standalone: true,
  selector: 'app-participants',
  imports: [ParticipantsSearchComponent, ParticipantsListComponent],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent {
  store = inject(ParticipantsStore);

  onSearch(criteria: any) {
    this.store.patchCriteria(criteria);
  }

  onSort({ active, direction }: { active: 'lastName'|'firstName'|'city'; direction: 'asc'|'desc' }) {
    this.store.patchCriteria({ sort: active, order: direction });
  }

  onUpdate(p: any) {
    this.store.update(p.id, { ...p, lastName: p.lastName + ' (modifié)' });
  }

  onRemove(p: any) {
    this.store.delete(p.id);
  }

  addDemo() {
    this.store.create({
      firstName: 'Ada', lastName: 'Lovelace',
      email: 'ada@example.com', phone: '+32470...',
      address: { street: 'Rue Démo', number: '1', postalCode: '4000', city: 'Liège' }
    });
  }
}
