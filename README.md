# INTERNOVA - Internship, Innovation & Career Platform

**INTERNOVA** (Intern + Innovation + Career) is a student career portal prototype built for the **IMS566** individual project. It helps students explore internship opportunities, discover well-known Malaysian companies, track their applications and understand career and employment trends through charts. A separate **admin panel** lets a coordinator manage internships, companies and applications.

This is a front-end prototype. Login is simulated with hardcoded credentials and all data is stored in the browser. No database is used.

- **Live website (GitHub Pages):** https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
- **GitHub repository:** https://github.com/YOUR-USERNAME/YOUR-REPOSITORY

---

## Test Login

On the login page, click the **Student** or **Admin** button and the username and password are filled in automatically. Then click **Sign In**.

| Role | Username | Password | Opens |
|---|---|---|---|
| Student | `IMS566` | `nurdina1234` | Student dashboard |
| Admin | `IMS566` | `admin123` | Admin panel |

A wrong username or password shows an error message. If a user opens a page without logging in, they are sent back to the login page. A student who tries to open `admin.html` is sent back to the student dashboard.

---

## Features

### General
- Login page with auto-filled demo credentials, show/hide password and error feedback
- Role-based access (student and admin)
- Left sidebar navigation that is consistent across all pages
- Responsive design: the sidebar becomes a slide-out menu on phones and tablets
- Dark mode and Light mode toggle (remembered after refresh)
- Toast messages, live date and time, back-to-top button
- Download any chart as a PNG image
- Export tables to CSV

### Student pages
| Page | What it does |
|---|---|
| **Dashboard** | Welcome message, About INTERNOVA, summary cards and 8 charts |
| **Internships** | Search, filter by industry and location, sort, view details in a modal, save or apply, export to CSV |
| **My Applications** | Summary cards, application table with status badges, remove applications, export to CSV |
| **Companies** | 12 well-known Malaysian companies with logos, search and industry filter, link to each official website |
| **Career Analytics** | 12 charts on skills demand, skill gap, salary growth and career outlook, plus a Starting Salary Estimator |
| **Employment Analytics** | 12 charts on graduate employability, salary trends, time to get a job and job-search channels |

### Admin panel (`admin.html`)
| Section | What it does |
|---|---|
| **Admin Dashboard** | Summary cards, 4 charts and a Recent Activity audit trail |
| **Manage Internships** | Add, edit and delete internships. Changes appear on the student Internships page |
| **Manage Companies** | Add, edit and delete companies and set the website link. Changes appear on the student Companies page |
| **Review Applications** | Mark applications as Interview, Approved or Rejected. Students see the new status in My Applications |
| **Students** | Sample student records with search, filter, sort by CGPA and CSV export |

The **audit trail** records every admin action. Each application entry shows its current status and buttons to change the decision (for example from Approved to Rejected). Any entry can be deleted from the audit trail.

---

## Data Visualisation

Charts are drawn with **Chart.js** and use meaningful data: internship types, allowance by company, application deadlines, skills demand, skill gap (radar), salary growth, employability trend, salary bands, graduate outcomes and admin application statistics. Chart colours also adjust to dark mode.

> The analytics numbers are **sample data for demonstration only**.

---

## Frameworks & Libraries

| Library | Version | Use |
|---|---|---|
| Bootstrap | 5.3.3 | Layout, grid, forms, modals, buttons |
| Bootstrap Icons | 1.11.3 | Icons |
| Chart.js | 4.4.7 | Charts |
| Google Fonts (DM Sans, Manrope) | - | Typography |

All libraries are loaded from CDN, so no installation is needed.

---

## Project Structure

