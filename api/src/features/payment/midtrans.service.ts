import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const createSnapTransaction = async (reservation: any) => {
  const parameter = {
    transaction_details: {
      order_id: `${reservation.reservationCode}-${Date.now()}`,
      gross_amount: Number(reservation.totalAmount),
    },
    customer_details: {
      first_name: reservation.customerName || "Guest",
      email: reservation.customerEmail || "guest@mail.com",
    },
  };

  const transaction = await snap.createTransaction(parameter);

  return transaction.token;
};
