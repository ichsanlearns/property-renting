import { GoogleLogin } from "@react-oauth/google";

type CredentialResponse = {
  credential?: string;
  clientId?: string;
  select_by?: string;
};

function GoogleButton({
  onSuccess,
}: {
  onSuccess: (response: CredentialResponse) => void;
}) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => console.error("Login Failed")}
      useOneTap={false}
      containerProps={{
        className: "absolute inset-0 opacity-0 w-full h-full",
      }}
    />
  );
}

export default GoogleButton;
