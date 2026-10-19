
<div align="center">

  <h1>✦ 1st Class Creative</h1>
  <p><strong>A creative digital presence. A clearer path from discovery to enquiry.</strong></p>

  <p>
    A proposed, mobile-first website and management dashboard designed to bring
    the brand's creative work, service information, and customer enquiries into one
    professional digital experience.
  </p>

  <p>
    <a href="https://www.facebook.com/1stclasscreative/mentions/">Facebook</a> •
    <a href="https://www.instagram.com/1st_class_creative_/">Instagram</a> •
    <a href="https://www.tiktok.com/@1st_class_creative">TikTok</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Project-Website%20Proposal-7C3AED?style=for-the-badge" alt="Website proposal" />
    <img src="https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/UI-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Backend-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </p>

  <p><em>Project research and proposed solution by Wenuri Sanjana</em></p>

</div>

---

## ✨ Project Overview

**1st Class Creative** is a proposed website concept based on the business's supplied Facebook, Instagram, and TikTok profiles. The goal is to create a polished, responsive destination where visitors can discover approved services or offerings, explore creative work, and contact the business without having to piece information together across multiple social platforms.

The website is planned to complement the brand's existing social presence—not replace it—with a central source of information and a clear route for enquiries.

> **Project status:** This repository describes the researched proposal and planned architecture. Implementation status, exact services, business location, pricing, and checkout requirements must be confirmed with the business owner before launch.

## 🎯 Project Goals

- **Create a strong digital presence** with a professional, consistent, mobile-first experience.
- **Showcase creative work** through an organized portfolio or gallery.
- **Make enquiries easier** with structured forms and clear contact calls-to-action.
- **Centralize lead management** in a secure administrative dashboard.
- **Improve discoverability** with search-friendly pages and optimized media.
- **Measure meaningful engagement** using privacy-conscious analytics and approved marketing integrations.

## 🧭 Proposed Website Experience

| Page / Area | Purpose | Planned highlights |
|---|---|---|
| **Home** | Introduce the brand | Brand statement, featured work, offering overview, social links, prominent enquiry CTA |
| **About the Brand** | Build trust | Verified brand story, values, customer-service approach |
| **Services / Offerings** | Explain what is available | Categories, descriptions, deliverables, FAQs, owner-approved packages or prices |
| **Portfolio / Gallery** | Present examples | Categorized projects, image/video gallery, captions and accessible alt text |
| **Project / Service Details** | Help visitors evaluate fit | Relevant examples, scope and next steps |
| **Packages / Pricing** | Explain commercial options | Published only when approved; quote-based options where applicable |
| **FAQs** | Answer common questions | Verified answers about process, timing, scope and contact |
| **Contact / Request a Quote** | Convert interest into enquiries | Validated form, contact preferences, confirmation state and social links |
| **Privacy / Terms** | Explain site policies | Approved privacy notice and applicable terms |
| **Admin Dashboard** | Manage day-to-day operations | Enquiries, approved content, portfolio media, staff permissions and reporting |

The exact service or product catalogue is **not yet confirmed**. The final page structure should be adjusted after the owner clarifies whether the business primarily offers creative services, bookings, physical products, or a combination.

## 🛠️ Proposed Technology Stack

| Technology | Planned role |
|---|---|
| **Next.js (React)** | Website framework, routing, page rendering and SEO foundations |
| **Tailwind CSS** | Responsive styling and reusable UI patterns |
| **Firebase Authentication** | Secure admin sign-in |
| **Cloud Firestore** | Services/offerings, portfolio entries, enquiries, customer records, roles and settings |
| **Firebase Storage** | Approved images and video assets |
| **Firebase Cloud Functions** | Trusted server-side tasks and notification workflows where required |
| **Email notification provider** | Enquiry confirmations and admin alerts; provider and configuration to be confirmed |
| **Meta Pixel / TikTok Pixel** | Optional campaign measurement, subject to account verification and privacy requirements |

> These technologies are proposed for the solution; the table does not imply that they have already been implemented or deployed.

## 🖼️ Visual & UX Direction

The proposed visual experience is **creative, polished, image-led, and easy to navigate**.

