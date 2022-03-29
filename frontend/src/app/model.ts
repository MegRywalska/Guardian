
// Tą linię odkomentowujemy jeśli frontend uruchamiamy oddzielnie
export const BASE_URL = 'http://localhost:8080';

// Tą linię odkomentowujemy jeśli frontend zbudowany jest przez `mvn package` wraz z backendem
// export const BASE_URL = '';

export type ApplicationUserDto = {
  identifier: number;
  name:string;
  surname:string;
  dateOfBirth:string;
}

export type AutorizationDto = {
  username: string;
  password: string;
}

export type RegistrationDTO = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}
