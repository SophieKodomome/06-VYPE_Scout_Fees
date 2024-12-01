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
app.get("/getPeople", async (request, response) => {
    console.log("getPeople");
    const prisma = new client_1.PrismaClient();
    try {
        const hasNotPaid = await prisma.v_person_has_not_paid.findMany({
            orderBy: { person_id: "asc" },
        });
        const data = { hasNotPaid };
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
app.post("/insertPayment", async (request, response) => {
    console.log("insertPayment");
    const prisma = new client_1.PrismaClient();
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
                console.log(role === null || role === void 0 ? void 0 : role.role);
                if ((role === null || role === void 0 ? void 0 : role.role) == "Beazina" && age > 18) {
                    console.error(`Skipping payment for ${payment.name}: Age ${age} is less than 18.`);
                }
                else {
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
app.post("/updatePayment", async (request, response) => {
    console.log("updatePayment");
    const prisma = new client_1.PrismaClient();
    console.log(request.body);
    const { id, payment } = request.body;
    try {
        const payingPerson = await prisma.v_person_details.findFirst({
            where: {
                person_id: id,
            },
        });
        if (payment == (payingPerson === null || payingPerson === void 0 ? void 0 : payingPerson.due)) {
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
    }
    catch (error) {
        console.error("Error updating payment:", error);
        response
            .status(500)
            .send({ error: "An error occurred while updating payment" });
    }
    finally {
        await prisma.$disconnect();
    }
});
