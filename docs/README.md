# Maliha Poly Tex Fiber Industry Ltd.

A modern corporate website, administration panel, and content management system (CMS) built for **Maliha Poly Tex Fiber Industry Ltd.**

---

## Project Overview

This repository contains three applications:

```text
MalihaPolytex
│
├── website/      # Public Corporate Website (React)
├── admin/        # Administration Panel (React)
├── backend/      # .NET 9 Web API
└── docs/         # Project Documentation
```

---

## Technology Stack

### Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Lucide React

### Backend

- .NET 9 Web API
- SQL Server
- Dapper
- JWT Authentication
- BCrypt Password Hashing
- FluentValidation

---

## Architecture

The backend follows a pragmatic **Clean Architecture**.

```text
API
    ↓
Application
    ↓
Domain

Infrastructure
```

Request Flow

```text
HTTP Request
        ↓
Controller
        ↓
Service Interface
        ↓
Service
        ↓
Repository Interface
        ↓
Repository (Dapper)
        ↓
SQL Server
```

---

## Project Structure

```text
MalihaPolytex
│
├── website
│
├── admin
│
├── backend
│   ├── MalihaPolytex.API
│   ├── MalihaPolytex.Application
│   ├── MalihaPolytex.Domain
│   └── MalihaPolytex.Infrastructure
│
└── docs
    ├── PROJECT_CONTEXT.md
    ├── ARCHITECTURE.md
    ├── CODING_STANDARDS.md
    ├── DATABASE_GUIDELINES.md
    └── CHANGELOG.md
```

---

## Documentation

Project documentation is located in the **docs** folder.

| Document | Description |
|----------|-------------|
| PROJECT_CONTEXT.md | Current project status, roadmap and development progress |
| ARCHITECTURE.md | Solution architecture and design decisions |
| CODING_STANDARDS.md | Coding conventions and best practices |
| DATABASE_GUIDELINES.md | Database design and SQL standards |
| CHANGELOG.md | Project release history |

---

## Development Principles

- Clean Architecture
- Strong Separation of Concerns
- Repository Pattern
- Dependency Injection
- JWT Authentication
- Dapper for data access
- Production-quality code
- Consistent naming conventions
- Reusable components
- Strong typing
- Maintainability over complexity

---

## Current Status

### Website

- ✅ Home
- ✅ About
- ✅ Products
- ✅ Gallery
- ✅ Certificates
- ✅ Career
- ✅ Contact

### Admin Panel

🚧 Under Development

### Backend API

🚧 Under Development

---

## Roadmap

- Authentication
- Dashboard
- Product Management
- Gallery Management
- Certificate Management
- Career Management
- Contact Management
- Website Settings

---

## License

Private project developed for **Maliha Poly Tex Fiber Industry Ltd.**

All rights reserved.