#  MoversPadi – Backend System

MoversPadi is a **fleetless logistics marketplace** that connects customers with independent movers, transport providers, and logistics companies for services such as **dispatch, haulage, towing, and transport (car/bus)**.

This repository/document focuses on the **backend development**, covering system architecture, database design, business logic, and API implementation.

---

##  Project Overview

MoversPadi enables:

* Customers to request and track logistics services
* Movers and transport providers to accept and complete jobs
* Logistics companies to manage fleets and drivers
* Admins to oversee operations, verification, and payments

---

##  My Role (Backend Developer)

As the backend developer, I am responsible for:

* Designing and implementing **RESTful APIs**
* Structuring and managing the **database schema**
* Implementing **authentication & authorization**
* Building **verification workflows**
* Developing **service request & job logic**
* Integrating **payment and wallet systems**
* Ensuring **security, performance, and scalability**

---

##  Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** (or relational DB based on implementation)
* **Mongoose / ORM**
* JWT Authentication
* Cloud storage (for document uploads)

---

##  System Architecture

The backend is modular and follows a scalable structure:

```
server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
└── config/
```

---

##  Core Features (Backend)

### 1. Authentication & Authorization

* User registration (role-based)
* OTP verification (email/SMS)
* JWT-based authentication
* Role-based access control (RBAC)

---

### 2. Role-Based System

Supported roles:

* Customer
* Independent Mover
* Transport Provider
* Logistics Company
* Admin

Each role has **custom onboarding, permissions, and dashboard logic**

---

### 3. Verification System

* Document upload (ID, vehicle, CAC, etc.)
* Admin approval/rejection workflow
* Status tracking:

  * Pending
  * Approved
  * Rejected
  * Resubmission Required
  * Suspended

---

### 4. Service Request System

* Create logistics requests (pickup → drop-off)
* Service types:

  * Dispatch
  * Haulage
  * Tow
  * Transport (Car/Bus)
* Job lifecycle:

  * Pending → Matched → Accepted → In Progress → Completed

---

### 5. Matching & Tracking

* Geo-location based provider matching
* Real-time job tracking
* Status updates and logs

---

### 6. Payment & Wallet System

* Payment gateway integration
* Wallet management:

  * Customer refunds
  * Mover earnings
  * Company earnings
  * Admin commission
* Automatic **commission split logic**

---

### 7. Ratings & Reviews

* Post-service rating (1–5)
* Feedback system
* Linked to completed jobs

---

### 8. Notifications

* In-app notifications
* Email/SMS support (extendable)
* Event-driven alerts (job updates, approvals, etc.)

---

### 9. Admin System

* User management
* Verification queue
* Job monitoring
* Commission configuration
* Dispute handling

---

##  Database Design

The system uses a **relational-style structured schema** with key entities:

### Core Tables:

* `users`, `roles`, `profiles`
* `companies`, `vehicles`, `company_drivers`
* `service_requests`, `request_tracking`, `job_status_logs`
* `transactions`, `wallets`, `payouts`
* `ratings`, `notifications`, `support_tickets`

---

### 🔑 Key Relationships

* Users belong to roles
* Service requests link customers, movers, vehicles, and companies
* Transactions link to service requests
* Wallets handle financial flows
* Verification tables enforce trust and compliance

---

##  Business Logic Highlights

###  Registration

* Customers → **instant access after OTP**
* Movers/ კომპანიess → **must be verified before accepting jobs**

---

###  Payment Flow

1. Customer makes payment
2. Payment is verified via gateway
3. Job is executed
4. On completion:

   * Commission is calculated
   * Funds are split automatically
   * Wallets are updated

---

###  Commission Example

If a job costs ₦10,000:

* Admin (20%) → ₦2,000
* Provider → ₦8,000

---

###  Restrictions

* Unverified movers **cannot accept jobs**
* Suspended users lose access
* Jobs must be completed before payout

---

##  Backend Modules

* Auth Module
* User & Profile Module
* Verification Module
* Vehicle Module
* Company Module
* Service Request Module
* Matching Module
* Job Management Module
* Payment & Wallet Module
* Ratings Module
* Notification Module
* Admin Module

---

##  Setup Instructions

### 1. Clone repository

```
git clone https://github.com/your-username/moverspadi-backend.git
cd moverspadi-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Environment variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
PAYMENT_API_KEY=your_payment_key
```

### 4. Run server

```
npm run dev
```

---

## 📅 Development Timeline

The backend is developed alongside a full product team over **8 weeks**, covering:

* Week 1–2: Auth, roles, verification
* Week 3–4: Dashboards & booking system
* Week 5–6: Tracking & payments
* Week 7–8: Notifications, ratings, optimization

---

##  MVP Features

* Role-based onboarding & dashboards
* Verification & compliance workflows
* Service booking & tracking
* Payment & commission system
* Notifications & ratings
* Admin control panel

---

##  Future Improvements

* Real-time WebSocket tracking
* AI-based pricing optimization
* Fraud detection system
* Advanced analytics dashboard
* Mobile-first API optimization

---

##  Author

Backend Developer: *Your Name*
GitHub: https://github.com/your-username

---

## 📄 License

This project is for educational and product development purposes.
