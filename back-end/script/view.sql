CREATE VIEW v_person_details AS
SELECT 
    p.id AS person_id,
    p.name AS person_name,
    r.role AS role_name,
    c.name AS church_name,
    d.name AS district_name,
    dz.name AS dioseze_name,
    p.due,
    p.paid,
    p.year
FROM 
    person p
LEFT JOIN role r ON p.id_role = r.id
LEFT JOIN church c ON p.id_church = c.id
LEFT JOIN district d ON p.id_district = d.id
LEFT JOIN dioseze dz ON p.id_dioseze = dz.id;

CREATE VIEW v_person_has_not_paid AS
SELECT * FROM v_person_details WHERE paid <> due; 
