// hash-password.js
import { hash as _hash } from "bcrypt";

const password = "admin123"; // change to your desired password
_hash(password, 10).then((hash) => {
  console.log("Hashed password:", hash);
});
