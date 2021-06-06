import { produkt } from "./produkte";

export interface bestellung {
    id       : number;
    zeit     : Date;
    produkte : produkt[]
}