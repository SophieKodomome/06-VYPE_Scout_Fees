SELECT
  ca.id,
  ca.id_church,
  ch.name AS church_name,
  ca.id_person,
  p.name,
  p.paid,
  p.due,
  p.year
FROM
  (
    (
      church_apprentice ca
      JOIN person p ON ((ca.id_person = p.id))
    )
    JOIN church ch ON ((ca.id_church = ch.id))
  );