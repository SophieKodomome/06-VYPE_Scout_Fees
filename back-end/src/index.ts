import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
}));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/getData", async (request: Request, response: Response) => {
  const prisma = new PrismaClient();

  try {
    const people = await prisma.person.findMany({orderBy: [{id:'asc'}]});
    const churchApprentices = await prisma.v_church_apprentice.findMany();
    const churchLeaders = await prisma.v_church_leader.findMany();
    const churchMembers = await prisma.v_church_member.findMany();
    const diosezeLeaders = await prisma.v_dioseze_leader.findMany();
    const districtLeaders = await prisma.v_district_leader.findMany();
    const diosezes = await prisma.dioseze.findMany();
    const districts = await prisma.dioseze.findMany();
    const churches = await prisma.dioseze.findMany();
    const totalByChurch = await prisma.v_church_total_by_church.findMany();
const totalByDistrictConverted = totalByChurch.map((entry) => ({
  ...entry,
  total_paid: entry.total_paid?.toString(),
  total_due: entry.total_due?.toString(),
}));


    const data = {
      people,
      churchApprentices,
      churchLeaders,
      churchMembers,
      diosezeLeaders,
      districtLeaders,
      diosezes,
      districts,
      churches,
      totalByChurch:totalByDistrictConverted,
    };
    console.log("get Data");
    response.status(200).send({
      data,
    });
  } catch (error) {
    console.error("Error fetching people:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching people" });
  } finally {
    await prisma.$disconnect();
  }
});
app.get("/getPeople", async (request: Request,response: Response) => {
  console.log("getPeople");
  const prisma = new PrismaClient();

  try {
    
    const hasNotPaid = await prisma.v_has_not_paid.findMany({orderBy: [{id:'asc'}]});
    const data = {hasNotPaid};
    response.status(200).send({
      data,
    });
  } catch (error) {
    console.error("Error fetching people:", error);

    response
      .status(500)
      .send({ error: "An error occurred while fetching people" });
  } finally {
    await prisma.$disconnect();
  }
});
app.post("/updatePayment", async (request: Request, response: Response) => {
  console.log("updatePayment");
  const prisma = new PrismaClient();

  console.log(request.body);
  const { id, payment } = request.body;

  try {
    const payingPerson = await prisma.person.findFirst({      
      where:{
        id:id,
      }},
    )

    if(payment==payingPerson?.due){
      console.log(payingPerson);

      const updatePayment = await prisma.person.update({
        where: {
          id: id,
        },
        data: {
          paid: payment,
        },
      });
      response.status(200).send({
        updatePayment,
      });
    }

  } catch (error) {
    console.error("Error updating payment:", error);
    response
      .status(500)
      .send({ error: "An error occurred while updating payment" });
  } finally {
    await prisma.$disconnect();
  }
});
