import { useParams } from "react-router";
import FormRoom from "../components/FormRoom";
import { useRoom } from "../hooks/room.query";
import LoaderFetching from "../../../../shared/ui/LoaderFetching";

function EditRoomPage() {
  const { roomId } = useParams();

  const {
    data: roomData,
    isLoading,
    error,
  } = useRoom({ roomId: roomId || "" });

  if (isLoading) {
    return <LoaderFetching />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <FormRoom defaultValues={roomData} mode="edit" />;
}

export default EditRoomPage;
