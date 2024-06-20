const orderCreateExample = {    
    //! "totalAmount": 100, // auto created
   //! "userID": "60c72b2f9b1d8c1a8c8d1e2b",  // create user first auto updated in order
   "userData":{
    "name": "John Doe",
    "email": "X5J2z@example.com",
    "number": "1234567890",
    "occupationType": "Business Owner",
    "occupationDescription": "We are a company.",

   },
    // "doneBy": "delwer", after create the order admin will be able to update it 
    "paymentDetails": [
      {
        "paymentType": "Card",
        "cardDetails": {
          "cardNumber": "1234567812345678",
          "cardHolderName": "John Doe",
          "expiryDate": "12/24"
        },
        "amount": 100,
        "status": "Pending"
      }
    ],
    //! "durationInDays": 7,  // auto created based on delivery date
    "description": "A sample order for testing.",
    "orderItems": [
      {
        "productId": "60c72b2f9b1d8c1a8c8d1e2c",  // Example ObjectId for product       
        "quantity": 2,
        "price": 50
      }, 
      {
        "productId": "60c72b2f9b1d8c1a8c8d1e2d",  // Example ObjectId for product
        "quantity": 1,
        "price": 150
      }
    ],
    //! "totalAmount": 250, // auto created based on order items
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "Anystate",
      "postalCode": "12345",
      "country": "USA"
    },
    "billingAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "Anystate",
      "postalCode": "12345",
      "country": "USA"
    },
    //! "status": "Pending",  auto create  need to secure 
   //! "orderDate": "2024-06-10T00:00:00.000Z",  auto create
  //!"deliveryDate": "2024-06-17T00:00:00.000Z" auto create
  } 