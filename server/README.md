# Order Review

Brief project description

## Table of Contents

- [Technology Stack](#technology-stack)
- [Models](#models)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Instructions](#instructions)
- [Coding Quality](#coding-quality)
- [Comments](#comments)
- [API Endpoint Adherence](#api-endpoint-adherence)
- [Validation and Error Handling](#validation-and-error-handling)
- [Coding Tools and Libraries](#coding-tools-and-libraries)
- [Coding Style](#coding-style)
- [Data Sets for Examination](#data-sets-for-examination)
- [Submission](#submission)


## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Data Modeling (ODM) and Validation Library:** Mongoose for MongoDB

## Models

1. **Order Model**
   - Fields:
     - `_id` (Object ID): A distinctive identifier generated by MongoDB.
     - `email` (String): A unique email of the order.
     - ...

2. **Category Model**
   - Fields:
     - `_id` (Object ID): A distinctive identifier generated by MongoDB.
     - `name` (String): A unique name of the category.
     - ...

3. **Review Model**
   - Fields:
     - `_id` (Object ID): A distinctive identifier generated by MongoDB.
     - `orderId` (Object ID): A reference to the order collection.
     - ...

## Endpoints

1. **Create a Order**
   - Endpoint: `/api/order`
   - Method: `POST`
   - Request Body: 
     ```json
     {
         "email": "Sample Order",
         "name": "Jane Doe",
         ...
     }
     ```
   - Response:
     ```json
     {
         "success": true,
         "statusCode": 201,
         "message": "Order created successfully",
         ...
     }
     ```

2. **Get Paginated and Filtered Orders**
   - Endpoint: `/api/orders`
   - Method: `GET`
   - Query Parameters: 
     ```
     ?page=1&limit=10&sortBy=startDate&sortOrder=desc&minPrice=20.00&maxPrice=50.00&tags=Programming&startDate=2023-01-01&endDate=2023-12-31&userID=English&doneBy=Tech Academy&durationInDays=8&level=Intermediate
     ```
   - Response:
     ```json
     {
         "success": true,
         "statusCode": 200,
         "message": "Orders retrieved successfully",
         ...
     }
     ```
   ...

## Error Handling

- Implement proper error handling throughout the application.
- Use global error handling middleware to catch and handle errors.
- Provide appropriate error responses with status codes and error messages.

## Validation

- Use Joi/Zod to validate incoming data for order, category, and review creation and updating operations.
- Ensure that the data adheres to the structure defined in the models.
- Handle validation errors gracefully and provide meaningful error messages in the API responses.

## Instructions

- **Coding Quality:**
  - Write clean, modular, and well-organized code.
  - ...

- **Comments:**
  - Provide inline comments to explain complex sections of code or logic.
  - ...

- **API Endpoint Adherence:**
  - Strictly follow the provided API endpoint structure and naming conventions.
  - ...

- ...

## Submission
- **GitHub Repository Link:**
  - <a href="https://github.com/Porgramming-Hero-web-order/l2b2a3-order-review-delwerhossain">Repository Link</a>

<!-- 
- **Live Deployment Link:**
  - [Your Live Deployment Link]

- **Recorded Video Link:**
  - [Your Recorded Video Link]
 -->
