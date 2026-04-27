function PasswordVisibility({
  showPassword,
  setShowPassword,
  disabled = false,
}: {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      tabIndex={-1}
      aria-label={showPassword ? "Hide password" : "Show password"}
      title={showPassword ? "Hide password" : "Show password"}
      onClick={() => setShowPassword(!showPassword)}
      className={`absolute right-4 top-1/2 -translate-y-1/2  transition-colors ${
        disabled
          ? "cursor-not-allowed opacity-25"
          : "cursor-pointer hover:text-primary"
      }`}
      type="button"
    >
      <span
        className={`material-symbols-outlined ${
          showPassword ? "text-primary" : ""
        }`}
      >
        {showPassword ? "visibility" : "visibility_off"}
      </span>
    </button>
  );
}

export default PasswordVisibility;
