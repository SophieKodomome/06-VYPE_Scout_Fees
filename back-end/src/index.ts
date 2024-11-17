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

app.get("/getData", async (_request: Request, response: Response) => {
  const prisma = new PrismaClient();

  try {
    const people = await prisma.person.findMany();
    const churchApprentices = await prisma.v_church_apprentice.findMany();
    const churchLeaders = await prisma.v_church_leader.findMany();
    const churchMembers = await prisma.v_church_member.findMany();
    const diosezeLeaders = await prisma.v_dioseze_leader.findMany();
    const districtLeaders = await prisma.v_district_leader.findMany();
    const diosezes = await prisma.dioseze.findMany();
    const districts = await prisma.dioseze.findMany();
    const churches = await prisma.dioseze.findMany();

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

app.post("/updatePayment", async (request: Request, response: Response) => {
  console.log("updatePayment");
  const prisma = new PrismaClient();
  console.log(request.body);
  const { id, payment } = request.body;
  try {
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
  } catch (error) {
    console.error("Error updating payment:", error);
    response
      .status(500)
      .send({ error: "An error occurred while updating payment" });
  } finally {
    await prisma.$disconnect();
  }
});
