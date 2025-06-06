import { Request, Response, NextFunction } from 'express';
import { EventRequest } from '../types';

export const validateEventRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, event_type, payload } = req.body as EventRequest;

  // Check required fields
  if (!user_id || !event_type || !payload) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: user_id, event_type, and payload are required',
    });
  }

  // Validate event_type
  const validEventTypes = ['view', 'click', 'location'];
  if (!validEventTypes.includes(event_type)) {
    return res.status(400).json({
      success: false,
      message: `Invalid event_type. Must be one of: ${validEventTypes.join(', ')}`,
    });
  }

  // Validate user_id
  if (typeof user_id !== 'string' || user_id.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'user_id must be a non-empty string',
    });
  }

  // Validate payload
  if (typeof payload !== 'object' || payload === null) {
    return res.status(400).json({
      success: false,
      message: 'payload must be a valid object',
    });
  }

  next();
};