import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/getData", async (request: Request, response: Response) => {
  const prisma = new PrismaClient();

  try {
    const people = await prisma.v_person_details.findMany({
      orderBy: { person_id: "asc" },
    });
    const diosezes = await prisma.dioseze.findMany();
    const districts = await prisma.district.findMany();
    const churches = await prisma.church.findMany();

    const data = {
      people,
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

app.get("/getError", async (request: Request, response: Response) => {
  const prisma = new PrismaClient();

  try {
    const error = await prisma.error.findMany({
      orderBy: { id: "asc" },
    });

    const data = {
      error,
    };
    console.log("get Error");
    response.status(200).send({
      data,
    });
  } catch (error) {
    console.error("Error fetching error:", error);
    response
      .status(500)
      .send({ error: "An error occurred while fetching error" });
  } finally {
    await prisma.$disconnect();
  }
});
app.get("/getPeople", async (request: Request, response: Response) => {
  console.log("getPeople");
  const prisma = new PrismaClient();

  try {
    const hasNotPaid = await prisma.v_person_has_not_paid.findMany({
      orderBy: { person_id: "asc" },
    });
    const data = { hasNotPaid };
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

app.post("/insertPayment", async (request: Request, response: Response) => {
  console.log("insertPayment");

  const prisma = new PrismaClient();
  const payments = request.body;

  try {
    for (const payment of payments) {
      payment.dioseze = payment.dioseze || "null";
      payment.district = payment.district || "null";
      payment.church = payment.church || "null";

      const role = await prisma.role.findFirst({
        where: {
          role: payment.role,
        },
      });
      const dioseze = await prisma.dioseze.findFirst({
        where: {
          name: payment.dioseze,
        },
      });
      const district = await prisma.district.findFirst({
        where: {
          name: payment.district,
        },
      });
      const church = await prisma.church.findFirst({
        where: {
          name: payment.church,
        },
      });

      const birthDate = new Date(payment.birthday); // Parse the birthday

      // Validate the parsed date
      if (isNaN(birthDate.getTime())) {
        console.error("Invalid birth date format:", payment.birthday);
        continue; // Skip this payment
      }

      // Calculate age
      const paymentYear = parseInt(payment.year, 10);
      const age = paymentYear - birthDate.getFullYear();

      if (role && dioseze && district && church && role.due == payment.paid) {
        console.log(age);
        console.log(role?.role);
        if (role?.role == "Beazina" && age > 18) {
          console.error(
            `Skipping payment for ${payment.name}: Age ${age} is less than 18.`
          );
        } else {
          const insert = await prisma.person.create({
            data: {
              name: payment.name,
              id_role: role.id,
              id_dioseze: dioseze.id,
              id_district: district.id,
              id_church: church.id,
              paid: parseInt(payment.paid, 10),
              due: role.due,
              year: parseInt(payment.year, 10),
              birth_date: birthDate, // Use the Date object
            },
          });

          console.log(`Payment validation successful for ${payment.name}`);
        }
      }
    }

    response.status(200).send({ message: "Payments processed successfully." });
  } catch (error) {
    console.error("Error processing payment:", error);
    response
      .status(500)
      .send({ error: "An error occurred while processing payments." });
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
    const payingPerson = await prisma.v_person_details.findFirst({
      where: {
        person_id: id,
      },
    });

    if (payment == payingPerson?.due) {
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
