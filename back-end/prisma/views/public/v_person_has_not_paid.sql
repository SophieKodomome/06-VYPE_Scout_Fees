SELECT
  v_person_details.person_id,
  v_person_details.person_name,
  v_person_details.role_name,
  v_person_details.church_name,
  v_person_details.district_name,
  v_person_details.dioseze_name,
  v_person_details.due,
  v_person_details.paid,
  v_person_details.year,
  v_person_details.birth_date
FROM
  v_person_details
WHERE
  (v_person_details.paid <> v_person_details.due);