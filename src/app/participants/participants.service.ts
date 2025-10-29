import { Injectable, computed, signal } from '@angular/core';
import {
  Participant,
  ParticipantSearch,
} from '../shared/models/participant.model';
import { DUMMY_PARTICIPANTS } from './dummy_participants';

interface Criteria {
  lastName?: string;
  firstName?: string;
  city?: string;
  email?: string;
  phone?: string;
  sort?: 'lastName' | 'firstName' | 'city';
  order?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class ParticipantsService {
  private _items = signal<Participant[]>([]);

  private _criteria = signal<Criteria>({ sort: 'lastName', order: 'asc' });
  private _loading = signal(false);

  /** lecture seule */
  readonly loading = this._loading.asReadonly();

  /** liste filtrée/triée (dérivation pure) */
  readonly filtered = computed(() => {
    if (!this._items()) return [];
    console.log('computed items :', this._items());
    const {
      lastName = '',
      firstName = '',
      city = '',
      email = '',
      phone = '',
      sort = 'lastName',
      order = 'asc',
    } = this._criteria();

    const lc = (v?: string) => (v ?? '').toLowerCase();

    let list = this._items().filter(
      (p) =>
        lc(p.lastName).includes(lc(lastName)) &&
        lc(p.firstName).includes(lc(firstName)) &&
        lc(p.address?.city).includes(lc(city)) &&
        lc(p.email).includes(lc(email)) &&
        lc(p.phone).includes(lc(phone))
    );

    list = [...list].sort((a, b) => {
      const av = (sort === 'city' ? a.address?.city : (a as any)[sort]) ?? '';
      const bv = (sort === 'city' ? b.address?.city : (b as any)[sort]) ?? '';
      return order === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });

    return list;
  });

  /** actions */
  loadParticipants(form: ParticipantSearch) {
    if(!form.firstName && !form.lastName && !form.email && !form.phone && !form.city)
      return this._items.set(DUMMY_PARTICIPANTS);
    const normalize = (s: string | null | undefined) => s?.trim().toLowerCase() ?? '';
    this._items.update((participants) =>
      DUMMY_PARTICIPANTS.filter(
        (p) =>
          (!form.firstName || normalize(p.firstName).includes(normalize(form.firstName))) &&
          (!form.lastName || normalize(p.lastName).includes(normalize(form.lastName))) &&
          (!form.email || normalize(p.email).includes(normalize(form.email))) &&
          (!form.phone || normalize(p.phone).includes(normalize(form.phone))) &&
          (!form.city || normalize(p.address?.city).includes(normalize(form.city)))
      )
    );
  }

  patchCriteria(patch: Partial<Criteria>) {
    this._criteria.update((c) => ({ ...c, ...patch }));
  }
  create(payload: Omit<Participant, 'id'>) {
    const id = Math.random().toString(36).slice(2, 9);
    this._items.update((items) => [{ id, ...payload }, ...items]);
  }
  update(id: string, patch: Partial<Participant>) {
    this._items.update((items) =>
      items.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }
  delete(id: string) {
    this._items.update((items) => items.filter((p) => p.id !== id));
  }
}
