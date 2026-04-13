import { useParams } from "react-router";

function Reservation() {
  const { reservationCode } = useParams();

  return (
    <div className="flex justify-center items-center pt-10">
      <h1>Reservation {reservationCode}</h1>
    </div>
  );
}

export default Reservation;
