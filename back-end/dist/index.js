"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/getData", async (_request, response) => {
    const prisma = new client_1.PrismaClient();
    try {
        const people = await prisma.person.findMany();
        const churchApprentices = await prisma.church_apprentice.findMany();
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
app.post("/updatePerson", async (request, response) => {
    const prisma = new client_1.PrismaClient();
    console.log(request.body);
    const { id, number } = request.body;
    try {
        const updatePayment = await prisma.person.update({
            where: {
                id: id,
            },
            data: {
                paid: number,
            },
        });
        response.status(200).send({
            updatePayment,
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
app.get("/getLeader", async (_request, response) => {
    const prisma = new client_1.PrismaClient();
    try {
        const district_leaders = await prisma.district_leader.findMany();
        response.status(200).send({
            district_leaders,
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
