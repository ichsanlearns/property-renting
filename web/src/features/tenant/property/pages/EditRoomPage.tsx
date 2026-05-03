import { useParams } from "react-router";
import FormRoom from "../components/FormRoom";
import { useRoom } from "../hooks/room.query";
import LoaderFetching from "../../../../shared/ui/LoaderFetching";
import { useUpdateRoom } from "../hooks/room.mutation";

function EditRoomPage() {
  const { roomId } = useParams();

  const { mutate: updateRoom } = useUpdateRoom(roomId || "");

  const handleOnSubmit = (params: FormData) => {
    updateRoom(params);
  };

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

  return (
    <FormRoom
      defaultValues={roomData}
      mode="edit"
      handleOnSubmit={handleOnSubmit}
    />
  );
}

export default EditRoomPage;
