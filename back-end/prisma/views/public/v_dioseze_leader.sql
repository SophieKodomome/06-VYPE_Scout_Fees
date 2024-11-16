SELECT
  dl.id,
  dl.id_dioseze,
  d.name AS dioseze_name,
  dl.id_person,
  p.name,
  p.paid,
  p.due,
  p.year
FROM
  (
    (
      dioseze_leader dl
      JOIN person p ON ((dl.id_person = p.id))
    )
    JOIN dioseze d ON ((dl.id_dioseze = d.id))
  );