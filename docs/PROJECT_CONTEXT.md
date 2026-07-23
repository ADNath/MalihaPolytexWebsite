# PROJECT_CONTEXT

> Last Updated: July 2026

---

# Project Overview

## Project Name

Maliha Polytex Website & CMS

## Project Type

Corporate Website + Content Management System (CMS)

## Repository Structure

The solution consists of three independent applications.

```
MalihaPolytex/
│
├── backend/      (.NET 9 Web API)
├── admin/        (React Admin Panel)
└── website/      (React Public Website)
```

Each application must remain independent while communicating through the backend REST API.

---

# Project Goal

Develop a modern, maintainable and production-ready corporate website with an integrated CMS.

Primary objectives:

- Modern responsive public website
- Secure Admin Panel
- Clean backend architecture
- Easy future maintenance
- Reusable components
- Consistent UI
- Scalable module structure

---

# Technology Stack

## Backend

- .NET 9
- ASP.NET Core Web API
- SQL Server
- Dapper
- FluentValidation
- JWT Authentication
- BCrypt Password Hashing

No Entity Framework.

No MediatR.

No CQRS.

Repository + Service architecture only.

---

## Admin

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS v4
- React Hook Form
- Axios
- Lucide React
- react-hot-toast

---

## Website

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS v4
- Axios
- Swiper
- Framer Motion
- Lucide React

---

# Architecture

Backend architecture follows:

```
Controller
      ↓
Service
      ↓
Repository
      ↓
SQL Server
```

Every backend module follows exactly the same structure.

```
Database
      ↓
Entity
      ↓
DTO
      ↓
Repository Interface
      ↓
Repository
      ↓
Service Interface
      ↓
Service
      ↓
Controller
```

No architectural redesign unless explicitly requested.

---

# Repository Structure

## Backend

```
backend/

API/

Controllers/

Application/

Features/

DTOs

Services

Validators

Domain/

Entities

Interfaces

Infrastructure/

Repositories

Services
```

---

## Admin

```
admin/src/

api/

components/

hooks/

layouts/

pages/

services/

types/

utils/

assets/
```

---

## Website

```
website/src/

components/

layouts/

pages/

services/

types/

hooks/

assets/

utils/
```

---

# Coding Philosophy

Priority order:

1. Production Ready
2. Readability
3. Maintainability
4. Reusability
5. Performance

Avoid unnecessary abstractions.

Avoid over-engineering.

Prefer simple and maintainable solutions.

---

# General Development Rules

Always preserve existing architecture.

Never redesign completed modules unless explicitly requested.

Follow existing coding style.

Follow existing folder structure.

Reuse existing components whenever possible.

Prefer extending existing functionality instead of creating new patterns.

---

# ChatGPT Working Rules

Unless explicitly requested otherwise:

- Return complete production-ready files.
- Never return partial snippets.
- Mention full file path before every file.
- Split large files into multiple parts.
- Keep generated code consistent with existing project style.
- Do not introduce new architectural patterns.
- Preserve backward compatibility.
- Follow Hero Slider CRUD implementation as the reference module.
- Ask for only one additional file if absolutely necessary.
- Optimize for shipping rather than unnecessary refactoring.

---

# Naming Conventions

## Backend

Classes

```
ProductService
ProductRepository
ProductController
```

Interfaces

```
IProductService
IProductRepository
```

DTOs

```
CreateProductRequest
UpdateProductRequest
ProductResponse
ProductSearchRequest
PagedResult<T>
```

---

## React

Components

```
ProductsTable.tsx
ProductDialog.tsx
ProductFilters.tsx
ProductsPagination.tsx
```

Pages

```
ProductsPage.tsx
CertificatesPage.tsx
WalkInApplicationsPage.tsx
```

Services

```
productService.ts
certificateService.ts
walkInApplicationService.ts
```

Types

```
product.ts
certificate.ts
walkInApplication.ts
```

---

# File Organization Principles

Each feature should remain self-contained.

Typical admin module structure:

```
components/

Products/

ProductDialog.tsx

ProductsTable.tsx

ProductsTableBody.tsx

ProductsPagination.tsx

ProductFilters.tsx
```

