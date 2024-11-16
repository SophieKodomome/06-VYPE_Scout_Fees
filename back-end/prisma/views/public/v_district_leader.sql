SELECT
  dl.id,
  dl.id_district,
  d.name AS district_name,
  dl.id_person,
  p.name,
  p.paid,
  p.due,
  p.year
FROM
  (
    (
      district_leader dl
      JOIN person p ON ((dl.id_person = p.id))
    )
    JOIN district d ON ((dl.id_district = d.id))
  );