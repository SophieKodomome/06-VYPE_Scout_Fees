SELECT
  cl.id,
  cl.id_church,
  ch.name AS church_name,
  cl.id_person,
  p.name,
  p.paid,
  p.due
FROM
  (
    (
      church_leader cl
      JOIN person p ON ((cl.id_person = p.id))
    )
    JOIN church ch ON ((cl.id_church = ch.id))
  );