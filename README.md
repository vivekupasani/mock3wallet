# 🦾 Mock 3 Wallet 

A full-stack project simulating a **Web3 wallet** system using **Node.js**, **Express**, **MongoDB**, and a **React Native** frontend. This system replicates wallet creation, token management, transactions, contact book features, and user settings — ideal for building or learning a real-world crypto app backend before integrating actual blockchain/Web3 tech.

---

## 🚀 Features


### 💻 Frontend (React / React Native)
- 👤 Login & Register screen with token handling
- 🧳 Wallet screen: view, create, import wallets
- 💰 Token screen: list tokens and balances
- 📤 Send transaction screen
- 📖 Contact screen to manage saved addresses
- ⚙️ Settings UI to toggle app options

### 🔗 Backend (Express + MongoDB)
- 🔐 User authentication (register, login, profile)
- 💼 Wallet creation and CRUD
- 💸 Transaction handling (pending, confirmed, failed)
- 🪙 Token listing and adding custom tokens
- 📒 Address book (contacts per user)
- ⚙️ User preferences and app settings
- 🧱 Clean MVC structure for maintainability

---
## 📸 Preview
[🎥 Watch Demo Video](https://github.com/user-attachments/assets/ef097848-7ba3-4ae8-98b6-a88eec683fca) 

---
## ⚙️ Technologies

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React Native 
- **Utilities**: Axios, Dotenv, CORS

---

## 🧪 Setup

### 🔧 Backend Setup
```bash
git clone https://github.com/vivekupasani/mock3wallet.git
cd mock3wallet/backend
npm install
touch .env
```

#### `.env` Example
```
PORT=3000
MONGODB_URI=mongodb://localhost/web3wallet
```

```bash
npm start
```

### 💻 Frontend Setup (React Native Example)
```bash
cd ../frontend
npm install
npm start
```

---

## 🔌 Key API Endpoints

### 🔐 Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/profile`

### 💼 Wallets
- POST `/api/wallets/create`
- GET `/api/wallets`
- GET `/api/wallets/:walletId`

### 💸 Transactions
- POST `/api/transactions/send`
- GET `/api/transactions`
- GET `/api/transactions/:transactionId`
- GET `/api/transactions/wallet/:walletId`

---

## 🔮 Roadmap
- ✅ JWT auth & token rotation
- ✅ MVC refactor for backend
- ⏳ Blockchain integration using ethers.js or web3.js
- ⏳ Unit & integration testing

---

> This project is a solid base for real-world crypto wallet apps.




