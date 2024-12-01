CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    role VARCHAR(100) NOT NULL,
    subscription INT NOT NULL,
    year INT NOT NULL,
    age_limitation INT NOT NULL
);

CREATE TABLE Error (
    id SERIAL PRIMARY KEY,
    motif VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Person (
    id VARCHAR(100) NOT NULL,
    id_role INT NOT NULL,
    dioseze VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    church VARCHAR(100) NOT NULL,
    payment INT,
    year INT,
    birth_date date NOT NULL,
    FOREIGN KEY (id_role) REFERENCES Role (id) ON DELETE CASCADE
);