import type { NextApiRequest, NextApiResponse } from 'next';

const createCharge = async (params: any) => {
  const apiKey = process.env.COMMERCE_API_KEY;
  if (!apiKey) {
    throw new Error('Commerce API key is not defined');
  }

  const url = "https://api.commerce.coinbase.com/charges";

  const requestBody = {
    local_price: {
      amount: params.amount,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    name: params.name,
    description: `${params.name} charge`,
    redirect_url: "/", // Change as needed
  };

  const payload: RequestInit = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CC-Api-Key": apiKey, // API key from Commerce
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, payload);
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating charge:", error);
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const chargeData = await createCharge(req.body);
      res.status(200).json(chargeData);
    } catch (error) {
      console.error('Error creating charge:', error);
      res.status(500).json({ error: 'Error creating charge' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
