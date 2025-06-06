import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/eventService';
import { AnalyticsQuery } from '../types';

const eventService = new EventService();

export const getEventCounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: AnalyticsQuery = {
      event_type: req.query.event_type as any,
      start_date: req.query.start_date as string,
      end_date: req.query.end_date as string,
    };

    const result = await eventService.getEventCounts(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getEventCountsByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: AnalyticsQuery = {
      start_date: req.query.start_date as string,
      end_date: req.query.end_date as string,
    };

    const result = await eventService.getEventCountsByType(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};