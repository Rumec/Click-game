import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(numberOfUser: number) {
    await prisma.participant.create({
            data: {
                name: "Test User " + numberOfUser.toString(),
                clickCount: numberOfUser
            }
        }
    );
}

async function seedDb() {
    for (let i = 0; i < 20; ++i) {
        await createUser(i);
    }
}

seedDb();
