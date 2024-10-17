# Blog-MongoDB

## Description

Welcome to the Blog-MongoDB repository! This project showcases a blog site built using MongoDB as the primary database. The application allows users to create, read, update, and delete blog posts, making it a fully functional blogging platform. The project is designed to demonstrate the capabilities of MongoDB in a real-world application.

## Features

- **User Authentication**: Secure sign-up and login functionality.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Responsive Design**: User-friendly interface that works on various devices.
- **Tagging System**: Organize posts using tags for easier navigation.
- **Comments Section**: Engage with readers through comments on each blog post.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (or frameworks like React, Angular, etc.)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
```
git clone https://github.com/yourusername/blog-mongodb.git
cd blog-mongodb
```

2. **Install dependencies: Make sure you have Node.js installed. Then run:**
```
Copy code
npm install
```

3. **Set up MongoDB**:

  Make sure MongoDB is installed and running on your machine.
  Create a database for the blog or use a cloud service like MongoDB Atlas.

4. **Environment Variables: Create a .env file in the root directory and add the following**:

```
MONGODB_URI=mongodb://localhost:27017/yourdbname
PORT=3000
```

5. **Run the application**:

```
npm start
```

Your application should now be running at http://localhost:3000.
