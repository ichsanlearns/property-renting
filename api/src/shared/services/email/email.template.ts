export const verifyEmailTemplate = (url: string) => {
  return `
    <h1>Verify your email</h1>
    <p>Click the link below:</p>
    <a href="${url}">Verify Email</a>
  `;
};
