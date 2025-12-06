UniPay – Digital Banking & E-Wallet Management Platform





UniPay is a complete and modern platform designed for managing bank accounts, financial transactions, and internal employee operations.
It provides a modular, secure, and scalable architecture suitable for modern digital banking solutions.

🎯 Main Features
🔹 Client Interface

Real-time balance consultation

Multi-account management

Detailed transaction history

Internal & inter-bank transfers

Bank synchronization through Plaid

🔹 Employee Interface

Teller: day-to-day banking operations

Manager: supervision, branch overview & reports

Administrator: employee management, roles & permissions

🔹 Cross-Functional Features

Secure authentication (encrypted server-side sessions)

RBAC (Role-Based Access Control)

Multi-bank connectivity with Dwolla

Modern UI built with Next.js 15 and Tailwind CSS 4

🧱 Technical Architecture
UniPay
│
├── Frontend
│   ├── Next.js 15
│   ├── React.js
│   ├── Tailwind CSS 4
│   └── Shadcn UI
│
├── Backend
│   ├── Appwrite (Auth, Database, Storage)
│   ├── Plaid API
│   └── Dwolla API
│
└── Database (Appwrite Collections)
    ├── APPWRITE_CLIENT
    ├── APPWRITE_TELLER
    ├── APPWRITE_EMPLOYEE
    ├── APPWRITE_MANAGER
    ├── APPWRITE_BRANCH
    ├── APPWRITE_TRANSACTIONS
    └── APPWRITE_REPORTS

📊 UML Modeling
Diagram Type	Description
Use Case	Client, Teller, Manager, Admin interactions
Sequence	Login, Signup, Transfers, Transaction Flow
Class	Users, Accounts, Transactions, Branches

All diagrams are available in:

/docs/uml

⚙️ API & Internal Modules
🔐 Authentication & Security
Service	Description
Auth Service	Login, signup, account recovery
RBAC	Role-based permissions system
Secure Sessions	Encrypted HTTP-only cookies
💰 Financial Modules
Module	Description
Accounts Service	Multi-account & balance management
Transactions Service	History, filtering, pagination
Transfers Service	Dwolla transfers & internal transfers
🏢 Operational Modules
Module	Description
Employee Service	Creation, editing, disabling employee accounts
Permissions Service	Role assignment & access control
Reports Service	Automatic reports generation
🚀 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-repo/unipay.git
cd unipay

2️⃣ Install dependencies
npm install

3️⃣ Add environment variables

Create a .env.local file:

NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_API_KEY=

PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox

DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_ENV=sandbox

4️⃣ Start the project
npm run dev

🖼️ Screenshots (to be added)

Place your images inside:

/public/screenshots


Recommended names:

Description	File
Home Page	home.png
Client Dashboard	client-dashboard.png
Transactions	transactions.png
Transfers	transfer.png
Employee Dashboard	employee-dashboard.png
Admin Panel	admin-panel.png
📌 Additional Recommended Files

You can include extra documentation such as:

🔸 UI/Design Files (Figma or PDF)

To place in:

/docs/design/ui/


Examples:

unipay-ui.pdf

unipay-wireframes.fig

🔸 UML Diagrams
/docs/uml/

🔸 Technical Specifications
/docs/specs/


Examples:

database-schema.pdf

api-specification.pdf

🧭 Future Roadmap

Mobile app (React Native)

QR Code Payments

Smart budgeting module

AI-powered spending insights

Automated PDF/Excel exports

🏷️ License

Academic Project – 2024/2025
