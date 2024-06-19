import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, so we can handle raw body
  },
};

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET; // Ensure you set this in your environment variables

const buffer = async (readable: Readable) => {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const rawBody = await buffer(req);
    const signature = req.headers['x-cc-webhook-signature'] as string;

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET!);
    hmac.update(rawBody);
    const computedSignature = hmac.digest('hex');

    if (computedSignature !== signature) {
      return res.status(400).send('Invalid signature');
    }

    const event = JSON.parse(rawBody.toString()).event;
    console.log('Received event:', event);

    // Handle the event based on its type
    // Just logging in console for now handle it appropriately later
    switch (event.type) {
      case 'charge:created':
        console.log('Charge created:', event.data);
        break;
      case 'charge:confirmed':
        console.log('Charge confirmed:', event.data);
        break;
        case 'charge:failed':
          console.log('Charge failed:', event.data);
          break;
        case 'charge:delayed':
          console.log('Charge delayed:', event.data);
          break;
        case 'charge:pending':
          console.log('Charge pending:', event.data);
          break;
        case 'charge:resolved':
          console.log('Charge resolved:', event.data);
          break;
                
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send('Webhook received');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

export default handler;
