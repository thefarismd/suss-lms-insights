import bcrypt from 'bcryptjs';

const plainPassword = 'instructor123';

bcrypt.hash(plainPassword, 12).then((hash) => {
  console.log('Hashed password:', hash);
});

// npx ts-node src/scripts/hashPassword.ts