export interface Address { street: string; number: string; postalCode: string; city: string; }
export type PreferredCommunication = 'sms'|'email'|'postal';

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  address?: Address;
  phone?: string;
  email?: string;
  preferredCommunication?: PreferredCommunication;
}

export interface ParticipantSearch{
      lastName: string,
      firstName: string,
      city: string,
      email: string,
      phone: string
}
