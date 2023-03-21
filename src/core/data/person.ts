export interface PersonAddress {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: number;
  city: string;
  zipcode: number;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}
export interface Person {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: Date;
  gender: string;
  address: PersonAddress;
  website: string;
  image: string;

}
