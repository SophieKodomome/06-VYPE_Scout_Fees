CREATE TABLE Dioseze (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE District (
    id SERIAL PRIMARY KEY,
    id_Dioseze INT NOT NULL,
    name VARCHAR(100),
    FOREIGN KEY (id_Dioseze) REFERENCES Dioseze (id) ON DELETE CASCADE
);

CREATE TABLE Church (
    id SERIAL PRIMARY KEY,
    id_District INT NOT NULL,
    name VARCHAR(100),
    FOREIGN KEY (id_District) REFERENCES District (id) ON DELETE CASCADE
);
CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    role VARCHAR(100) NOT NULL,
    due INT
);

CREATE TABLE Person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    id_role INT NOT NULL,
    id_dioseze INT NOT NULL,
    id_district INT NOT NULL,
    id_church INT NOT NULL,
    paid INT,
    due INT,
    year INT,
    birth_date date NOT NULL,
    FOREIGN KEY (id_role) REFERENCES Role (id) ON DELETE CASCADE,
    FOREIGN KEY (id_dioseze) REFERENCES Dioseze (id) ON DELETE CASCADE,
    FOREIGN KEY (id_district) REFERENCES District (id) ON DELETE CASCADE,
    FOREIGN KEY (id_church) REFERENCES Church (id) ON DELETE CASCADE
);