- A consistent logo, palette, and brand tone across the website and social channels.
- Portfolio media grouped by verified service or project category.
- Strong calls-to-action such as **Contact Us** and **Request a Quote**.
- Mobile-first layouts, readable typography, accessible contrast, and descriptive image text.
- Optimized image and video delivery to support fast loading.
- Accurate, owner-approved service details, prices, testimonials, and policies.

All brand assets and portfolio items should be approved for reuse before publication.

## 🧩 Admin Dashboard Modules

The planned dashboard is intended to reduce scattered enquiries and make routine website updates easier.

### 1. Enquiry & Lead Management
- View and search submitted enquiries.
- Record inquiry type, contact details, source, assigned staff, follow-up date, and internal notes.
- Track lead status: `New` → `Contacted` → `Quoted / Consultation` → `Booked / In Progress` → `Completed`.
- Close or cancel enquiries with a reason where appropriate.

### 2. Services / Catalogue Management
- Create, edit, categorize, publish, and archive approved offerings.
- Maintain descriptions, deliverables, availability, and approved pricing or quote rules.
- Keep draft and archived content out of public-facing pages.

### 3. Portfolio & Media Management
- Upload and organize approved project images and videos.
- Manage captions, categories, alt text, featured status, display order, and publication state.
- Record whether required media permissions have been confirmed.

### 4. Promotions & Website Content
- Manage approved banners, featured projects, campaign messages, and time-limited offers where applicable.
- Align website content with active social campaigns.

### 5. Analytics & Marketing
- Review visits, traffic sources, popular pages, enquiry submissions, and conversion trends.
- Apply privacy controls and avoid sending personal enquiry details to marketing pixels.

### 6. Customer Records
- Keep relevant contact details, inquiry history, communication preferences, and follow-up notes in one place.
- Restrict access to personal information according to staff permissions.

### 7. Settings & Access Control
- Manage approved contact channels, notification configuration, social links, metadata, and staff permissions.
- Reserve sensitive configuration and role management for the owner.

## 🔄 Core Enquiry Workflow

```text
Visitor discovers the brand
          │
          ▼
Explores services and portfolio
          │
          ▼
Submits a validated enquiry form
          │
          ▼
System records the enquiry in Firestore
          │
          ├──► Confirmation to visitor (when contact details allow)
          │
          └──► Notification to the business
                         │
                         ▼
                Owner / staff reviews lead
                         │
                         ▼
           Contacted → Quoted / Consultation
                         │
                         ▼
             Booked / In Progress → Completed
                         │
                         ▼
                Closed / Cancelled if needed
```

The initial recommended workflow is **enquiry/quote-based** until the business confirms its operating model. A product cart, checkout, payment processing, or Cash on Delivery flow should only be added if the business actually needs and supports it.

## 🔐 Security & Privacy Principles

- Use Firebase Authentication for authorized admin access.
- Enforce role-based permissions in Firestore Security Rules and trusted server-side functions—not only by hiding interface controls.
- Apply least-privilege access for staff and reserve sensitive settings and account administration for the owner.
- Validate form input and uploaded media type/size.
- Keep customer enquiries and internal notes private.
- Never store payment-card details directly in Firestore.
- Do not transmit personal contact details or confidential enquiry text to Meta or TikTok pixels.
- Configure analytics and marketing tracking only after the correct accounts and applicable consent requirements are confirmed.
- Establish backup, retention, and recovery procedures before production launch.

## 🚀 SEO & Performance Plan

The proposal targets a **minimum Lighthouse Mobile performance score of 85/100**, with **90+ as a stretch goal**. These are targets, not measured results.

Planned improvements include:

- Unique page titles and meta descriptions.
- Descriptive URLs, headings, and Open Graph metadata.
- Sitemap, `robots.txt`, canonical URLs, and Google Search Console setup.
- Optimized responsive images, WebP/AVIF where appropriate, lazy loading, and efficient video thumbnails.
- Font and script optimization, caching, and reduced third-party script overhead.
- Accessible alt text and internal links between relevant service and portfolio pages.
- Verified business information and structured data only when the details are confirmed.

Potential keywords should be refined once the exact services and business location are verified. Avoid publishing unsupported service, location, pricing, or testimonial claims.

