SELECT
  v_church_bills.id_church,
  v_church_bills.church_name,
  sum(v_church_bills.paid) AS total_paid,
  sum(v_church_bills.due) AS total_due
FROM
  v_church_bills
GROUP BY
  v_church_bills.id_church,
  v_church_bills.church_name;