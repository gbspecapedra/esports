import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import { convertHourStringToMinutes, convertMinutesToHourString } from './utils';

const app = express();

app.use(express.json());
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (request, response) => {
  return await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })
})

app.get('/games/:id/ads', async (request, response) => {
  const { id } = request.params;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return response.json(ads.map((ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  })))
})

app.post('/games/:id/ads', async (request, response) => {
  const { id } = request.params;
  const { weekDays, hourStart, hourEnd, ...ad } = request.body;

  return await prisma.ad.create({
    data: {
      ...ad,
      gameId: id,
      weekDays: weekDays.join(','),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd)
    }
  })
})

app.get('/ads/:id/discord', async (request, response) => {
  const { id } = request.params;

  return await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id
    }
  });
})



app.listen(3333)