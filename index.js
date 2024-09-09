// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Create a POST route for Dialogflow webhook
app.post('/webhook', (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;

  // Respond to 'Create Design' intent
  if (intentName === 'Create Design') {
    const designType = req.body.queryResult.parameters.design_type;
    const color = req.body.queryResult.parameters.color;
    
    // Example response
    const responseMessage = `You're looking to create a ${designType} using ${color}. Let's get started!`;

    // Send the response back to Dialogflow
    return res.json({
      fulfillmentText: responseMessage
    });
  }

  // Default fallback response for unsupported intents
  res.json({
    fulfillmentText: "I couldn't understand that request."
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
