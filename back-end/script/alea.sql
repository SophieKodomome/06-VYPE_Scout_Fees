INSERT INTO Dioseze(name) VALUES ('null');
INSERT INTO District(name,id_dioseze) VALUES ('null',SELECT id FROM Dioseze WHERE name = 'null');
INSERT INTO Church(name,id_district) VALUES ('null',SELECT id FROM District WHERE name = 'null');

-- Insert data into the Dioseze table
INSERT INTO Dioseze(name) VALUES ('Tana');

-- Insert data into the District table
INSERT INTO District(name, id_dioseze) VALUES
('Faritra Mahamasina', (SELECT id FROM Dioseze WHERE name = 'Tana')),
('Faritra Faravohitra', (SELECT id FROM Dioseze WHERE name = 'Tana'));

-- Insert data into the Church table
INSERT INTO Church(name, id_district) VALUES
('Fivondronana St Michel', (SELECT id FROM District WHERE name = 'Faritra Mahamasina')),
('Fivondronana Ambatonilita', (SELECT id FROM District WHERE name = 'Faritra Mahamasina')),
('Fivondronana Faravohitra', (SELECT id FROM District WHERE name = 'Faritra Faravohitra')),
('Fivondronana Manjakaray', (SELECT id FROM District WHERE name = 'Faritra Faravohitra'));

-- Insert data into the Role table
INSERT INTO Role(role) VALUES 
('Ekipa Foibe'),
('Filoha'),
('Tonia'),
('Mpiandraikitra'),
('Beazina');

-- Insert data into the Person table with corrected conditions for 'null'
INSERT INTO Person (name, id_role, id_dioseze, id_district, id_church, due, paid, year) VALUES
('F1', 
    (SELECT id FROM Role WHERE role = 'Ekipa Foibe'),
    (SELECT id FROM Dioseze WHERE name ='null'),
    (SELECT id FROM District WHERE name ='null'),
    (SELECT id FROM Church WHERE name ='null'),
    0, 25000, 2024),
('F2', 
    (SELECT id FROM Role WHERE role = 'Ekipa Foibe'),
    (SELECT id FROM Dioseze WHERE name ='null'),
    (SELECT id FROM District WHERE name ='null'),
    (SELECT id FROM Church WHERE name ='null'),
    0, 25000, 2024),
('FIDI1', 
    (SELECT id FROM Role WHERE role = 'Filoha'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'),
    (SELECT id FROM District WHERE name ='null'),
    (SELECT id FROM Church WHERE name ='null'), 
    15000, 0, 2024),
('FIFA1', 
    (SELECT id FROM Role WHERE role = 'Filoha'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name ='null'),  
    15000, 0, 2024),
('T11', 
    (SELECT id FROM Role WHERE role = 'Tonia'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana St Michel'),
    7000, 0, 2024),
('T12', 
    (SELECT id FROM Role WHERE role = 'Tonia'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana St Michel'),
    7000, 0, 2024),
('MP11', 
    (SELECT id FROM Role WHERE role = 'Mpiandraikitra'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana St Michel'),
    3000, 0, 2024),
('BZ11', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana St Michel'),
    1500, 0, 2024),
('BZ12', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana St Michel'),
    1500, 0, 2024),
('T21', 
    (SELECT id FROM Role WHERE role = 'Tonia'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Ambatonilita'),
    7000, 0, 2024),
('MP21', 
    (SELECT id FROM Role WHERE role = 'Mpiandraikitra'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Ambatonilita'),
    3000, 0, 2024),
('BZ21', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Ambatonilita'),
    1500, 0, 2024),
('BZ22', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Mahamasina'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Ambatonilita'),
    1500, 0, 2024),
('FIFA1', 
    (SELECT id FROM Role WHERE role = 'Filoha'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name ='null'),  
    15000, 0, 2024),
('T31', 
    (SELECT id FROM Role WHERE role = 'Tonia'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Faravohitra'),
    7000, 0, 2024),
('MP31', 
    (SELECT id FROM Role WHERE role = 'Mpiandraikitra'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Faravohitra'),
    3000, 0, 2024),
('BZ31', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Faravohitra'),
    1500, 0, 2024),
('BZ32', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Faravohitra'),
    1500, 0, 2024),
('T41', 
    (SELECT id FROM Role WHERE role = 'Tonia'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Manjakaray'),
    7000, 0, 2024),
('MP41', 
    (SELECT id FROM Role WHERE role = 'Mpiandraikitra'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Manjakaray'),
    3000, 0, 2024),
('BZ41', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Manjakaray'),
    1500, 0, 2024),
('BZ42', 
    (SELECT id FROM Role WHERE role = 'Beazina'),
    (SELECT id FROM Dioseze WHERE name = 'Tana'), 
    (SELECT id FROM District WHERE name = 'Faritra Faravohitra'),
    (SELECT id FROM Church WHERE name = 'Fivondronana Manjakaray'),
    1500, 0, 2024);
