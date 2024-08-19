export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user';
    registrationDate: string;
  };