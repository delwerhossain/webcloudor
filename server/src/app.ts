/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import router from './routes';
const app = express();

//parsers
app.use(express.json());

app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('SERVER RUNNING!');
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
//! old error handelar
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   let message: any;
//   let finalMessage: any;

//   // zod error handelar
//   if (err instanceof ZodError) {
//     let errorMessage: any;

//     const findErrorZod = (err: any) => {
//       const errorArray = err.issues.map(
//         (er: { message: any; errors: any; path: any }) => {
//           return `${er.path[er.path.length - 1]} is ${er.message}.`;
//         },
//       );

//       if (errorArray.length > 0) {
//         errorMessage = errorArray.join(' ');
//         message = 'Validation Error';
//         finalMessage = errorMessage;
//       }
//     };
//     findErrorZod(err);
//   }

//   //  Cast error handelar//
//   else if (err?.name === 'CastError') {
//     (message = `Cast Error`), (finalMessage = `${err.value}is not a valid ID!`);
//   }
//   //Duplocate errror
//   else if (err?.code === 11000) {
//     (message = `Duplicate Entry`),
//       (finalMessage = `${err.keyValue.title}  is already exists`);
//   }
//   //  Validation error
//   else if (err?.name === 'ValidationError') {
//     (message = `Validation Error`),
//       (finalMessage = `${err.message}`);
//   }

//   res.status(500).json({
//     success: false,
//     message: message,
//     errorMessage: finalMessage,
//     errorDetails: err,
//     stack: err.stack,
//   });
// });

// new error handelar
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

export default app;
