# Personal Financial Tracker

A premium, state-of-the-art financial management platform designed for both personal and administrative oversight. Built with a modern tech stack, it features a stunning glassmorphic UI, real-time analytics, and enterprise-grade security.

## 🚀 Key Features

-   **Dual Perspective**: Seamlessly switch between a personal tracker and an administrative overview.
-   **Smart Transaction Management**: Track income and expenses with detailed categorization and history.
-   **Admin Command Center**: High-level platform metrics including user activity, financial performance, and security logs.
-   **Interactive Visualizations**: Beautiful, responsive charts powered by Recharts (Income vs Expense, Category breakdowns).
-   **Global Reach**: Full multi-language support (English and Amharic) with right-to-left readiness.
-   **Premium Aesthetics**: Adaptive Dark/Light mode with custom glassmorphic MUI components.
-   **Enterprise Security**: JWT-based authentication, password encryption, and detailed login logging.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React 19
-   **State Management**: Redux Toolkit (RTK Query)
-   **UI Library**: Material UI (MUI)
-   **Charts**: Recharts
-   **Styling**: Vanilla CSS + MUI System
-   **Routing**: React Router 7

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express
-   **Database**: PostgreSQL
-   **ORM**: Sequelize
-   **Validation**: Joi
-   **Documentation**: Swagger UI

---

## ⚙️ Local Setup Instructions

Follow these steps to get the project running on your local machine.

### Prerequisites
-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [PostgreSQL](https://www.postgresql.org/) (installed and running)
-   An `.env` file for both backend and frontend.

### 1. Database Setup
1. Create a new PostgreSQL database (e.g., `financial_tracker`).
2. The Databes (financial_tracker) and tables will be automatically created by Sequelize when you start the server.

### 2. Backend Configuration
1. Navigate to the backend directory:
    ```bash
    cd Backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in `Backend/src/config/.env` and add the following:
    ```env
    PORT=5000
    DATABASE_URL=postgres://user:password@localhost:5432/financial_tracker
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRES_IN=30d
    CLIENT_URL=http://localhost:5173
    
    # Optional: Email configurations
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```
    *Server will start at `http://localhost:5000`*

### 3. Frontend Configuration
1. Navigate to the frontend directory:
    ```bash
    cd Frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. (Optional) Create a `.env` file if you need to override the API target:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
4. Start the frontend development server:
    ```bash
    npm run dev
    ```
    *Client will start at `http://localhost:5173`*

---

## 📁 Project Structure

```text
Financial_Tracker/
├── Backend/                # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database & env config
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── server.js           # Entry point
└── Frontend/               # React + MUI SPA
    ├── src/
    │   ├── app/            # Redux store
    │   ├── components/     # Reusable UI components
    │   ├── features/       # Modular features (auth, admin, transactions)
    │   ├── hooks/          # Custom hooks (translation, role)
    │   ├── pages/          # Full page views
    │   └── theme/          # MUI theme configuration
    └── index.html          # Gateway
```

## 📄 Documentation
Once the backend is running, you can access the interactive API documentation at:
`http://localhost:5000/api-docs`
