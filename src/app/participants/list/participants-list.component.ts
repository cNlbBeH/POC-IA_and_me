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

  edit(participantId: string){
    console.log("Edit:", participantId);
  }

  delete(participantId: string){
    console.log("Delete:", participantId);
  }
}
