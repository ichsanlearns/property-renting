export const resetPasswordEmailTemplate = (url: string) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px 0;">
    <div style="max-width: 520px; margin: auto; background: #ffffff; border-radius: 8px; padding: 32px; text-align: center;">
      
      <h2 style="margin-bottom: 16px; color: #111827;">
        Reset Your Password 🔑
      </h2>

      <p style="color: #4b5563; font-size: 14px; margin-bottom: 24px;">
        We received a request to reset your password. Click the button below to set a new one.
      </p>

      <a href="${url}" 
         style="
           display: inline-block;
           padding: 12px 24px;
           background-color: #111827;
           color: #ffffff;
           text-decoration: none;
           border-radius: 6px;
           font-weight: 500;
           margin-bottom: 24px;
         ">
        Reset Password
      </a>

      <p style="font-size: 12px; color: #9ca3af;">
        This link will expire soon for security reasons.
      </p>

      <p style="font-size: 12px; color: #9ca3af;">
        If you didn’t request a password reset, you can safely ignore this email.
      </p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="font-size: 12px; color: #9ca3af;">
        If the button doesn’t work, copy and paste this link:
      </p>

      <p style="word-break: break-all; font-size: 12px; color: #6b7280;">
        ${url}
      </p>

    </div>
  </div>
  `;
};
