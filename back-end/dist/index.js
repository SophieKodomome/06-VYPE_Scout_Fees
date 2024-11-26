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
        const people = await prisma.v_person_details.findMany({ orderBy: { person_id: 'asc' } });
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
app.get("/getPeople", async (request, response) => {
    console.log("getPeople");
    const prisma = new client_1.PrismaClient();
    try {
        const hasNotPaid = await prisma.v_person_has_not_paid.findMany({ orderBy: { person_id: 'asc' } });
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
app.post("/updatePayment", async (request, response) => {
    console.log("updatePayment");
    const prisma = new client_1.PrismaClient();
    console.log(request.body);
    const { id, payment } = request.body;
    try {
        const payingPerson = await prisma.v_person_details.findFirst({
            where: {
                person_id: id,
            }
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