Page:

```
pages/

ProductsPage.tsx
```

Service:

```
services/

productService.ts
```

Types:

```
types/

product.ts
```

This pattern should be followed for all future CRUD modules.

---

# Backend Development Standards

## Architecture

Every backend module follows exactly the same implementation pattern.

```
Entity
    ↓
Repository Interface
    ↓
Repository
    ↓
Service Interface
    ↓
Service
    ↓
Controller
```

Do not introduce:

- Entity Framework
- CQRS
- MediatR
- Generic Repository
- Unit of Work

unless explicitly requested.

---

# Repository Layer

Responsibilities

- Execute SQL
- Call Stored Procedures
- Map DTOs
- No business logic

Repositories should never contain validation or business rules.

---

# Service Layer

Responsibilities

- Business Logic
- Validation
- Repository Coordination
- File Storage
- Transaction Flow

Services should not contain SQL.

---

# Controller Layer

Responsibilities

- HTTP Endpoints
- Request Validation
- Return ApiResponse
- Authorization

Controllers should remain thin.

---

# Database Standards

Database

SQL Server

Access Library

Dapper

Connection

IDbConnection

Never use Entity Framework.

---

# SQL Guidelines

Prefer:

- Stored Procedures for complex reports
- Parameterized SQL
- Named Parameters
- Explicit Column Lists

Avoid:

```
SELECT *
```

Prefer:

```
SELECT
    ProductId,
    ProductName,
    CategoryId
FROM Products
```

---

# Dapper Guidelines

Repositories should use

```
QueryAsync<T>()
```

```
QueryFirstOrDefaultAsync<T>()
```

```
ExecuteAsync()
```

Avoid unnecessary dynamic objects.

Use strongly typed DTOs whenever possible.

---

# API Standards

Every endpoint should return

```
ApiResponse<T>
```

Standard response

```
Success

Message

Data
```

Example

```
{
    "success": true,
    "message": "Products loaded successfully.",
    "data": { }
}
```

---

# REST Conventions

GET

```
Get All
Get By Id
Search
```

POST

```
Create
Search
Upload
```

PUT

```
Update
Status Change
```

DELETE

```
Delete
```

---

# Pagination Standard

Server-side pagination only.

Request DTO

```
Page
PageSize
Search
```

Response

```
Items

Page

PageSize

TotalCount

TotalPages
```

Use

```
PagedResult<T>
```

for all list endpoints.

---

# Search Guidelines

Search should be performed by backend.

Never load everything into React and filter client-side.

Search requests should contain optional filters.

Example

```
Search

Status

Category

Designation

Department

Date Range

Experience
```

---

# File Upload

Uploads use a shared service.

```
IFileStorageService
```

Storage is configured outside the application.

Database stores relative paths only.

Never store absolute paths.

---

# Upload Folders

Current folders

```
uploads/

heroslides/

products/

gallery/

certificates/

companyvideos/

management/

careers/

contacts/
```

Future modules should continue this pattern.

---

# File Download

Downloads returning files should use

```
File(
    stream,
    contentType,
    filename
)
```

React should always download blobs using

```
responseType: "blob"
```

then

```
createObjectURL()

<a>.click()

revokeObjectURL()
```

Never attempt to download binary files as JSON.

---

# Authentication

Authentication uses JWT.

Password hashing

```
BCrypt
```

Protected endpoints require

```
[Authorize]
```

Public endpoints should explicitly allow anonymous access.

---

# Validation

Use

```
FluentValidation
```

Every Create and Update request should have its own validator.

Avoid validation inside controllers.

---

# Exception Handling

Global Exception Middleware handles:

- Validation Errors
- Business Exceptions
- Unexpected Exceptions

Avoid repetitive try/catch in controllers.

---

# Logging

Application logging should remain centralized.

Avoid writing logs inside controllers unless necessary.

---

# DTO Naming

Requests

```
CreateProductRequest

UpdateProductRequest

ProductSearchRequest
```

Responses

```
ProductResponse

ProductDetailsResponse
```

Paged

```
PagedResult<ProductResponse>
```

---

# API Naming

Controllers