```
internnova/
├── index.html                  Login page (GitHub Pages entry)
├── login.html                  Login page (same as index.html)
├── dashboard.html              Student dashboard
├── internship.html             Internship listings
├── application.html            My applications
├── companies.html              Company directory
├── careeranalytics.html        Career analytics
├── employment-analytics.html   Employment analytics
├── admin.html                  Admin panel
├── README.md
├── css/
│   ├── style.css               Global styles, colours, dark mode
│   ├── login.css               Login page
│   ├── dashboard.css           Dashboard
│   └── responsive.css          Mobile and tablet layout
├── js/
│   ├── data.js                 All sample data (companies, internships, students, charts)
│   ├── utils.js                Shared helpers (toast, CSV, chart helper, storage)
│   ├── auth.js                 Login and role check
│   ├── nav.js                  Sidebar, topbar and dark mode button
│   ├── chart.js                Dashboard chart helpers
│   ├── dashboard.js            Student dashboard
│   ├── internship.js           Internship search, filter and apply
│   ├── application.js          My applications
│   ├── companies.js            Company directory, search and logos
│   ├── career.js               Career analytics
│   ├── employment.js           Employment analytics
│   └── admin.js                Admin panel
└── image/
    ├── Logo.png                INTERNOVA logo
    ├── user.jpg                Student profile photo
    └── Logos/                  Company logos (for example Maybank.svg)
```

**Script order on each page:** libraries (Bootstrap, Chart.js), then `data.js`, `utils.js`, `nav.js`, and finally the page's own script.

---

## Data Dictionary

**Internship**

| Field | Type | Description |
|---|---|---|
| id | number | Unique ID |
| position | text | Job title |
| company | text | Company name |
| industry | text | Industry of the company |
| location | text | Work location |
| duration | number | Length in months |
| allowance | number | Monthly allowance (RM) |
| deadline | date | Application deadline (YYYY-MM-DD) |

**Company**

| Field | Type | Description |
|---|---|---|
| name | text | Company name |
| industry | text | Industry |
| location | text | Head office location |
| website | URL | Official website link |
| desc | text | Short description |
| logo | text | Logo file name in `image/Logos` |

**Student (admin sample data)**

| Field | Type | Description |
|---|---|---|
| id, name, matric | number, text, text | Identity |
| programme | text | Study programme |
| cgpa | number | CGPA |
| status | text | Seeking, Applied, Interview or Placed |
| company | text | Company where the student is placed |

**Application**

| Field | Type | Description |
|---|---|---|
| id | number | Internship ID |
| position, company | text | Applied position and company |
| date | date | Date applied |
| status | text | Saved, Applied, Interview, Approved or Rejected |

---

## How Data Is Stored

Everything is kept in the browser (`localStorage` and `sessionStorage`), so changes only appear in the same browser.

| Key | Content |
|---|---|
| `internovaApplications` | Student applications |
| `internovaInternships` | Internship list edited by admin |
| `internovaCompanies` | Company list edited by admin |
| `internovaAdminApps` | Sample applications from other students |
| `internovaAdminLog` | Admin audit trail |
| `internovaDark` | Dark mode setting |

The admin panel has a **Reset data** button for internships and companies to restore the original lists.

---

## Content Management

- A unique `<title>` and `<meta name="description">` on every page
- Semantic HTML (`main`, `section`, `nav`, `footer`, `article`) and clear headings
- Content organised by category: industry, location, work type and status badges
- All data is kept in one place (`data.js`), separate from the page layout
- Code is commented and split into HTML, CSS and JavaScript files

---

## Deploying to GitHub Pages

1. Create a new repository on GitHub and upload all project files, keeping `index.html` in the root.
2. Go to **Settings > Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
4. After a minute, the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

GitHub Pages is **case-sensitive**, so file names must match exactly. For example, a logo saved as `Maybank.svg` is different from `maybank.svg`.

---

## Run Locally

Open the project folder with a local server (for example Laragon or the VS Code Live Server extension) and open `index.html`. Press **Ctrl+F5** after replacing files so the browser does not use old cached files.

---

## Notes and Limitations

- Authentication is simulated and is **not secure**. It is for demonstration only.
- Analytics figures and student records are sample data.
- Data is stored per browser and is not shared between users or devices.

---

## Author

- **Name:** YOUR NAME
- **Student ID:** YOUR STUDENT ID
- **Course:** IMS566
- **Year:** 2026
