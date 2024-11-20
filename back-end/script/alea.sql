INSERT INTO Dioseze (name) VALUES
('Mahamasina');

INSERT INTO District (id_Dioseze, name) VALUES
(1, 'Mahamasina'),
(1, 'Farovohitra');

INSERT INTO Church (id_District, name) VALUES
(1,'St Michel'),
(1,'Ambatonilita'),
(2,'Ekar Faravohitra'),
(2,'Manjakaray');

INSERT INTO Person (name,paid, due,year) VALUES
('FIDI1',0, 10000,2024),
('FIFA1',10000,10000,2024),
('T11',5000,5000,2024),
('T12',5000,5000,2024),
('MP11',2000,2000,2024),
('BZ11',1000,1000,2024),
('BZ12',1000,1000,2024),
('T21',5000,5000,2024),
('MP21',2000,2000,2024),
('BZ21',1000,1000,2024),
('BZ22',1000,1000,2024),
('FIFA2',0,10000,2024),
('T31',0,5000,2024),
('MP31',0,2000,2024),
('BZ31',0,1000,2024),
('BZ32',0,1000,2024),
('T41',0,5000,2024),
('MP41',0,2000,2024),
('BZ41',0,1000,2024),
('BZ42',0,1000,2024);

INSERT INTO Dioseze_Leader (id_Dioseze, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'FIDI1'));

INSERT INTO District_Leader (id_District, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'FIFA1')),
(2, (SELECT id FROM Person WHERE name = 'FIFA2'));

INSERT INTO Church_Leader (id_Church, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'T11')),
(2, (SELECT id FROM Person WHERE name = 'T21')),
(3, (SELECT id FROM Person WHERE name = 'T31')),
(4, (SELECT id FROM Person WHERE name = 'T41'));

INSERT INTO Church_Apprentice (id_Church, id_person) VALUES
(1, (SELECT id FROM Person WHERE name = 'MP11')),
(2, (SELECT id FROM Person WHERE name = 'MP21')),
(3, (SELECT id FROM Person WHERE name = 'MP31')),
(4, (SELECT id FROM Person WHERE name = 'MP41'));

INSERT INTO Church_Member (id_Church, id_person) VALUES
(1, (SELECT id FROM Person WHERE name ='BZ11')),
(1, (SELECT id FROM Person WHERE name ='BZ12')),
(2, (SELECT id FROM Person WHERE name ='BZ21')),
(2, (SELECT id FROM Person WHERE name ='BZ22')),
(3, (SELECT id FROM Person WHERE name ='BZ31')),
(3, (SELECT id FROM Person WHERE name ='BZ32')),
(4, (SELECT id FROM Person WHERE name ='BZ41')),
(4, (SELECT id FROM Person WHERE name ='BZ42'));
