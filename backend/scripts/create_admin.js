const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function main() {
  const [ , , email, name, password ] = process.argv;

  if (!email || !name || !password) {
    console.error('Usage: node create_admin.js <email> <name> <password>');
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

  // Modern mongoose no longer requires these options; pass only the URI.
  await mongoose.connect(mongoUri);

  try {
    const hash = await bcrypt.hash(password, 10);

    const doc = await User.findOneAndUpdate(
      { email },
      { $set: { name, password: hash, role: 'admin' } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Admin user created/updated:');
    console.log({ id: doc._id.toString(), email: doc.email, role: doc.role });
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

main();
