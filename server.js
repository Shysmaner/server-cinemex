import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

app.use(cors());

app.get('/verify-payment', async (req, res) => {
  const sessionId = req.query.session_id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      res.json({ success: true, message: 'Pago confirmado' });
    } else {
      res.json({ success: false, message: 'Pago no realizado' });
    }
  } catch (error) {
    console.error('Error al verificar el pago:', error.message);
    res.status(500).json({ success: false, message: 'Error al verificar el pago' });
  }
});

// Render asigna PUERTO dinámico
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor backend corriendo en puerto', PORT);
});

