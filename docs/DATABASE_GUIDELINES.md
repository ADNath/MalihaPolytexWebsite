# Maliha Poly Tex Fiber Industry Ltd.

# DATABASE_GUIDELINES.md

---

# Purpose

This document defines database standards and conventions used throughout the project.

Goals

- Consistency
- Readability
- Performance
- Maintainability
- Scalability

---

# Database Engine

SQL Server

---

# Naming Convention

## Tables

PascalCase

Good

```
Users

Products

GalleryImages

Certificates

Careers

SiteSettings
```

Bad

```
tbl_Product

product_master

PRODUCT

tblProducts
```

---

# Columns

PascalCase

Good

```
ProductId

ProductName

CreatedDate

ModifiedDate
```

Bad

```
product_name

productID

created_date
```

---

# Primary Keys

Every table

Single identity key.

Convention

```
<TableName>Id
```

Example

```
ProductId

GalleryImageId

CertificateId

CareerId
```

Never

```
ID

Id

ProductID
```

---

# Foreign Keys

Convention

```
ReferencedTableNameId
```

Example

```
CategoryId

ProductId

CreatedByUserId

ModifiedByUserId
```

---

# Audit Columns

Every master table contains

```
CreatedBy

CreatedDate

ModifiedBy

ModifiedDate

IsDeleted
```

Optional

```
DeletedBy

DeletedDate
```

---

# Soft Delete

Never physically delete business data.

Instead

```
IsDeleted = 1
```

Deleted records should not appear in normal queries.

---

# Date & Time

Always use

```
datetime2
```

Avoid

```
datetime
```

Store all dates in UTC when appropriate.

---

# Boolean

Use

```
bit
```

Never

```
char(1)

varchar

int
```

for boolean values.

---

# Strings

Use

```
nvarchar
```

unless Unicode is unnecessary.

Never use

```
nvarchar(max)
```

unless absolutely required.

Specify sensible lengths.

Examples

```
nvarchar(100)

nvarchar(250)

nvarchar(500)
```

---

# Decimal

Use explicit precision.

Example

```
decimal(18,2)
```

Never

```
float
```

for currency or measurements.

---

# Identity

Use

```
IDENTITY(1,1)
```

unless a business requirement dictates otherwise.

---

# Nullability

Columns should be

NOT NULL

by default.

Allow NULL only when the value is genuinely optional.

---

# Default Values

Use database defaults when appropriate.

Example

```
CreatedDate = SYSUTCDATETIME()

IsDeleted = 0
```

---

# Index Naming

Convention

```
IX_TableName_Column

IX_Products_ProductName

IX_GalleryImages_DisplayOrder
```

---

# Unique Index Naming

Convention

```
UX_Table_Column
```

Example

```
UX_Users_Email

UX_Products_ProductCode
```

---

# Foreign Key Naming

Convention

```
FK_ChildTable_ParentTable
```

Example

```
FK_Products_ProductCategories

FK_Careers_Users
```

---

# Primary Key Naming

Convention

```
PK_TableName
```

Example

```
PK_Products

PK_Users
```

---

# Stored Procedures

Avoid unless necessary.

Use Dapper with parameterized SQL for CRUD.

Stored procedures only for

- Complex reports
- Heavy aggregations
- Performance-critical operations

---

# Stored Procedure Naming

```
usp_GetProducts

usp_GetDashboardSummary

usp_ProductSalesReport
```

Never

```
SP1

GetData

ProcedureTest
```

---

# Views

Use only for

- Reporting
- Read-only projections

Convention

```
vw_ProductSummary

vw_CareerListing
```

---

# SQL Formatting

Keywords

Uppercase

```
SELECT

FROM

WHERE

JOIN

ORDER BY

GROUP BY
```

---

# Aliases

Meaningful

Good

```
Products p

Categories c

Users u
```

Bad

```
A

B

T1

T2
```

---

# Parameter Naming

Match C# property names.

Example

```
@ProductId

@ProductName

@CreatedBy
```

---

# SQL Injection

Always use parameterized queries.

Never

```csharp
"... WHERE ProductId=" + id
```

Always

```csharp
new { ProductId = id }
```

---

# Pagination

Always perform paging in SQL.

Example

```
OFFSET

FETCH NEXT
```

Never fetch all rows and paginate in memory.

---

# Searching

Always use parameters.

Example

```
WHERE ProductName LIKE '%' + @Keyword + '%'
```

---

# Sorting

Never concatenate ORDER BY directly.

Whitelist sortable columns.

---

# Transactions

Use transactions only when multiple operations must succeed together.

Examples

- Create Product + Upload Image
- Replace Certificate + Delete Old File

---

# Dapper Guidelines

Repositories contain SQL.

Services never contain SQL.

Each repository method should perform one database operation.

Prefer multi-mapping only when necessary.

---

# Repository Method Naming

Good

```
GetByIdAsync()

GetPagedAsync()

CreateAsync()

UpdateAsync()

DeleteAsync()

ExistsAsync()
```

---

# SQL File Organization

Small CRUD queries

Inline inside repository.

Large reports

Move to separate SQL files if they become difficult to maintain.

---

# Upload Paths

Database stores

Relative path only.

Good

```
uploads/products/product01.jpg
```

Bad

```
D:\Projects\MalihaPolytex\wwwroot\uploads\product01.jpg
```

---

# Lookup Tables

Every lookup table should have

```
Id

Name

DisplayOrder

IsActive
```

---

# Seed Data

Seed only

- Admin User
- Roles (if introduced later)
- Initial Settings

Avoid seeding business data.

---

# Performance

Index

- Foreign Keys
- Search Columns
- Unique Columns

Avoid

SELECT *

Prefer

Explicit column lists.

---

# Data Integrity

Enforce

- Primary Keys
- Foreign Keys
- Unique Constraints

Do not rely only on application validation.

---

# Error Handling

Never expose SQL exceptions directly to clients.

Return friendly messages.

Log detailed exceptions internally.

---

# Future Expansion

The database should support future modules without restructuring.

Potential future tables

```
News

Blogs

Downloads

Visitors

Events

Testimonials
```

---

# Final Rule

The database schema should be understandable without documentation.

Good table and column names eliminate the need for comments.