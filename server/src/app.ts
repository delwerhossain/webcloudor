/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { CategoryRoutes } from './modules/Category/Category.routes';
import { ReviewRoutes } from './modules/Review/Review.routes';
import { ZodError } from 'zod';
import { OrderRoutes } from './modules/Order/Order.routes';
const app = express();

//parsers
app.use(express.json());


app.use(cors());

app.use('/api/orders', OrderRoutes);
// for Get the Best Order Based on Average Review (Rating)  /api/order/best
app.use('/api/order', OrderRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/reviews', ReviewRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('SERVER RUNNING!'); 
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let message: any;
  let finalMessage: any;

  // zod error handelar
  if (err instanceof ZodError) {
    let errorMessage: any;

    const findErrorZod = (err: any) => {
      const errorArray = err.issues.map(
        (er: { message: any; errors: any; path: any }) => {
          return `${er.path[er.path.length - 1]} is ${er.message}.`;
        },
      );

      if (errorArray.length > 0) {
        errorMessage = errorArray.join(' ');
        message = 'Validation Error';
        finalMessage = errorMessage;
      }
    };
    findErrorZod(err);
  }

  //  Cast error handelar//
  else if (err?.name === 'CastError') {
    (message = `Cast Error`), (finalMessage = `${err.value}is not a valid ID!`);
  }
  //Duplocate errror
  else if (err?.code === 11000) {
    (message = `Duplicate Entry`),
      (finalMessage = `${err.keyValue.title}  is already exists`);
  }
  //  Validation error
  else if (err?.name === 'ValidationError') {
    (message = `Validation Error`),
      (finalMessage = `${err.message}`);
  }

  res.status(500).json({
    success: false,
    message: message,
    errorMessage: finalMessage,
    errorDetails: err,
    stack: err.stack,
  });
});
export default app;
