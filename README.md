# FIWB Monorepo

This repository contains the complete source code for FIWB AI, including the landing page and the beta application.

## Structure

- **`apps/landing`**: The public landing page (https://fiwbai.xyz).
- **`apps/beta-app`**: The core application (https://beta.fiwbai.xyz), containing:
  - `fiwb-backend`: Python backend using FastAPI.
  - `fiwb-frontend`: Next.js frontend.

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.8+

### Install Dependencies

```bash
npm install
```

### Running Locally

To run the **Landing Page**:
```bash
npm run dev:landing
```

To run the **Beta Application** (Frontend + Backend):
```bash
npm run dev:beta-full
```
(This script starts both the Python backend and Next.js frontend).

To run only the Beta Frontend:
```bash
npm run dev:beta-frontend
```

## Deployment

Refer to `DEPLOYMENT_GUIDE.md` (root) for detailed deployment instructions.
