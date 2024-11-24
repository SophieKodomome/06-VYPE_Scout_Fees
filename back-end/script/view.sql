CREATE VIEW v_Dioseze_Leader AS
SELECT 
    dl.id,
    dl.id_Dioseze AS id_Dioseze,
    d.name AS dioseze_name,
    dl.id_Person AS id_Person,
    p.name AS name,
    p.paid AS paid,
    p.due AS due,
    p.year AS year
FROM Dioseze_Leader dl
JOIN Person p ON dl.id_Person = p.id
JOIN Dioseze d ON dl.id_Dioseze = d.id;

CREATE VIEW v_District_Bill AS
Select 
    sum(paid),
    district_name 
from v_district_leader 
group by district_name;

SELECT

FROM

CREATE VIEW v_District_Leader AS
SELECT 
    dl.id,
    dl.id_District AS id_District,
    d.name AS district_name,
    dl.id_Person AS id_Person,
    p.name AS name,
    p.paid AS paid,
    p.due AS due,
    p.year AS year
FROM District_Leader dl
JOIN Person p ON dl.id_Person = p.id
JOIN District d ON dl.id_District = d.id;



CREATE VIEW v_Church_Leader AS
SELECT 
    cl.id,
    cl.id_Church AS id_Church,
    ch.name AS church_name,
    cl.id_Person AS id_Person,
    p.name AS name,
    p.paid AS paid,
    p.due AS due,
    p.year AS year
FROM Church_Leader cl
JOIN Person p ON cl.id_Person = p.id
JOIN Church ch ON cl.id_Church = ch.id;

CREATE VIEW v_Church_Apprentice AS
SELECT 
    ca.id,
    ca.id_Church AS id_Church,
    ch.name AS church_name,
    ca.id_Person AS id_Person,
    p.name AS name,
    p.paid AS paid,
    p.due AS due,
    p.year AS year
FROM Church_Apprentice ca
JOIN Person p ON ca.id_Person = p.id
JOIN Church ch ON ca.id_Church = ch.id;

CREATE VIEW v_Church_Member AS
SELECT 
    cm.id,
    cm.id_Church AS id_Church,
    ch.name AS church_name,
    cm.id_Person AS id_Person,
    p.name AS name,
    p.paid AS paid,
    p.due AS due,
    p.year AS year
FROM Church_Member cm
JOIN Person p ON cm.id_Person = p.id
JOIN Church ch ON cm.id_Church = ch.id;

SELECT sum(paid) AS totalPaid,sum(due) AS totaldue,church_name FROM (
) GROUP BY church_name;

CREATE VIEW v_church_bills AS
SELECT
    id_church,
    church_name,
    due,
    paid
FROM v_Church_Member
UNION ALL
SELECT 
    id_church,
    church_name,
    due,
    paid
FROM v_Church_Apprentice
UNION ALL
SELECT
    id_church,
    church_name,
    due,
    paid
FROM v_Church_Leader;

CREATE OR REPLACE VIEW v_has_not_paid AS
SELECT * FROM Person WHERE paid <> due;

CREATE VIEW v_church_total_by_church AS
SELECT id_church, church_name, SUM(paid) AS total_paid, SUM(due) AS total_due
FROM v_church_bills
GROUP BY id_church, church_name;
