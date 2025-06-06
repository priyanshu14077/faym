import { PrismaClient, EventType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { EventRequest, AnalyticsQuery } from '../types';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export class EventService {
  async createEvent(eventData: EventRequest) {
    try {
      const eventId = uuidv4();
      
      const event = await prisma.event.create({
        data: {
          eventId: eventId,
          userId: eventData.user_id,
          eventType: eventData.event_type as EventType,
          payload: eventData.payload,
        },
      });

      logger.info(`Event created with ID: ${event.eventId}`);
      return { success: true, event_id: event.eventId };
    } catch (error) {
      logger.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }

  async getEventCounts(query: AnalyticsQuery) {
    try {
      const whereClause: any = {};

      if (query.event_type) {
        whereClause.eventType = query.event_type;
      }

      if (query.start_date || query.end_date) {
        whereClause.timestamp = {};
        if (query.start_date) {
          whereClause.timestamp.gte = new Date(query.start_date);
        }
        if (query.end_date) {
          whereClause.timestamp.lte = new Date(query.end_date);
        }
      }

      const count = await prisma.event.count({
        where: whereClause,
      });

      return { total_events: count };
    } catch (error) {
      logger.error('Error getting event counts:', error);
      throw new Error('Failed to get event counts');
    }
  }

  async getEventCountsByType(query: AnalyticsQuery) {
    try {
      const whereClause: any = {};

      if (query.start_date || query.end_date) {
        whereClause.timestamp = {};
        if (query.start_date) {
          whereClause.timestamp.gte = new Date(query.start_date);
        }
        if (query.end_date) {
          whereClause.timestamp.lte = new Date(query.end_date);
        }
      }

      const counts = await prisma.event.groupBy({
        by: ['eventType'],
        where: whereClause,
        _count: {
          eventType: true,
        },
      });

      const result: { [key: string]: number } = {};
      counts.forEach((item) => {
        result[item.eventType] = item._count.eventType;
      });

      return result;
    } catch (error) {
      logger.error('Error getting event counts by type:', error);
      throw new Error('Failed to get event counts by type');
    }
  }
}