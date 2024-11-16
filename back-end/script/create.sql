CREATE TABLE Dioseze (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE District (
    id SERIAL PRIMARY KEY,
    id_Dioseze INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_Dioseze) REFERENCES Dioseze (id) ON DELETE CASCADE
);

CREATE TABLE Church (
    id SERIAL PRIMARY KEY,
    id_District INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_District) REFERENCES District (id) ON DELETE CASCADE
);

CREATE TABLE Person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    paid INT,
    due INT,
    year INT
);

CREATE TABLE Dioseze_Leader (
    id SERIAL PRIMARY KEY,
    id_Dioseze INT NOT NULL,
    id_Person INT NOT NULL,
    FOREIGN KEY (id_Dioseze) REFERENCES Dioseze (id) ON DELETE CASCADE,
    FOREIGN KEY (id_Person) REFERENCES Person (id) ON DELETE CASCADE
);

CREATE TABLE District_Leader (
    id SERIAL PRIMARY KEY,
    id_District INT NOT NULL,
    id_Person INT NOT NULL,
    FOREIGN KEY (id_District) REFERENCES District (id) ON DELETE CASCADE,
    FOREIGN KEY (id_Person) REFERENCES Person (id) ON DELETE CASCADE
);

CREATE TABLE Church_Leader (
    id SERIAL PRIMARY KEY,
    id_Church INT NOT NULL,
    id_Person INT NOT NULL,
    FOREIGN KEY (id_Church) REFERENCES Church (id) ON DELETE CASCADE,
    FOREIGN KEY (id_Person) REFERENCES Person (id) ON DELETE CASCADE
);

CREATE TABLE Church_Apprentice (
    id SERIAL PRIMARY KEY,
    id_Church INT NOT NULL,
    id_Person INT NOT NULL,
    FOREIGN KEY (id_Church) REFERENCES Church (id) ON DELETE CASCADE,
    FOREIGN KEY (id_Person) REFERENCES Person (id) ON DELETE CASCADE
);

CREATE TABLE Church_Member (
    id SERIAL PRIMARY KEY,
    id_Church INT NOT NULL,
    id_Person INT NOT NULL,
    FOREIGN KEY (id_Church) REFERENCES Church (id) ON DELETE CASCADE,
    FOREIGN KEY (id_Person) REFERENCES Person (id) ON DELETE CASCADE
);

