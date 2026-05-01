import { useParams } from "react-router";
import FormRoom from "../components/FormRoom";

function EditRoomPage() {
  const { roomId } = useParams();

  return <FormRoom />;
}

export default EditRoomPage;