```
ProductsController

CertificatesController

CareerController
```

Routes

```
api/products

api/certificates

api/careers
```

Actions

```
GET

GET/{id}

POST

PUT/{id}

DELETE/{id}
```

Special endpoints

```
search

upload

download

status

active

inactive
```

---

# Business Logic Rules

Business logic belongs only in Services.

Repositories should never decide:

- Permissions
- Validation
- Status Changes
- Workflow Rules

---

# Current Backend Modules

Completed

✓ Authentication

✓ Hero Slider

✓ What We Do

✓ Company Video

✓ Certificates

✓ Top Management

✓ Company Profile

✓ Homepage Contact

✓ Career

✓ Walk-In Applications

Core Infrastructure Completed

✓ JWT

✓ Dapper

✓ File Upload

✓ Global Exception Middleware

✓ Validation

✓ ApiResponse

✓ Dependency Injection

---

# Backend Reference Module

Hero Slider is the reference implementation.

Every future backend CRUD module should follow the same structure and coding style.

Do not redesign existing implementations without explicit instruction.

---

# Admin Panel Standards

## Purpose

The Admin Panel is responsible for managing all website content through secure CRUD operations.

The Admin should be simple, consistent, responsive, and reusable.

Avoid introducing different UI patterns between modules.

---

# Admin Technology Stack

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS v4
- Axios
- React Hook Form
- Lucide React
- react-hot-toast

---

# Admin Folder Structure

```
admin/src/

api/
components/
hooks/
layouts/
pages/
services/
types/
utils/
assets/
```

Feature components should remain grouped together.

Example

```
components/

Products/

ProductDialog.tsx

ProductsFilters.tsx

ProductsPagination.tsx

ProductsTable.tsx

ProductsTableBody.tsx
```

---

# Page Responsibilities

Pages should only coordinate data.

Responsibilities

- Loading data
- Calling APIs
- Maintaining state
- Opening dialogs
- Pagination
- Filtering
- Bulk actions

Avoid placing UI logic directly inside pages.

---

# Component Responsibilities

## Filters

Responsible for

- Search
- Dropdown Filters
- Date Filters
- Action Buttons

Filters should never call APIs directly.

---

## Table

Responsible for

- Displaying Data
- Selection
- Sorting (if applicable)
- Pagination Controls

Tables should never contain API logic.

---

## Dialog

Responsible for

- Create
- Update
- Details
- Form Validation

Dialogs communicate with the page through callbacks.

---

# CRUD Workflow

Create

```
Page

↓

Dialog

↓

Service

↓

Refresh List
```

Update

```
Table

↓

Dialog

↓

Update API

↓

Reload List
```

Delete

```
Delete Button

↓

Confirm Dialog

↓

Delete API

↓

Reload List
```

---

# API Layer

Every module should have its own API/service file.

Example

```
productService.ts

certificateService.ts

walkInApplicationService.ts
```

Never call Axios directly from pages or components.

---

# Type Definitions

Each module should have one dedicated type file.

Example

```
product.ts

certificate.ts

walkInApplication.ts
```

Include

- Entity
- Request DTOs
- Response DTOs
- Search DTOs
- PagedResult

---

# Loading States

Every async action should provide user feedback.

Examples

- Initial Loading
- Saving
- Deleting
- Uploading
- Downloading

Disable buttons while requests are in progress.

Avoid duplicate submissions.

---

# Notifications

Use

```
react-hot-toast
```

Examples

```
toast.success()

toast.error()
```

Provide meaningful messages.

---

# Confirmation Dialog

All destructive operations require confirmation.

Examples

- Delete
- Remove
- Reset
- Archive

Never delete immediately after button click.

---

# Forms

Use

```
react-hook-form
```

Guidelines

- Client-side validation
- Backend validation
- Disable Save while submitting
- Show validation messages

---

# Tables

Tables should support when applicable

- Server-side Pagination
- Search
- Filters
- Refresh
- Empty State
- Loading State
- Row Selection
- Bulk Actions

Avoid loading entire datasets.

---

# Pagination Standard

Use backend pagination.

Never implement client-side pagination for CMS modules.

Always request

