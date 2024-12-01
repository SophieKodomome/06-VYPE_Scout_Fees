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
        const role = await prisma.role.findFirst({
            where: {
                role: payment.categorie,
                year: parseInt(payment.annee),
            },
        });
        const alreadyPaid = await prisma.v_person_details.findFirst({
            where: {
                id_string: payment.id,
                year: parseInt(payment.annee),
            },
        });
        if (role) {
            if (payment.vola == role.subscription) {
                if (!alreadyPaid) {
                    if (isNaN(birthDate.getTime())) {
                        // Invalid birth date
                        await prisma.error.create({
                            data: {
                                motif: `Invalid birth date format: ${payment.date_de_naissance}`,
                            },
                        });
                    }
                    else {
                        // Calculate age
                        const paymentYear = parseInt(payment.annee);
                        const age = paymentYear - birthDate.getFullYear();
                        if (age < role.age_limitation) {
                            // Payment successful, insert into person table
                            await prisma.person.create({
                                data: {
                                    id_string: payment.id,
                                    id_role: role.id,
                                    dioseze: payment.diosezy,
                                    district: payment.faritra,
                                    church: payment.fivondronana,
                                    payment: parseInt(payment.vola),
                                    year: parseInt(payment.annee),
                                    birth_date: birthDate,
                                },
                            });
                            console.log("Payment successfully inserted:", payment.id);
                        }
                        else {
                            // Age limitation exceeded
                            await prisma.error.create({
                                data: {
                                    motif: `Beyond age limitation for payment ID: ${payment.id}`,
                                },
                            });
                        }
                    }
                }
                else {
                    // Already paid
                    await prisma.error.create({
                        data: {
                            motif: `User has already paid this year for payment ID: ${payment.id}`,
                        },
                    });
                }
            }
            else {
                // Payment doesn't match subscription
                await prisma.error.create({
                    data: {
                        motif: `Payment doesn't match subscription for payment ID: ${payment.id}`,
                    },
                });
            }
        }
        else {
            // Role doesn't exist
            await prisma.error.create({
                data: {
                    motif: `Role does not exist for payment ID: ${payment.id}`,
                },
            });
        }
        response.status(200).send({ message: "Payments processed successfully." });
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
