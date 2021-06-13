export interface produkt {
    id          : number;
    bezeichnung : string;
    zubereitet  : string;
    link        : string;
}

export interface lagerProdukt {
    id          : number,
    bezeichnung : string,
    fuellstand  : number,
    einheit     : string,
    min         : number,
    max         : number,
    kategorie   : string
}