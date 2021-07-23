import {PrismaClient} from '@prisma/client';
import express from 'express';
import cors from 'cors';
import {addTopParticipant, findTopTenParticipants} from "./controllers/dbAccess";

const PORT = 5000;

const prisma = new PrismaClient();
const app = express();

app.use(express.json(), cors());

/**
 * Returns top ten participants (ordered by their click count)
 */
app.get('/api/topTen', async (req, res) => {
    await findTopTenParticipants(req, res, prisma)});

app.post('/api/topTen', async (req, res) => {
    await addTopParticipant(req, res, prisma)});

async function main() {
    app.listen(PORT);
    console.log(`Server is listening on port ${PORT}`);
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
})