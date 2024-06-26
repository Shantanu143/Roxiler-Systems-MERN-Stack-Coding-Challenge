# Roxiler-Systems-MERN-Stack-Coding-Challenge

live website link :- https://frontend-for-tthe-project.onrender.com/

solution :- 


Project Name : Roxiler-Systems-MERN-Stack-Coding-Challenge
Description : this is the assigment solution for Roxiler-Systems here i used tech stack as MERN and for the hosting purpose i am using render do let me know there is some bug fix or batter approaches so can learn more about it 

Table of Contents
Installation
Usage
Endpoints
Environment Variables
Contributing
License
Installation
To get started with this project, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/Shantanu143/Roxiler-Systems-MERN-Stack-Coding-Challenge.git
Navigate to the project directory:


cd Roxiler-Systems-MERN-Stack-Coding-Challenge
then navigate trough the backend and folders and using cd backend & cd frontend
Install dependencies:

For Backend 
cd backend
npm install

Usage
To run the Node.js backend server:

npm run dev
The server will start running at http://localhost:5000.

For Frontend

cd frontend
npm install

Usage
To run the react frontend app:

npm run dev
The server will start running at http://localhost:5173.



Endpoints
1. Initialize Database
Endpoint: GET /api/initialize
Description: Initializes the database with seed data fetched from an external API.
Usage: Access this endpoint once to populate the database.

1. Get Transactions
Endpoint: GET /api/transactions
Description: Fetches transactions (products) based on optional query parameters.
Query Parameters:
month: Month in MM format
search: Optional search string for title or description
page: Page number for pagination
perPage: Number of items per page
Returns: Array of transactions matching the query.

1. Get Statistics
Endpoint: GET /api/statistics
Description: Retrieves total sale amount, sold items, and unsold items for a specified month.
Query Parameters:
month: Month in MM format
Returns: JSON object with total statistics.

1. Get Bar Chart Data
Endpoint: GET /api/bar-chart
Description: Generates bar chart data based on price ranges for sold products within a specified month.
Query Parameters:
month: Month in MM format
Returns: Array of objects with price range and count of products in each range.

1. Get Pie Chart Data
Endpoint: GET /api/pie-chart
Description: Generates pie chart data based on product categories for sold products within a specified month.
Query Parameters:
month: Month in MM format
Returns: Array of objects with category and count of products sold in each category.

1. Get Combined Data
Endpoint: GET /api/combined-data
Description: Fetches transactions, statistics, bar chart data, and pie chart data for a specified month.
Query Parameters:
month: Month in MM format
Returns: JSON object with transactions, statistics, barChart, and pieChart data.
Environment Variables
Create a .env file in the root directory of the project. Add the following environment variables:

PORT=5000
API_URL="https://s3.amazonaws.com/roxiler.com/product_transaction.json"
MONGO_URI="mongodb://atlas url"

PORT: Port number on which the server will run.
API_URL: URL of the external API from which seed data is fetched.
MONGO_URI: MongoDB connection URI.

