const { connectToDatabase, closeDatabase } = require('../scripts/database')
const Author = require('../models/author');

async function seedAuthors() {
  const AuthorData = [
    {
      name: 'Archie Lamb',
      email: 'archie.lamb@demo.com',
    },
    {
      name: 'Aysha Uddin',
      email: 'aysha.uddin@demo.com',
    },
    {
      name: 'Hannah Scott',
      email: 'hannah.scott@demo.com',
    },
    {
      name: 'Yasmin Asghar',
      email: 'yasmin.asghar@demo.com',
    },
    {
      name: 'Liam Johnson',
      email: 'liam.johnson@demo.com',
    },
    {
      name: 'Aanu Fowowe',
      email: 'aanu.fowowe@demo.com',
    },
    {
      name: 'Zac Efron',
      email: 'zac.efron@demo.com',
    },
    {
      name: 'Maya Patel',
      email: 'maya.patel@demo.com',
    }
  ];

  return Author.create(AuthorData);
}

async function addAuthors() {
  try {
    await connectToDatabase();
    await Author.deleteMany({});
    
    const seededAuthors = await seedAuthors();
    console.log('Users seeded successfully:', seededAuthors);
  } catch (error) {
    console.error('Error seeding Authors:', error);
  } finally {
    await closeDatabase()
  }
}

addAuthors()
