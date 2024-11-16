SELECT
  cm.id,
  cm.id_church,
  ch.name AS church_name,
  cm.id_person,
  p.name,
  p.paid,
  p.due
FROM
  (
    (
      church_member cm
      JOIN person p ON ((cm.id_person = p.id))
    )
    JOIN church ch ON ((cm.id_church = ch.id))
  );