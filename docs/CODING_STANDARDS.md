# Maliha Poly Tex Fiber Industry Ltd.

# CODING_STANDARDS.md

---

# Purpose

This document defines the coding standards used throughout the project.

Every contributor should follow these standards to maintain consistency and readability.

The goal is not to write clever code.

The goal is to write code that every developer can immediately understand.

---

# General Principles

Always prefer

- Readability
- Simplicity
- Consistency

Avoid

- Clever code
- Overengineering
- Premature optimization

Code is read far more often than it is written.

---

# C# Standards

## Naming

### Classes

PascalCase

Good

```csharp
ProductService
ProductRepository
JwtTokenGenerator
```

Bad

```csharp
productservice
Product_Service
```

---

### Interfaces

Prefix with I

```csharp
IProductService

IProductRepository

IFileStorageService
```

---

### Methods

PascalCase

```csharp
CreateProductAsync()

UpdateProductAsync()

DeleteProductAsync()

GetProductsAsync()
```

Never

```csharp
save()

insert()

GetData()
```

---

### Variables

camelCase

```csharp
product

productList

currentUser
```

Never

```csharp
Product

Temp

Data
```

---

### Constants

PascalCase

```csharp
MaxUploadSize

AllowedExtensions
```

---

### Private Fields

Prefix with underscore

```csharp
private readonly IProductRepository _repository;

private readonly ILogger<ProductService> _logger;
```

---

# Async Methods

Every async method ends with

```
Async
```

Example

```csharp
GetByIdAsync()

CreateAsync()

LoginAsync()
```

---

# Method Length

Ideal

10–30 lines

Maximum

50 lines

If longer

Extract another method.

---

# Method Responsibilities

One method

One responsibility.

Bad

```csharp
Create Product

Upload Image

Send Email

Write Log
```

inside one giant method.

---

# Dependency Injection

Always inject dependencies.

Never

```csharp
new SqlConnection(...)

new Repository()

new HttpClient()
```

---

# Exception Handling

Controllers should not contain

```csharp
try

catch
```

Global Exception Middleware handles unexpected errors.

Services throw meaningful exceptions.

---

# Logging

Use ILogger.

Log

- Login
- Logout
- Create
- Update
- Delete

Do not log every GET request.

---

# SQL Standards

Use parameterized SQL only.

Good

```sql
SELECT *

FROM Products

WHERE Id=@Id
```

Bad

```csharp
"SELECT * FROM Products WHERE Id=" + id
```

---

One SQL statement per method whenever practical.

Avoid giant SQL strings.

---

Keywords

Uppercase

```sql
SELECT

FROM

WHERE

JOIN

ORDER BY
```

---

Aliases

Meaningful

Good

```sql
Product p

Category c
```

Bad

```sql
A

B

T1

T2
```

---

# DTO Standards

Requests

```
CreateProductRequest

UpdateProductRequest

LoginRequest
```

Responses

```
ProductResponse

ProductListResponse

LoginResponse
```

Never

```
ProductDTO

DataObject

TempResponse
```

---

# API Standards

Controllers remain thin.

Good

```csharp
return Ok(await _service.CreateAsync(request));
```

Bad

200 lines inside controller.

---

Route naming

```
api/products

api/gallery

api/auth/login
```

Use nouns.

Avoid verbs.

---

HTTP Methods

GET

Read

POST

Create

PUT

Update

DELETE

Delete

---

# Repository Standards

Repositories only access data.

Repositories never

- Validate business rules
- Return IActionResult
- Access HttpContext

---

# Service Standards

Services contain

Business Logic

Validation

Workflow

Transactions

Repositories should never contain these.

---

# React Standards

Component Names

PascalCase

```
ProductCard

GalleryGrid

DashboardPage
```

---

Hooks

Prefix

```
useProducts

useAuth

useGallery
```

---

Pages

Suffix

```
HomePage

DashboardPage

LoginPage
```

---

Props

Always define interfaces.

Good

```tsx
interface ProductCardProps {

    product: Product;

}
```

Never

```tsx
any
```

unless absolutely unavoidable.

---

# TypeScript

Avoid

```
any
```

Prefer

```
unknown

interfaces

types
```

Strong typing first.

---

# React Components

Keep components focused.

Avoid components longer than

250 lines.

Split into

- Page
- Section
- Card
- Modal
- Form

---

# Tailwind CSS

Order classes consistently.

Recommended order

```
Layout

Spacing

Sizing

Typography

Background

Border

Effects

Animation
```

Example

```html
flex items-center
gap-4
p-4
w-full
text-sm
font-medium
bg-white
border
rounded-xl
shadow
```

Avoid random ordering.

---

# Imports

Order

```text
1. React

2. Third-party packages

3. Aliases (@)

4. Relative imports

5. Types
```

Example

```tsx
import { useState } from "react";

import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";

import ProductCard from "./ProductCard";

import type { Product } from "../types/product";
```

---

# Folder Naming

Plural

```
Controllers

Repositories

Services

Validators

Mappings

Components
```

Features

Singular

```
Auth

Products

Gallery

Certificates

Careers
```

---

# Comments

Comment

WHY

Not

WHAT

Bad

```csharp
// Increment i

i++;
```

Good

```csharp
// Prevent duplicate product names before insertion.
```

---

# Magic Values

Never

```csharp
if(size>5)
```

Use

```csharp
if(size>FileConstants.MaxUploadSizeMb)
```

---

# Reusability

If code is duplicated

Three times

Refactor it.

Examples

- Upload

- Pagination

- Search

- API Responses

- Modal

- Confirm Dialog

---

# Git Commit Convention

feat:

New Feature

fix:

Bug Fix

refactor:

Code Improvement

docs:

Documentation

style:

Formatting

test:

Tests

chore:

Maintenance

Examples

```
feat: implement JWT authentication

feat: add product CRUD

fix: validate image upload

refactor: extract file storage service

docs: update coding standards
```

---

# Pull Request Checklist

Before merging

✓ Builds successfully

✓ No warnings

✓ No duplicated code

✓ Strong typing

✓ Naming conventions followed

✓ Responsive UI verified

✓ API tested

✓ SQL reviewed

---

# Final Rule

Write code as if another developer will maintain it for the next five years.

That developer might be you.