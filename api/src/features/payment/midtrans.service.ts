import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const createSnapTransaction = async (reservation: any) => {
  const subtotal = Number(reservation.totalAmount);

  const tax = subtotal * 0.1;

  const grandTotal = subtotal + tax;

  const parameter = {
    transaction_details: {
      order_id: `${reservation.reservationCode}-${Date.now()}`,
      gross_amount: Math.round(grandTotal),
    },

    customer_details: {
      first_name: reservation.customerName || "Guest",
      email: reservation.email || "guest@mail.com",
    },

    item_details: [
      {
        id: reservation.id,
        name: "Room Booking",
        quantity: 1,
        price: subtotal,
      },
      {
        id: "tax",
        name: "Taxes & Fees",
        quantity: 1,
        price: tax,
      },
    ],
  };

  const transaction = await snap.createTransaction(parameter);

  return transaction.token;
};
