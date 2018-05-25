class Recipie{
    constructor(ID, Naam, Recept, Bereiding, MaaltijdType, GerechtType){
        this.ID = ID;
        this.Naam = Naam;
        this.Recept = Recept;
        this.Bereiding = Bereiding;
        this.MaaltijdType = MaaltijdType;
        this.GerechtType = GerechtType;
    }
}

function Recept(Toolset, Ingredienten, Bereiding){
    this.Toolset = Toolset;
    this.Ingredienten = Ingredienten;
}

function ReceptItem(ID, Naam, Recept, Bereiding, MaaltijdType, GerechtType){
    this.ID = ID;
    this.Naam = Naam;
    this.Recept = Recept;
    this.Bereiding = Bereiding;
    this.MaaltijdType = MaaltijdType;
    this.GerechtType = GerechtType;
}