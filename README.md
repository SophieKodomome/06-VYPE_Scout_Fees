# 06-VYPE_Scout_Fees
<h2>Goal:</h2>
<p>A webApp in which clients can pay their annuel fees and in which the admin can see their due</p>
<h2>Features:</h2>
<ul>
    <li>Pay see the list of dues</li>
    <li>Pay their due one by one or in group</li>
    <li>They can't pay twice</li>
</ul>
<h2>Technology &#x1F680;</h2>
    <li>VueJs</li>
    <li>Tailwind</li>
    <li>Postgres</li>
    <li>Prisma</li>
    <li>Espress</li>
    <li>Yarn</li>
    <li>Typescript</li>
<h2>To do list &#x1F4CB;</h2>
    <h3>Back End</h3>
        <h4>Database scout</h4>
            <li>Table Dioseze(id,name)</li>
            <li>Table District(id,id_Dioseze,name)</li>
            <li>Table Church(id,id_District,name)</li>
            <li>Table Person(id,name,paid,due)</li>
            <li>Table Dioseze_Leader(id,id_Dioseze,id_person)</li>
            <li>Table District_Leader(id,id_District,id_person)</li>
            <li>Table Church_Leader(id,id_Church,id_person)</li>
            <li>Table Church_Apprentice(id,id_Church,id_person)</li>
            <li>Table Church_Member(id,id_Church,id_person)</li>
            <li>View v_Dioseze_Leader(id,id_Dioseze,id_person,name,paid,due)</li>
            <li>View v_District_Leader(id,id_District,id_person,name,paid,due)</li>
            <li>View v_Church_Leader(id,id_Church,id_person,name,paid,due)</li>
            <li>View v_Church_Apprentice(id,id_Church,id_person,name,paid,due)</li>
            <li>View v_Church_Member(id,id_Church,id_person,name,paid,due)</li>
        <h4>Classes</h4>
            <li>class Person(id,name,paid,due)</li>
            <li>class Dioseze(id,name)</li>
            <li>class District(id,idDioseze,name)</li>
            <li>class Church(id,idDistrict,name)</li>
            <li>class DiosezeLeader(id,idDioseze,name,paid,due)</li>
            <li>class DistrictLeader(id,idDistrict,name,paid,due)</li>
            <li>class ChurchLeader(id,idChurch,name,paid,due)</li>
            <li>class ChurchApprentice(id,idChurch,name,paid,due)</li>
            <li>class ChurchMember(id,idChurch,name,paid,due)</li>
        <h4>File</h4>
            <li>index.js</li>
            <ul>
                <li>function getListPerson()</li>
                <li>function updatePayment(id,paid)</li>
            </ul>
    <h3>Front End</h3>
        <h4>Pages</h4>
            <li>Page List Person</li>
            <li>Page insert Person</li>



