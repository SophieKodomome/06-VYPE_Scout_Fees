SELECT
  person.id,
  person.name,
  person.paid,
  person.due,
  person.year
FROM
  person
WHERE
  (person.paid <> person.due);