import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  logger.error('Error occurred:', error.message, error.stack);

  
  let status = 500;
  let message = 'Internal Server Error';

  
  if (error.message.includes('validation')) {
    status = 400;
    message = 'Validation Error';
  } else if (error.message.includes('not found')) {
    status = 404;
    message = 'Resource Not Found';
  }

  res.status(status).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};