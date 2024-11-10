# Pans-and-More

A Full Stack MERN recipe sharing website where users can create accounts, post recipes and interact with other's recipes. It is an engaging web application designed for food enthusiasts who love to share and discover recipes.

## Features

- **User Authentication**: Register, log in, and manage user accounts.
- **Recipe Management**: Post new recipes, including image URLs, categories and detailed instructions.
- **Interactive Elements**: Like and save and comment on recipes.
- **Search & Filter**: Find recipes by name and filter by cuisine and type.
- **Responsive Design**: User friendly interface and responsive design for a great user experience.


## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB 
- **Authentication**: JWT 

## Installation

### Prerequisites

- Node.js and npm installed
- A MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ananyababuprasad/pans-and-more.git
   ```

2. Navigate to the project's backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory and add your environment variables:
   ```env
   MONGO_URI=your_mongodb_uri
   SECRET=your_jwt_secret
   PORT=you_port_number
   ```

4. Start the development server:
   ```bash
   node server.js
   ```
   
5. Navigate to the project's frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
   
6. Start the react-app:
   ```bash
   npm start
   ```

## Usage

1. Open your web browser and go to `http://localhost:3000` for the frontend.

2. The frontend application will be available at `http://localhost:3000`.

3. The frontend will interact with the backend API running on the port number specified in the `.env` file.
   
