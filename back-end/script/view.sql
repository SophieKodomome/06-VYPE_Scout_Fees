CREATE VIEW v_person_details AS
SELECT 
    p.id AS id,
    p.id_String AS id_string,
    r.id AS id_role,
    r.role AS role,
    p.church AS church,
    p.district AS district,
    p.dioseze AS dioseze,
    r.subscription AS subscription,
    p.payment AS payment,
    p.year AS year,
    p.birth_date AS birth_date,
    r.age_limitation AS age_limitation
FROM 
    person p
LEFT JOIN role r ON p.id_role = r.id;

CREATE VIEW v_person_has_not_paid AS
SELECT * FROM v_person_details WHERE paid <> due; 
