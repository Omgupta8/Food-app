// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51PTlfVRqK7uWhOLay1U3m20tTYEhBOiJNsE18roDqeWi2KpMh68yo2A6FWMkB7xxA7qySyMAUIk2PnJYUFNjKAWv00YwIWayvs"
);
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;

    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          amount: plan.price,
          currency: "inr",
          quantity: 1,
        }, 
      ],
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.status(200).json({
      status: "success",
      session 
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
}; 