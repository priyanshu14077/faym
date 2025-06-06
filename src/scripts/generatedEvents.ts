import { PrismaClient, EventType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const eventTypes: EventType[] = ['view', 'click', 'location'];

const generateViewPayload = () => ({
  url: faker.internet.url(),
  title: faker.lorem.sentence(),
  referrer: faker.internet.url(),
  userAgent: faker.internet.userAgent(),
});

const generateClickPayload = () => ({
  element: faker.helpers.arrayElement(['button', 'link', 'image', 'form']),
  text: faker.lorem.words(3),
  url: faker.internet.url(),
  coordinates: {
    x: faker.number.int({ min: 0, max: 1920 }),
    y: faker.number.int({ min: 0, max: 1080 }),
  },
});

const generateLocationPayload = () => ({
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  city: faker.location.city(),
  country: faker.location.country(),
  accuracy: faker.number.int({ min: 1, max: 100 }),
});

const generatePayload = (eventType: EventType) => {
  switch (eventType) {
    case 'view':
      return generateViewPayload();
    case 'click':
      return generateClickPayload();
    case 'location':
      return generateLocationPayload();
    default:
      return {};
  }
};

async function generateEvents() {
  console.log('Starting event generation...');
  
  const numberOfEvents = faker.number.int({ min: 1000, max: 5000 });
  const users = Array.from({ length: 50 }, () => `user_${faker.string.alphanumeric(8)}`);
  
  const events = [];
  
  for (let i = 0; i < numberOfEvents; i++) {
    const eventType = faker.helpers.arrayElement(eventTypes);
    const userId = faker.helpers.arrayElement(users);
    const timestamp = faker.date.between({ 
      from: '2025-05-01T00:00:00.000Z', 
      to: '2025-05-29T23:59:59.999Z' 
    });
    
    events.push({
      eventId: uuidv4(),
      userId: userId,
      eventType: eventType,
      payload: generatePayload(eventType),
      timestamp: timestamp,
      createdAt: new Date(),
    });
  }
  
  console.log(`Inserting ${numberOfEvents} events...`);
  
  try {
    await prisma.event.createMany({
      data: events,
    });
    
    console.log(`✅ Successfully generated ${numberOfEvents} events`);
    
    // Show summary
    const summary = await prisma.event.groupBy({
      by: ['eventType'],
      _count: {
        eventType: true,
      },
    });
    
    console.log('\n📊 Event Summary:');
    summary.forEach((item) => {
      console.log(`  ${item.eventType}: ${item._count.eventType} events`);
    });
    
  } catch (error) {
    console.error('❌ Error generating events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateEvents();