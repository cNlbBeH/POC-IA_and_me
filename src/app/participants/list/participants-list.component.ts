import { Component, inject } from '@angular/core';
import { input, output } from '@angular/core';
import { ParticipantsService } from '../participants.service';

@Component({
  standalone: true,
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css'],
})
export class ParticipantsListComponent {
  private participantsService = inject(ParticipantsService);
  readonly participants = this.participantsService.filtered;
  readonly loading = input(false);

  readonly sortChange = output<{ active: 'lastName'|'firstName'|'city'; direction: 'asc'|'desc' }>();
  readonly update = output<any>();
  readonly remove = output<any>();

  private lastActive: 'lastName'|'firstName'|'city' = 'lastName';
  private lastDir: 'asc'|'desc' = 'asc';

  sort(col: 'lastName'|'firstName'|'city') {
    if (this.lastActive === col) this.lastDir = this.lastDir === 'asc' ? 'desc' : 'asc';
    else { this.lastActive = col; this.lastDir = 'asc'; }
    this.sortChange.emit({ active: this.lastActive, direction: this.lastDir });
  }
}
