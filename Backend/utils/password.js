const bcrypt = require("bcrypt");

async function encrypted(plainPassword) {
  // bcrypt.hash(password, saltRounds) — yahan “12” salt rounds hai.
  // Salt rounds jitne zyada honge, hashing process utna hi “slower” hoga, par zyada secure hoga. :contentReference[oaicite:1]{index=1}
  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  // console.log("HashedPasswordd", hashedPassword); // debug ke liye output kar rahe ho hashed password — production mein generally avoid karna chahiye (security restrictions).
  return hashedPassword; // hashed password return karoge taaki ise database mein store kar sako.
}

async function decrypt(plainPassword, hashPassword) {
  return await bcrypt.compare(plainPassword, hashPassword); // bcrypt.compare takes user input in plain text + stored hash, then internally salt + rounds nikal kar check karta hai.
  // Agar match ho jaye toh true return karega, warna false. :contentReference[oaicite:2]{index=2}
}

module.exports = { encrypted, decrypt };
