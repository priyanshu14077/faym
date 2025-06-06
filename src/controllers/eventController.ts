import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/eventService';
import { EventRequest } from '../types';

const eventService = new EventService();

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventData: EventRequest = req.body;
    const result = await eventService.createEvent(eventData);
    
    res.status(202).json(result);
  } catch (error) {
    next(error);
  }
};