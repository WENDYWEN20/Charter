Retailer Rewards Program

A React app built with Vite to calculate customer reward points based on transactions over a flexible period.

Features





Calculates points: 1 point per dollar over $50, 2 points per dollar over $100.



Displays points per customer per month (dynamically derived from data) and total.



Uses mock transaction data.

Tech Stack





Vite



React





Clone the repo: git clone <repo-url>



Install dependencies: npm install


```Run dev server: npm run dev``` 





Open: http://localhost:5173

Data

Mock data in src/data/transactions.js includes four customers with transactions for April to Jun 2025. The solution dynamically extracts months from transaction dates.

Calculation Logic





src/utils/calculatePoints.js computes points per transaction and aggregates by customer/month.



Example: $120 = 50 points ($51–$100) + 40 points ($101–$120) = 90 points.

Months are derived from transaction dates and sorted chronologically.
