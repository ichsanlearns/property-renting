import Footer from "../../../shared/ui/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailChange } from "../../auth/hooks/auth.mutation";
import { useEffect } from "react";

function VerifyEmailChangePage() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const token = params.get("token");

  const {
    mutate: verifyEmailChange,
    isPending,
    isSuccess,
    isError,
  } = useVerifyEmailChange();

  useEffect(() => {
    if (token) {
      verifyEmailChange(token);
    }
  }, [token, verifyEmailChange]);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body">
      <main className="grow flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-fixed rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
        </div>
        <div className="relative z-10 bg-surface w-full max-w-md rounded-xl p-10 text-center flex flex-col items-center">
          <div className="mb-8 flex items-center justify-center w-16 h-16 bg-primary-fixed rounded-full">
            <span
              className={`material-symbols-outlined  text-3xl ${
                isPending
                  ? "text-primary"
                  : isError
                    ? "text-error"
                    : isSuccess
                      ? "text-success"
                      : "text-primary"
              }`}
              data-icon="mark_email_read"
              data-weight="fill"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              {isPending
                ? "mark_email_read"
                : isError
                  ? "error"
                  : isSuccess
                    ? "check_circle"
                    : "mark_email_read"}
            </span>
          </div>
          {isPending && (
            <div className="mb-6 relative w-12 h-12">
              <svg
                className="animate-spin text-primary w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth={4}
                ></circle>
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          )}

          <h1 className="text-2xl font-headline font-bold text-on-surface mb-3 tracking-tight">
            {isPending
              ? "Verifying your email..."
              : isError
                ? "Failed to verify email"
                : isSuccess
                  ? "Email updated successfully"
                  : "Verifying your email..."}
          </h1>
          <p className="text-on-surface-variant font-body text-base">
            {isPending
              ? "Please wait while we confirm your request"
              : isError
                ? "The link is invalid or has expired"
                : isSuccess
                  ? "Your email has been updated, You can now continue using your account"
                  : "Please wait while we confirm your request"}
          </p>
          {!isPending && (
            <button
              onClick={() => navigate("/myprofile")}
              className="w-full bg-primary hover:bg-primary-fixed-dim text-on-primary font-label font-medium py-3 px-6 rounded-lg transition-colors duration-200 active:scale-[0.98] cursor-pointer mt-5"
            >
              Go to Profile
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default VerifyEmailChangePage;
