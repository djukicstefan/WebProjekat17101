INSERT INTO Luka 
DEFAULT VALUES;

INSERT INTO Brod (MaxKapacitet, BrojUpotrebljivihKontejnera, TrenutnaZauzetost, LukaID) --ID = 7. 
VALUES (500, 1, 300, 1);

INSERT INTO Brod (MaxKapacitet, BrojUpotrebljivihKontejnera, TrenutnaZauzetost, LukaID) --ID = 8.
VALUES (1000, 0, 1000, 1);

INSERT INTO Brod (MaxKapacitet, BrojUpotrebljivihKontejnera, TrenutnaZauzetost, LukaID) --ID = 9.
VALUES (1500, 0, 1500, 1);

INSERT INTO Brod (MaxKapacitet, BrojUpotrebljivihKontejnera, TrenutnaZauzetost, LukaID) --ID = 15.
VALUES (5000, 0, 5000, 1);

INSERT INTO Brod (MaxKapacitet, BrojUpotrebljivihKontejnera, TrenutnaZauzetost, LukaID) --ID = 16.
VALUES (6000, 6, 4650, 1);

INSERT INTO Brod (MaxKapacitet, BrojUpotrebljivihKontejnera, TrenutnaZauzetost, LukaID) --ID = 17.
VALUES (6000, 3, 4000, 1);

INSERT INTO Brod (MaxKapacitet, BrojUpotrebljivihKontejnera, TrenutnaZauzetost, LukaID) --ID = 18.
VALUES (4900, 5, 3000, 1);

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Hrana', 100, 'H', 8); --1.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Gorivo', 300, 'G', 7); --2.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Vakcine', 300, 'V', 8); --3.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Gorivo', 1200, 'G', 9); --4.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Gorivo', 300, 'G', 9); --5.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Vakcine', 5000, 'V', 15); --6.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Hrana', 300, 'H', 16); --7.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Vakcine', 600, 'V', 16); --8.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Gorivo', 3000, 'G', 16); --9.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Vakcine', 4000, 'V', 17); --10.

INSERT INTO Kontejner (Ime, Tezina, Oznaka, BrodID)
VALUES ('Hrana', 3000, 'H', 18); --11.

--Vrednosti ID polja za brodove treba da budu gorenavedeni da bi se kontejneri pravilno rasporedili tamo gde im je mesto!