## 🗂️ Proposed Firestore Data Structure

| Collection | Purpose | Example fields |
|---|---|---|
| `services` | Approved services or offerings | `serviceId`, `title`, `slug`, `categoryId`, `description`, `status`, `timestamps` |
| `portfolio` | Approved creative projects | `projectId`, `title`, `categoryId`, `mediaUrls`, `caption`, `altText`, `featured`, `status` |
| `inquiries` | Enquiry and follow-up records | `inquiryId`, `name`, `contact`, `inquiryType`, `message`, `source`, `status`, `assignedTo`, `notes`, `createdAt` |
| `users` / `roles` | Authorized dashboard access | `uid`, `displayName`, `email`, `role`, `permissions`, `active` |
| `customers` | Customer-service records, if needed | `customerId`, `name`, `phone`, `email`, `primaryAddress`, `timestamps` |
| `promotions` | Approved campaigns and offers | `promoId`, `title`, `discountType`, `discountValue`, `isActive`, `startDate`, `endDate` |
| `adminUsers` | Admin identity and permissions, if maintained separately | `uid`, `name`, `email`, `role`, `assignedPermissions`, `isActive` |

The final schema should be validated against the confirmed business workflow. Avoid storing duplicate or unnecessary personal data.

## 🗺️ Development Roadmap

- [ ] **Phase 1 — Discovery & setup:** Confirm services/products, audience, service area, media permissions, domain, contact channels, policies, and enquiry workflow.
- [ ] **Phase 2 — Admin foundation:** Configure Firebase, data structures, authentication, role permissions, and content management.
- [ ] **Phase 3 — Public website:** Build responsive pages, portfolio/service listings, details, and validated enquiry forms.
- [ ] **Phase 4 — Notifications & integrations:** Configure email notifications and verified social links; add optional marketing pixels only with approval.
- [ ] **Phase 5 — SEO & optimization:** Implement metadata, sitemap, accessibility, image optimization, and performance checks.
- [ ] **Phase 6 — Testing & launch:** Test forms, security rules, access control, responsive layouts, notifications, backups, and client acceptance; configure domain and SSL.

## 🧪 Quality Checklist

Before launch, verify:

- [ ] Forms validate input and show a clear success or error state.
- [ ] Enquiries are stored securely and can be followed up by authorized staff.
- [ ] Staff cannot access owner-only settings or permissions.
- [ ] Uploaded media is validated and approved for publication.
- [ ] Layouts work across mobile, tablet, and desktop.
- [ ] Public content contains only confirmed details and approved assets.
- [ ] Privacy, terms, retention, backup, and notification settings are reviewed.
- [ ] SEO basics and mobile performance are tested.
- [ ] Tracking events fire only after the relevant action succeeds and are tested before campaigns begin.

## ❓ Client Confirmations Needed

The research document identifies these items as open questions:

- What exact services, products, or packages should the website present?
- Are the supplied Facebook, Instagram, and TikTok profiles the official active accounts?
- What are the official location, service area, phone number, email, and preferred contact channel?
- Will customers request quotations, book services, or purchase physical products?
- Which prices, turnaround times, delivery details, and policies are approved for publication?
- Is a domain already owned, and who will provide DNS/hosting access?
- Which logo, brand colors, portfolio assets, testimonials, and usage permissions are available?
- Should the website support English only or also Sinhala and Tamil?
- Which email should receive enquiry notifications?

## 👩‍💻 Project Information

| Field | Details |
|---|---|
| Project | 1st Class Creative |
| Prepared by | **Wenuri Sanjana** |
| Assigned by | Pixzora Labs (Pvt) Ltd. |
| Research document date | 14 October 2026 |
| Project type | Website research, proposal, and planned management system |

## 🔗 Existing Social Profiles

- Facebook: https://www.facebook.com/1stclasscreative/mentions/
- Instagram: https://www.instagram.com/1st_class_creative_/
- TikTok: https://www.tiktok.com/@1st_class_creative

---

<div align="center">

  **Built around clarity, creativity, and a better customer journey.**

  <sub>Project proposal by Wenuri Sanjana · 1st Class Creative</sub>

</div>



