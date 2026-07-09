# Maliha Poly Tex Fiber Industry Ltd.

# ARCHITECTURE.md

---

# Project Philosophy

This project follows a pragmatic Clean Architecture.

The goal is to build a maintainable, scalable and production-ready application without unnecessary complexity.

Primary Principles

- Readability over cleverness
- Consistency over shortcuts
- Simplicity over overengineering
- Reusability over duplication
- Maintainability over premature optimization

Every design decision should make the project easier to maintain in the future.

---

# Technology Stack

## Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Lucide React

---

## Backend

- .NET 9 Web API
- SQL Server
- Dapper
- JWT Authentication
- BCrypt Password Hashing
- FluentValidation

---

# Solution Structure

```
MalihaPolytex.sln

src/
│
├── MalihaPolytex.API
├── MalihaPolytex.Application
├── MalihaPolytex.Domain
└── MalihaPolytex.Infrastructure
```

---

# Dependency Rule

Dependencies always point inward.

```
API
    ↓

Application
    ↓

Domain

Infrastructure
```

Infrastructure implements interfaces defined by Domain and Application.

API references

- Application
- Infrastructure

Application references

- Domain

Infrastructure references

- Domain
- Application

Domain references

- Nothing

---

# Request Flow

```
HTTP Request

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
```

Controllers never communicate directly with repositories.

---

# Project Structure

## API

Contains

- Controllers
- Middleware
- Authorization
- Extensions
- Program
- Configuration

API is responsible only for HTTP.

No business logic.

---

## Application

Contains business logic.

```
Application

Common

Features

    Auth

    Dashboard

    Products

    Gallery

    Certificates

    Careers

    Settings

    Contact
```

Every feature contains

```
DTOs

Interfaces

Services

Validators

Mappings
```

---

## Domain

Contains business entities and contracts.

```
Entities

Enums

Interfaces

Common
```

Domain should never depend on any framework.

---

## Infrastructure

Contains implementation.

```
Repositories

Authentication

Database

FileStorage

Extensions

Helpers
```

Infrastructure should never contain business rules.

---

# Folder Naming Convention

Plural names for folders.

Examples

```
Controllers

Repositories

Services

Validators

Mappings

Entities

DTOs
```

---

# Naming Convention

Interfaces

```
IProductService

IProductRepository

IFileStorageService
```

---

Services

```
ProductService

GalleryService

AuthService
```

---

Repositories

```
ProductRepository

GalleryRepository

CareerRepository
```

---

Controllers

```
ProductController

GalleryController

AuthController
```

---

DTO Naming

Request

```
CreateProductRequest

UpdateProductRequest

LoginRequest
```

Response

```
ProductResponse

ProductListResponse

LoginResponse
```

Never use

```
ProductDTO

DataModel

ResultObject
```

---

# Async Convention

Every asynchronous method ends with

```
Async
```

Example

```
GetProductAsync()

CreateProductAsync()

UpdateProductAsync()

DeleteProductAsync()
```

---

# Controllers

Controllers are intentionally thin.

Responsibilities

- Receive request
- Validate ModelState
- Call service
- Return response

Controllers should never

- Access database
- Write SQL
- Perform business validation
- Upload files directly

---

# Services

Services contain business logic.

Examples

- Duplicate checking
- Business validation
- File handling
- Authorization
- Transactions
- Workflow

Services should not know anything about HTTP.

---

# Repositories

Repositories perform data access only.

Responsibilities

- Execute SQL
- Map results
- Return entities

Repositories should never

- Validate business rules
- Return IActionResult
- Know about controllers

---

# Dapper

All SQL should live inside repositories.

Never place SQL inside

- Controllers
- Services

Always use parameterized queries.

Never concatenate SQL strings.

---

# Dependency Injection

Everything must be resolved through DI.

Never create dependencies manually.

Bad

```csharp
var repository = new ProductRepository();
```

Good

```csharp
public ProductService(IProductRepository repository)
```

---

# API Response Standard

Every endpoint returns

```json
{
    "success": true,
    "message": "",
    "data": {},
    "errors": []
}
```

Never return different response formats.

---

# Exception Handling

Use Global Exception Middleware.

Avoid try/catch blocks in controllers.

Business exceptions should be handled centrally.

---

# Validation

Use FluentValidation.

Never perform repetitive validation inside controllers.

Each request object should have its own validator.

Example

```
CreateProductRequestValidator

UpdateProductRequestValidator
```

---

# Logging

Log only meaningful operations.

Examples

- Login
- Logout
- Product Created
- Product Updated
- Product Deleted
- Certificate Updated
- Gallery Upload

Do not log every GET request.

---

# File Upload

Use a single abstraction.

```
IFileStorageService
```

All modules use the same upload service.

Uploads stored under

```
wwwroot/uploads/

products/

gallery/

certificates/

careers/
```

---

# Database

Primary database

SQL Server

Access

Dapper

No Entity Framework.

---

# Configuration

Never hardcode values.

Everything configurable belongs in

```
appsettings.json
```

Examples

- JWT
- Connection String
- Upload Path
- Allowed Extensions
- Max Upload Size

---

# Code Style

Use expression-bodied members only when readability improves.

Prefer early returns.

Keep methods small.

Avoid nested if statements.

Avoid regions.

Avoid unnecessary comments.

Write self-documenting code.

---

# Reusability

Before creating a new component or service ask

"Can this be reused?"

Examples

- Pagination
- Search
- File Upload
- Response Wrapper
- Validation
- Modal Components

---

# Git Commit Convention

Use meaningful commits.

Examples

```
feat: implement JWT authentication

feat: add product CRUD

fix: validate duplicate product names

refactor: extract file storage service

docs: update architecture
```

Never use

```
update

fix

changes

final
```

---

# API Standards

Route Naming

GET

POST

PUT

DELETE

Response Format

Status Codes

Authentication

Pagination

Filtering

Sorting

----

# Development Workflow

Every feature follows

1. Domain

2. DTOs

3. Interfaces

4. Repository

5. Service

6. Controller

7. Frontend Integration

Never skip layers.

---

# Future Goals

The architecture should support future expansion without major restructuring.

Potential future modules

- News
- Blogs
- Downloads
- Events
- Customer Portal
- Visitor Analytics

These should fit naturally into the existing architecture without redesigning the solution.