import bcrypt from 'bcrypt';
const saltRounds = 10;

// Hash password
const password = "123456789"; // example password
const hashedPassword = await bcrypt.hash(password, saltRounds);

console.log(hashedPassword); // This is the hashed password you can store in your database