```
Page

PageSize
```

---

# Search Standard

Search should always call backend APIs.

Reset page number to 1 when filters change.

Supported filters may include

- Search
- Category
- Designation
- Department
- Status
- Date Range
- Experience

---

# File Upload Standard

Image uploads use the shared upload endpoint.

Display

- Preview
- Replace
- Remove

Store only relative file paths.

---

# File Download Standard

Binary downloads

- ZIP
- PDF
- Excel

must use Blob responses.

Frontend should create an object URL and trigger browser download.

---

# Website Standards

## Purpose

The public website focuses on presentation, branding, and company information.

Maintain a consistent corporate appearance.

Avoid unnecessary animations.

---

# Website Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Axios
- Swiper
- Framer Motion

---

# Design Principles

Corporate

Clean

Minimal

Responsive

Professional

Avoid flashy designs.

Consistency is more important than visual experimentation.

---

# Layout

Standard page order

```
Navbar

↓

Hero

↓

Page Content

↓

Footer
```

---

# Reusable Components

Current shared components include

```
Button

Container

SectionTitle

Card

Badge

ConfirmDialog

EmptyState

FileUpload

ActionButtons
```

Always reuse existing components before creating new ones.

---

# Responsive Design

Desktop-first with responsive support.

Support

- Desktop
- Tablet
- Mobile

Avoid breaking existing layouts.

---

# Animations

Use Framer Motion sparingly.

Purpose

- Fade
- Slide
- Hover

Animations should improve UX without distracting users.

---

# UI Consistency

Maintain consistent

- Colors
- Border Radius
- Typography
- Button Styles
- Card Layouts
- Dialog Design
- Form Controls

Do not redesign completed pages unless explicitly requested.

---

# Code Style

Prefer

- Small reusable functions
- Strong typing
- Clear naming
- Early returns
- Async/await

Avoid

- Nested logic
- Duplicate code
- Unused state
- Unused imports
- Any unnecessary abstraction

---

# Naming Conventions

Booleans

```
isLoading

isSaving

isOpen

hasPermission
```

Handlers

```
handleSave

handleDelete

handleSearch

handleRefresh

handleDownload
```

State

```
products

selectedProduct

loading

saving

filters

selectedIds
```

---

# Component Design Rules

Prefer composition over duplication.

Keep business logic inside pages/services.

Keep presentational components stateless whenever practical.

Avoid passing unnecessary props.

---

# Completed Modules

## Backend

### Infrastructure

✔ .NET 9 Web API

✔ SQL Server

✔ Dapper

✔ JWT Authentication

✔ BCrypt Password Hashing

✔ Dependency Injection

✔ Global Exception Middleware

✔ FluentValidation

✔ ApiResponse Wrapper

✔ File Storage Service

---

### CMS Modules

✔ Hero Slider

✔ What We Do

✔ Company Video

✔ Certificates

✔ Top Management

✔ Company Profile

✔ Homepage Contact

✔ Career

✔ Walk-In Applications

---

# Completed Website Pages

✔ Home

✔ About Us

✔ Company Profile

✔ Top Management

✔ Career

✔ Contact

✔ Products UI Structure

Website pages should not be redesigned unless explicitly requested.

---

# Completed Admin Modules

✔ Authentication

✔ Dashboard Layout

✔ Hero Slider CRUD

✔ What We Do CRUD

✔ Company Video CRUD

✔ Certificate CRUD

✔ Top Management CRUD

✔ Company Profile CRUD

✔ Homepage Contact CRUD

✔ Walk-In Applications

---

# Current Project Status

## Backend

Core backend architecture is complete.

New modules should follow the existing implementation pattern.

---

## Website

Public website is feature complete.

Remaining work consists primarily of:

- API Integration
- Responsive Polish
- Performance Optimization
- Final Testing

---

## Admin

The admin panel architecture is established.

New modules should reuse existing:

- Dialog pattern
- Table pattern
- Filter pattern
- Pagination pattern
- Confirm dialog
- Shared UI components

---

# Remaining Roadmap

The remaining work order should generally follow:

