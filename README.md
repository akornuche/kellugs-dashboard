# Kellugs OS - Company Admin Dashboard & CMS

A modern, full-featured company admin dashboard and CMS built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Multi-role dashboard** with role-based access control
- **Responsive design** that works on desktop, tablet, and mobile
- **Real-time data** ready for API integration
- **Modern tech stack** for scalability and maintainability
- **Dark/Light mode** support
- **Component-based architecture** for easy feature expansion

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 18
- **Dev Tools**: ESLint

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── globals.css     # Global styles
│   └── page.tsx        # Home page
├── components/
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Topbar.tsx      # Top navigation bar
│   ├── MainContent.tsx # Page content views
│   └── Toast.tsx       # Toast notifications
└── public/             # Static assets
```

## Role-Based Access

The dashboard supports multiple roles with different permissions:

- **CEO**: Full access to all modules
- **General Manager**: Full access, transition management
- **Operations Manager**: Inventory, Logistics
- **Sales Head**: Sales module
- **Customer Service**: Support module
- **Admin**: Admin module
- **Logistics Lead**: Logistics management
- **Site Officer**: Production/Quality Control
- **Accounts Head**: Finance and compliance

## Modules

### Dashboard
Company-wide overview with key metrics and KPIs.

### Sales
Sales pipeline, lead tracking, and revenue metrics.

### Inventory
Stock management, reorder tracking, and supply chain.

### Logistics
Delivery tracking, vehicle management, and cost tracking.

### Admin
Finance, HR, compliance, and facility management.

## API Integration

To connect your backend:

1. Create API routes in `src/app/api/`
2. Update components to fetch from your endpoints
3. Manage state with React hooks or a state management library

Example:

```typescript
// src/app/api/dashboard/route.ts
export async function GET() {
  return Response.json({ /* your data */ });
}
```

## Customization

### Colors & Themes

Edit color variables in `src/app/globals.css` or `tailwind.config.js`:

```css
--purple: #6C4CF5;
--ink: #111114;
/* ... */
```

### Navigation

Modify the `NAV` constant in `src/components/Sidebar.tsx` to add/remove pages.

### Roles

Update the `ROLES` array in `src/components/Dashboard.tsx` to add/modify user roles.

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```bash
docker build -t kellugs-cms .
docker run -p 3000:3000 kellugs-cms
```

### Node.js

```bash
npm run build
npm start
```

## Performance

- **Static Generation**: Dashboard layouts are pre-generated at build time
- **Incremental Static Regeneration (ISR)**: Real-time updates without rebuilds
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Automatic image optimization with Next.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`

## License

ISC

## Support

For issues and questions, please open an issue in the repository.
