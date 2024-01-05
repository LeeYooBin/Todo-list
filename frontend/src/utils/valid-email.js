export const isValidEmail = (email) => {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};