1. Products CMS
2. Gallery CMS
3. Dashboard Enhancements
4. Website API Integration
5. Final Responsive Polish
6. Testing
7. Deployment
8. Bug Fixes
9. Documentation

The order may change depending on project priorities.

---

# Reference Implementations

The following modules should be treated as implementation references.

Backend

Hero Slider

Admin

Hero Slider CRUD

Walk-In Applications

Website

Homepage

Reuse existing patterns whenever possible.

---

# Known Project Decisions

The following architectural decisions have already been made.

## Backend

- Dapper only
- SQL Server only
- Repository + Service architecture
- JWT Authentication
- FluentValidation
- Shared File Storage Service

Do not introduce new backend patterns.

---

## Frontend

- React 19
- TypeScript
- Tailwind CSS v4
- React Hook Form
- Axios
- React Router v7

Do not introduce unnecessary libraries.

---

## UI

Maintain the current design language.

Completed pages should remain visually consistent.

Avoid redesigning components simply for stylistic reasons.

---

# Development Workflow

Typical workflow for a new CMS module.

```
Database

↓

Entity

↓

DTOs

↓

Repository

↓

Service

↓

Controller

↓

Types

↓

API Service

↓

Dialog

↓

Filters

↓

Table

↓

Pagination

↓

Page

↓

Testing
```

Every module should follow this workflow unless a different requirement is specified.

---

# Common Development Patterns

## Loading

Always display loading indicators during async operations.

Examples

- Loading Lists
- Saving Records
- Uploading Files
- Downloading Files
- Deleting Records

---

## Refresh

After successful Create, Update or Delete operations:

- Refresh the current list
- Preserve filters when appropriate
- Preserve pagination when appropriate

---

## Bulk Actions

Bulk actions should use row selection.

Examples

- Delete Selected
- Download Selected
- Status Updates

---

## Empty States

Display meaningful empty states when no data is available.

Avoid blank tables.

---

## Error Handling

Display user-friendly error messages.

Use toast notifications for:

- Success
- Error
- Warning

Avoid exposing raw exception messages.

---

# Performance Guidelines

Prefer server-side operations.

Examples

✔ Server-side Search

✔ Server-side Pagination

✔ Server-side Filtering

Avoid loading unnecessary data into the client.

---

# Quality Checklist

Before considering a module complete, verify:

□ Builds successfully

□ No TypeScript errors

□ No warnings

□ Responsive layout

□ Loading states implemented

□ Empty state implemented

□ Error handling implemented

□ Success notifications implemented

□ Validation implemented

□ API integration complete

□ Production-ready code

---

# ChatGPT Instructions

When assisting with this project:

- Preserve existing architecture.
- Preserve existing folder structure.
- Preserve coding style.
- Do not redesign completed modules.
- Follow Hero Slider CRUD conventions.
- Follow existing backend architecture.
- Return production-ready code.
- Mention the full file path before every file.
- Return complete files unless the user explicitly requests snippets.
- Split large files into multiple parts when necessary.
- Keep responses focused on implementation rather than explanation unless asked.
- Ask for only one additional file if a dependency cannot be inferred.

---

# Starting a New Chat

To continue this project efficiently in a new ChatGPT conversation:

1. Upload this `PROJECT_CONTEXT.md`.
2. Describe the current task (for example: "Continue Products CMS" or "Implement Gallery module").
3. Upload only the files directly related to the task if modifications are required.
4. Mention any new APIs, DTOs, or components added since the last update.

This minimizes repeated context and helps maintain consistency across conversations.

---

# Changelog

## Phase 1

- Project initialization
- Backend architecture
- Authentication
- Hero Slider

## Phase 2

- What We Do
- Company Video
- Certificates

## Phase 3

- Top Management
- Company Profile
- Homepage Contact

## Phase 4

- Career
- Walk-In Applications

## Phase 5

- Products (In Progress)
- Remaining CMS Modules
- Website API Integration
- Final QA
- Production Deployment

---

# Notes

This document is intended to be the single source of truth for the Maliha Polytex project.

Whenever a significant architectural change, module completion, or new convention is introduced, update this document accordingly.

Keeping this file current will reduce onboarding time for future development sessions and improve consistency across the project.