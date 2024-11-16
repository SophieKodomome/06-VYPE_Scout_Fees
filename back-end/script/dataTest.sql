INSERT INTO Dioseze (name) VALUES
('Archdiocese 1');

INSERT INTO District (id_Dioseze, name) VALUES
(1, 'Southern District'),
(1, 'Northern District'),
(1, 'Eastern District'),
(1, 'Western District');

INSERT INTO Church (id_District, name) VALUES
(1,'St Peter Church'),
(2,'St Andrews Church'),
(3,'St James Church'),
(4,'St Johns Church');

INSERT INTO Person (name, due) VALUES
('Accolon Dioseze', 10000),
('Aglovale District',5000),
('Agravain District',5000),
('Arthur District',5000),
('Badgemagus District',5000),
('Bedivere L Church ',2000),
('Mathew L Church',2000),
('Brunor L Church',2000),
('Bors L Church',2000),
('Cador A Church',1000),
('Calogrenant A Church',1000),
('Caradoc A Church',1000),
('Claudin A Church',1000),
('Constantine M Church ',500),
('Dagonet M Church',500),
('Daniel M Church',500),
('Dinadan M Church',500),
('Ector M Church ',500),
('Elyan M Church',500),
('Erec M Church',500),
('Esclabor M Church',500.00);

INSERT INTO Dioseze_Leader (id_Dioseze, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'Accolon Dioseze'));

INSERT INTO District_Leader (id_District, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'Aglovale District')),
(2, (SELECT id FROM Person WHERE name = 'Agravain District')),
(3, (SELECT id FROM Person WHERE name = 'Arthur District')),
(4, (SELECT id FROM Person WHERE name = 'Badgemagus District'));

INSERT INTO Church_Leader (id_Church, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'Bedivere L Church ')),
(2, (SELECT id FROM Person WHERE name = 'Mathew L Church')),
(3, (SELECT id FROM Person WHERE name = 'Brunor L Church')),
(4, (SELECT id FROM Person WHERE name = 'Bors L Church'));

INSERT INTO Church_Apprentice (id_Church, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'Cador A Church ')),
(2, (SELECT id FROM Person WHERE name = 'Calogrenant A Church')),
(3, (SELECT id FROM Person WHERE name = 'Caradoc A Church')),
(4, (SELECT id FROM Person WHERE name = 'Claudin A Church'));

INSERT INTO Church_Member (id_Church, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'Constantine M Church ')),
(1, (SELECT id FROM Person WHERE name = 'Dagonet M Church')),
(2, (SELECT id FROM Person WHERE name = 'Daniel M Church')),
(2, (SELECT id FROM Person WHERE name = 'Dinadan M Church')),
(3, (SELECT id FROM Person WHERE name = 'Ector M Church ')),
(3, (SELECT id FROM Person WHERE name = 'Elyan M Church')),
(4, (SELECT id FROM Person WHERE name = 'Erec M Church')),
(4, (SELECT id FROM Person WHERE name = 'Esclabor M Church'));
