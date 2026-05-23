import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}



export async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}