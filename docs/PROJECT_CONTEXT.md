# PROJECT_CONTEXT

## Current Sprint

-   Polish Hero Slider UI
-   Build remaining CMS modules

## Rules

-   Return complete files.
-   Preserve functionality.
-   Work against uploaded project.
-   Split oversized files into Part 1/2 and Part 2/2.

# Backend Progress

## Completed

### Solution Setup

- .NET 9 Web API
- Clean Architecture
- Dapper
- SQL Server
- Dependency Injection
- Global Exception Middleware
- FluentValidation
- JWT Authentication
- BCrypt Password Hashing

### Authentication

Completed

- Login API
- JWT Token Generation
- Password Verification
- Protected Endpoints
- Authentication Middleware

### Common Infrastructure

Completed

- ApiResponse Wrapper
- FileStorageService
- Upload Endpoint
- Logging
- Configuration
- Dependency Injection Registration

### Hero Slider Module

Completed

Database

- HeroSlides table

Backend

- Entity
- DTOs
- Interfaces
- Repository
- Service
- Controller
- Validators
- Mapping

API

- Get All
- Get By Id
- Create
- Update
- Delete
- Upload Image

Frontend

- CRUD Completed
- Image Upload Completed
- Authentication Completed

Current Status

- CRUD is fully functional.
- UI polish is in progress.

---

# Current Backend Architecture

```
Controller
    ↓
Service
    ↓
Repository
    ↓
SQL Server (Dapper)
```

No Entity Framework.

No CQRS.

No MediatR.

---

# File Upload

Single reusable upload service.

```
IFileStorageService
```

Current upload folders

```
uploads/

heroslides/

products/

gallery/

certificates/

careers/
```

Uploads are stored outside the published application using configuration.

Database stores relative paths only.

---

# Current Development Order

Next backend modules

1. Dashboard
2. Company Overview
3. Company Video
4. Certificates
5. Products
6. Gallery
7. Careers
8. Contact
9. Site Settings

Every module follows

Entity
↓
DTO
↓
Repository
↓
Service
↓
Controller
↓
Frontend Integration

---

# AI Notes

Do NOT redesign the architecture.

Hero Slider is the reference implementation.

Future CRUD modules should follow the same structure and coding style.

## Current Development Status

Completed CMS Modules

- Hero Slider
- What We Do

Current Task

- Company Video CMS

Development Rules

- Complete one module before starting another.
- Return complete files only.
- Mention full file path.
- Do not redesign architecture.
- Follow Hero Slider CRUD pattern for all modules.

Backend Architecture

- Repository Interface → Domain/Interfaces
- Repository → Infrastructure/Repositories
- Service → Application/Features
- DTO → Application/Features/<Module>/DTOs
- Controller → API/Controllers