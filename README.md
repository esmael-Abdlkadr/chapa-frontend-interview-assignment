# 🚀 Chapa Frontend Interview Assignment

A modern, feature-rich financial dashboard application built with React, TypeScript, and Tailwind CSS. This project demonstrates advanced frontend development skills including role-based access control, transaction management, user administration, and responsive design.

![Chapa Dashboard](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-green) ![Vite](https://img.shields.io/badge/Vite-5.x-purple)

## ✨ Features

### 🎯 Core Functionality
- **Multi-Role Authentication System** - User, Admin, and Super Admin roles
- **Real-time Transaction Management** - View, delete, and filter transactions
- **Advanced User Management** - CRUD operations for users and admins
- **Interactive Dashboard** - Role-specific dashboards with system statistics
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile

### 🔐 Role-Based Access Control
- **Users**: Personal dashboard, send money, view own transactions
- **Admins**: User management, transaction monitoring, system analytics
- **Super Admins**: Full system control, admin management, advanced settings

### 💫 Advanced Features
- **Smart Confirmation Modals** - Professional delete confirmations
- **Export Functionality** - CSV export for transactions
- **Real-time Search & Filtering** - Advanced transaction filtering
- **Mock Payment Gateway** - Simulated payment processing
- **System Health Monitoring** - Real-time system statistics
- **Modern UI Components** - Custom-built with Tailwind CSS

## 🔑 Default Login Credentials

### 👤 User Account
- **Email**: `user@chapa.co`
- **Password**: `123456`
- **Features**: Personal dashboard, send money, view transactions

### 👨‍💼 Admin Account
- **Email**: `admin@chapa.co`
- **Password**: `123456`
- **Features**: User management, transaction monitoring, system analytics

### 👑 Super Admin Account
- **Email**: `superadmin@chapa.co`
- **Password**: `123456`
- **Features**: Full system access, admin management, advanced controls

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **React Router** for client-side routing

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **Lucide React** for beautiful, consistent icons
- **Custom Components** for reusable UI elements

### State Management & Data
- **Zustand** for lightweight state management
- **LocalStorage** for data persistence
- **Mock API** for realistic data simulation

### Development Tools
- **ESLint** for code quality
- **TypeScript** for type checking
- **Hot Module Replacement** for instant updates

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/esmael-Abdlkadr/chapa-frontend-interview-assignment
   cd chapa-frontend-interview-assignment
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
pnpm build
# or
npm run build
```

### Preview Production Build
```bash
pnpm preview
# or
npm run preview
```

## 📱 Application Structure

### 🏠 Landing Page
- Modern, responsive design with Chapa branding
- Quick access to login and registration
- Feature highlights and benefits

### 🔐 Authentication System
- Secure login with role-based redirection
- User registration with validation
- Password recovery (UI ready)

### 📊 User Dashboard
- **Wallet Overview**: Balance and quick actions
- **Recent Transactions**: Latest transaction history
- **Send Money**: Intuitive money transfer interface
- **Analytics**: Personal spending insights

### 👥 Admin Dashboard
- **User Management**: View, edit, activate/deactivate users
- **Transaction Monitoring**: System-wide transaction oversight
- **System Statistics**: Real-time metrics and analytics
- **Admin Tools**: Advanced administrative functions

### 👑 Super Admin Dashboard
- **System Overview**: Comprehensive system health
- **Admin Management**: Manage admin accounts
- **Advanced Analytics**: Deep system insights
- **System Configuration**: Global settings control

## 🎨 Key Components

### Transaction Management
- **Transaction Table**: Sortable, filterable transaction list
- **Transaction Details**: Comprehensive transaction information
- **Export Functionality**: CSV download with formatted data
- **Real-time Search**: Instant transaction filtering

### User Management
- **User List**: Paginated user overview
- **User Actions**: Edit, delete, activate/deactivate
- **Role Management**: Assign and modify user roles
- **Bulk Operations**: Mass user management tools

### Dashboard Widgets
- **System Stats Cards**: Real-time metrics display
- **Chart Integration**: Visual data representation
- **Quick Actions**: One-click common operations
- **Activity Timeline**: Recent system activities

## 🔧 Features Deep Dive

### 🛡️ Security Features
- **Role-based Route Protection**: Prevents unauthorized access
- **Permission System**: Granular access control
- **Session Management**: Secure user sessions
- **Data Validation**: Input sanitization and validation

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Flexible Layouts**: Adaptive grid systems
- **Touch-Friendly**: Mobile gesture support
- **Progressive Enhancement**: Works on all devices

### 🎯 User Experience
- **Intuitive Navigation**: Clear, logical user flows
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: Graceful error messages
- **Toast Notifications**: Real-time user feedback

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   ├── dashboard/       # Dashboard-specific components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   └── dashboard/      # Dashboard pages
├── services/            # API and business logic
├── store/              # State management
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🔄 Data Flow

### Authentication Flow
1. User enters credentials
2. System validates against mock API
3. Role-based redirection occurs
4. Session state is maintained

### Transaction Flow
1. User initiates transaction
2. Data validation occurs
3. Mock payment processing
4. Real-time UI updates
5. Transaction history updated

### Admin Operations
1. Admin performs action
2. Permission verification
3. Data modification
4. System state update
5. User notification

## 🌟 Highlights

### Code Quality
- **TypeScript Integration**: Full type safety
- **Component Architecture**: Modular, reusable components
- **Performance Optimization**: Lazy loading, memoization
- **Clean Code Practices**: Consistent formatting, clear naming

### Testing Ready
- **Component Structure**: Easy to unit test
- **Mock Data**: Comprehensive test scenarios
- **Error Boundaries**: Graceful error handling
- **Accessibility**: ARIA labels and keyboard navigation

## 🎯 Demo Scenarios

### 👤 User Experience Demo
1. Login as user (`user@chapa.co`)
2. Explore personal dashboard
3. Send money to another user
4. View transaction history
5. Export transaction data

### 👨‍💼 Admin Experience Demo
1. Login as admin (`admin@chapa.co`)
2. Manage user accounts
3. Monitor system transactions
4. View system analytics
5. Perform bulk operations

### 👑 Super Admin Experience Demo
1. Login as super admin (`superadmin@chapa.co`)
2. Manage admin accounts
3. Access system configuration
4. View comprehensive analytics
5. Control global settings



## 📞 Support

For questions about implementation details or feature explanations, please refer to the component documentation within the codebase.

---

**Built with ❤️ By Esmael**

*This project showcases advanced frontend development skills including state management, component architecture, responsive design, and modern development practices.*
