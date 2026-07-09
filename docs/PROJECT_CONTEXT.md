# Maliha Poly Tex Fiber Industry Ltd.

# PROJECT_CONTEXT.md

## Project Overview

This project consists of two separate applications:

1. Public Corporate Website
2. Admin Panel + .NET Backend API

The public website is nearly complete.

Current focus:
Building the Admin Panel and Backend CMS.

---

# Overall Project Structure

MalihaPolytex/

│
├── website/          (React Public Website)
│
├── admin/            (React Admin Panel)
│
├── backend/
│   ├── MalihaPolytex.API
│   ├── MalihaPolytex.Application
│   ├── MalihaPolytex.Domain
│   └── MalihaPolytex.Infrastructure
│
└── PROJECT_CONTEXT.md

---

# Frontend (Website)

Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Swiper

Design

- Modern corporate
- White theme
- Green primary color
- Rounded corners
- Soft shadows
- Responsive
- Minimal animation

Desktop design is approved.

Desktop layout should not change unless specifically requested.

Only responsive improvements are allowed.

---

# Completed Website Pages

✅ Home

Contains

- Hero Slider
- Company Overview
- About Section
- Achievement
- Video Section
- GRS Certificate
- CTA
- Footer

---

✅ About

Contains

- Company Overview
- Mission
- Vision
- Values

---

✅ Top Management

Completed

---

✅ Company Profile

Completed

Contains

- Embedded PDF
- Download PDF

---

✅ Products

Completed

Features

- Category Tabs
- Dynamic Filters
- Mobile Filter Drawer
- Product Cards
- Product Details
- Responsive Layout

---

✅ Gallery

Completed

Features

- Responsive Grid
- Initial 12 Images
- Load More
- Image Preview Modal

---

✅ Certificates

Completed

Features

- Three Certificate Cards
- Image Preview Modal
- Responsive Layout

---

✅ Career

Completed

Current Openings

Dummy Data

Later managed by Admin Panel.

---

✅ Contact

Completed

Contains

- Office Information
- Factory Information
- Contact Form
- Google Map

---

# Current Website Status

Frontend is essentially complete.

Future work

- Replace Dummy Data with API
- Connect Admin Panel
- SEO Improvements
- Performance Optimization
- Deployment

---

# Admin Panel

Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Lucide React

Admin Design

- Modern Dashboard
- Left Sidebar
- Top Navigation
- Responsive Drawer
- Green Branding
- White Theme

Modules

- Dashboard
- Products
- Gallery
- Certificates
- Career
- Contact
- Settings

Authentication

JWT Login

No Registration

Single Admin User initially

---

# Backend

Tech Stack

- .NET 9 Web API
- SQL Server
- Dapper
- JWT Authentication
- BCrypt Password Hashing

Architecture

Clean Architecture

Solution

src/

- MalihaPolytex.API
- MalihaPolytex.Application
- MalihaPolytex.Domain
- MalihaPolytex.Infrastructure

No Modular Monolith.

No CQRS.

No MediatR.

No Entity Framework.

---

# Backend Flow

HTTP

↓

Controller

↓

IService

↓

Service

↓

IRepository

↓

Repository (Dapper)

↓

SQL Server

---

# Application Structure

Application

Common

- Responses
- Exceptions
- Constants
- Models
- Interfaces

Features

- Auth
- Dashboard
- Products
- Gallery
- Certificates
- Careers
- Settings
- Contact

Each Feature Contains

- DTOs
- Interfaces
- Services
- Validators
- Mapping

---

# Domain

Entities

- User
- Product
- GalleryImage
- Certificate
- Career
- SiteSetting
- ContactInformation

---

# Infrastructure

Contains

- Repositories
- Authentication
- Database
- File Storage
- Extensions
- Helpers

---

# API

Contains

- Controllers
- Middleware
- Authorization
- Extensions

Uploads

wwwroot/uploads/

- products
- gallery
- certificates
- careers

---

# Development Principles

Controllers contain no business logic.

Repositories contain no business rules.

Services contain business logic.

Use Dependency Injection everywhere.

Everything async.

Every async method ends with Async.

Strong typing.

No magic strings.

No duplicate code.

Reusable components first.

Readable code over clever code.

Maintain consistency across every feature.

---

# API Response Standard

Every endpoint returns

{
    "success": true,
    "message": "",
    "data": {},
    "errors": []
}

No custom response formats.

---

# Logging

Log important operations only

Examples

- Login
- Product Created
- Product Updated
- Gallery Upload
- Certificate Replaced

---

# Validation

Use FluentValidation.

Avoid validation inside controllers.

---

# File Upload

Single IFileStorageService

All uploads go through one service.

---

# Current Development Phase

Phase 1

✅ Public Website Completed

Phase 2

🚧 Admin Panel

🚧 Backend API

Current task:

Create backend solution and implement JWT authentication, then build the Admin Dashboard foundation before starting CRUD modules.