import React, { useState, useEffect } from "react";

export default function CryptoPaymentButton(params: any) {
  const [hostedUrl, setHostedUrl] = useState('');

  useEffect(() => {
    const fetchChargeData = async () => {
      try {
        console.log("Fetch");
        console.log(params);
        const response = await fetch('/api/createCharge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params.params),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const chargeData = await response.json();
        if (chargeData && chargeData.data && chargeData.data.hosted_url) {
          setHostedUrl(chargeData.data.hosted_url);
        }
      } catch (error) {
        console.error('Error fetching charge data:', error);
      }
    };

    fetchChargeData();
  }, [params]);

  const handleClick = () => {
    console.log("Click!");
    if (hostedUrl) {
      window.location.href = hostedUrl;
    }
  };

  return (
    <button className="btn btn--rounded btn--yellow btn--border" color="primary" onClick={handleClick} disabled={!hostedUrl}>
      Pay with Crypto
    </button>
  );
}
