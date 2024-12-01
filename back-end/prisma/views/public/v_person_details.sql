SELECT
  p.id,
  p.id_string,
  r.id AS id_role,
  r.role,
  p.church,
  p.district,
  p.dioseze,
  r.subscription,
  p.payment,
  p.year,
  p.birth_date,
  r.age_limitation
FROM
  (
    person p
    LEFT JOIN role r ON ((p.id_role = r.id))
  );