"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/getData", async (request, response) => {
    const prisma = new client_1.PrismaClient();
    try {
        const people = await prisma.v_person_details.findMany({
            orderBy: { id: "asc" },
        });
        const data = {
            people,
        };
        console.log("get Data");
        response.status(200).send({
            data,
        });
    }
    catch (error) {
        console.error("Error fetching people:", error);
        response
            .status(500)
            .send({ error: "An error occurred while fetching people" });
    }
    finally {
        await prisma.$disconnect();
    }
});
app.get("/getError", async (request, response) => {
    const prisma = new client_1.PrismaClient();
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
    }
    catch (error) {
        console.error("Error fetching error:", error);
        response
            .status(500)
            .send({ error: "An error occurred while fetching error" });
    }
    finally {
        await prisma.$disconnect();
    }
});
/*app.get("/getPeople", async (request: Request, response: Response) => {
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
*/
app.post("/insertPayment", async (request, response) => {
    console.log("insertPayment");
    const prisma = new client_1.PrismaClient();
    const payment = request.body;
    try {
        payment.diosezy = payment.diosezy || "null";
        payment.faritra = payment.faritra || "null";
        payment.fivondronana = payment.fivondronana || "null";
        const birthDate = new Date(payment.date_de_naissance); // Parse the date_de_naissance
        // Validate the parsed date
        //if (isNaN(birthDate.getTime())) {
        //console.error("Invalid birth date format:", payment.date_de_naissance);
        //}
        // Calculate age
        const paymentYear = parseInt(payment.year, 10);
        const age = paymentYear - birthDate.getFullYear();
        const role = await prisma.role.findFirst({ where: {
                role: payment.categorie,
                year: parseInt(payment.annee)
            }
        });
        console.log(role);
        const alreadyPaid = await prisma.v_person_details.findFirst({
            where: {
                id_string: payment.id,
                year: parseInt(payment.annee)
            }
        });
        if (role) {
            if (payment.vola == role.subscription) {
                if (!alreadyPaid) {
                    console.log("Payment successful :" + payment.id);
                }
                else {
                    console.log("error on " + payment.id + ": use already paid this year");
                }
            }
            else {
                console.log("error on " + payment.id + ": payment doesn't match subscription");
            }
        }
        else {
            console.log("error on " + payment.id + ": role does'nt");
        }
        console.log(payment);
        //response.status(200).send({ message: "Payments processed successfully." });
    }
    catch (error) {
        console.error("Error processing payment:", error);
        response
            .status(500)
            .send({ error: "An error occurred while processing payments." });
    }
    finally {
        await prisma.$disconnect();
    }
});
/*app.post("/updatePayment", async (request: Request, response: Response) => {
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
});*/
