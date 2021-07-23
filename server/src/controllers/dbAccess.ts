import {PrismaClient} from '@prisma/client'
import express from "express";

/**
 * Returns top ten participants ordered by their click count (descending)
 *
 * @param req
 * @param res
 * @param prisma
 */
export async function findTopTenParticipants(req: express.Request, res: express.Response, prisma: PrismaClient) {
    const topTenParticipants = await prisma.participant.findMany({
        orderBy: {clickCount: 'desc'},
        take: 10
    });

    res.json(topTenParticipants);
}

export async function addTopParticipant(req: express.Request, res: express.Response, prisma: PrismaClient) {
    const participantData = req.body;
    if (!participantData.name || !participantData.clickCount) {
        res.statusMessage = "A required data missing.";
        res.status(400).end();
        return;
    }
    await prisma.participant.create({
        data: {
            name: participantData.name,
            clickCount: participantData.clickCount
        }
    });
    res.status(201).end();
    return;
}

