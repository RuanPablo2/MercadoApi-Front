export interface AddressDTO {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
    complement?: string;
  }
  
  export interface UserRegistrationDTO {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    cpf: string;
    address: AddressDTO;
  }