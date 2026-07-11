# CMS_REQUIREMENTS.md

# Maliha Poly Tex Fiber Industry Ltd.

## CMS Business Requirements

> **Instructions**
>
> Fill this document in plain English. Add, remove, or modify anything.
> Do **not** worry about database design or coding. Describe what the
> business needs.

------------------------------------------------------------------------

# GENERAL QUESTIONS

## Website

-   Should every visible text be editable? (Yes/No)
-   Should every image be replaceable? (Yes/No)
-   Should every PDF be replaceable? (Yes/No)
-   Should every video be replaceable? (Yes/No)

Anything that should NEVER be editable?

Answer:

------------------------------------------------------------------------
If multiple yes auto add this two column

- 	IsActive
- 	Order


# HOME PAGE

## Hero Slider

Multiple slides? (Yes)

Admin should be able to:

-   Add Slide
-   Edit Slide
-   Delete Slide
-   Hide/Show Slide
-   Reorder Slides

Fields needed:

-   Title
-   Subtitle
-   Description
-   Button Text
-   Button Link
-   Desktop Image
-   Mobile Image

Additional requirements: Perfect.

------------------------------------------------------------------------

## Company Overview

Multiple Cards:
Yes

Each Card

- Icon/Image
- Title
- Description
- Display Order
- Is Active

Additional requirements: Nothing

------------------------------------------------------------------------


## Company Video

Fields:

-   Title
-   Description
-   Video Upload
-   YouTube URL
-   Thumbnail

Additional requirements:

------------------------------------------------------------------------

## Certificate Section

Multiple cards? (Yes)

Fields:

-	Small Title
-   Title
-   Description
-   Image
- 	IsActive
- 	Order

Additional requirements:

------------------------------------------------------------------------

## Contact Details

Fields:

-   Title
- 	Type (Email, Cell, Phone)
-	IsActive
- 	Order
- 	ShowFooter

Additional requirements:

------------------------------------------------------------------------

# ABOUT PAGE

need a table for designation, just title and isactive

## Current Openings

Single or Multiple? Multiple

Fields:

-	Opening Title
-	designation
-	description
-	location
- 	ExpectedExperince
-	Posting Date
-	Deadline
-	Period
-	Responsibilities
-	Requirements
- 	Benefits
- 	Vacancies

------------------------------------------------------------------------

## Top Management

Single or Multiple? Multiple

Fields:

-   Name
-   Designation
-   Photo
-   Message
- 	Order
-	IsActive

Additional requirements:

------------------------------------------------------------------------

# COMPANY PROFILE

Fields:

-   Title
-   Description
-   PDF

Additional requirements:

------------------------------------------------------------------------

# PRODUCTS

## Categories

Requirements:

------------------------------------------------------------------------

## Products
multiple yes
Fields:

 
    id,
    category,
    name,
    image,
    denier,
    cuttingLength,
    color,
	IsActive
  

Additional requirements:

------------------------------------------------------------------------

# GALLERY

Fields:

-   Image
-   Title
-   IsActive

Additional requirements:

------------------------------------------------------------------------

# CERTIFICATES

Fields:

-   Title
-   Description
-   Image
-	IsActive

Additional requirements:

------------------------------------------------------------------------

# CONTACT

==================================================
CONTACT PAGE
==================================================

## Locations

Can contain multiple locations? (Yes)

Examples:

- Corporate Office
- Factory
- Branch Office (Future)

Admin should be able to:

- Add Location
- Edit Location
- Delete Location
- Show/Hide Location
- Reorder Locations

Each Location contains:

- Location Name
- Address
- Google Maps URL
- Icon (Optional)

Additional Requirements:

______________________________

--------------------------------------------------

## Contact Information

Admin should be able to manage:

Telephone Numbers
(Multiple)

Mobile Numbers
(Multiple)

Email Addresses
(Multiple)

Office Hours

Additional Requirements:

______________________________

--------------------------------------------------

## Contact Form

Should visitors be able to send messages? (Yes/No)

If Yes:

Admin should be able to:

- View Messages
- Search Messages
- Mark as Read
- Delete Messages

Fields submitted by visitor:

- Name
- Email
- Phone
- Subject
- Message

Additional Requirements:

______________________________

--------------------------------------------------

## Google Map

Admin should be able to update:

- Google Maps URL

Additional Requirements:

______________________________
------------------------------------------------------------------------

# SITE SETTINGS

Company

-   Company Name
-   Logo
-   Footer Logo
-   Favicon

Contact

-   Phone
-   Email

Social Media

-   Facebook
-   LinkedIn
-   YouTube
-   Instagram

SEO

-   Meta Title
-   Meta Description
-   Keywords

Additional requirements:

------------------------------------------------------------------------

# USERS

Single admin only? Yes

Need multiple admins later? Maybe

Need roles? No

Need permissions? No

Requirements:

------------------------------------------------------------------------

# FUTURE FEATURES

List anything that might be needed in the future.

Examples:


Your notes:

------------------------------------------------------------------------

# FINAL NOTES

Write anything that hasn't been covered above.

The more detail you provide, the better the CMS architecture will be.
