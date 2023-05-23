## Deploy with Vercel
Click the deploy button below to directly deploy this repository with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkunalshetye%2Fcg-blog&env=NEXT_PUBLIC_CG_SINGLE_KEY,NEXT_PUBLIC_CG_APP_KEY,NEXT_PUBLIC_CG_SECRET,NEXT_PUBLIC_CG_PREVIEW_MODE)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deployment Variables
When deploying to Vercel add the environment variable *NEXT_PUBLIC_CG_SINGLE_KEY* to the project with a valid content graph Single Key
When testing the application locally ensure that you update .env file with a valide Single Key from Content Graph

[![name](public/vercel.gif)](public/vercel.gif)


## Setting Up Preview for Content Graph
| Variable                    | Description                    | Value                         |
|-----------------------------|--------------------------------|-------------------------------|
| NEXT_PUBLIC_CG_SINGLE_KEY   | Single Key from Content Graph  |                               |
| NEXT_PUBLIC_CG_APP_KEY      | App Key from ContentGraph      |                               |
| NEXT_PUBLIC_CG_SECRET       | App Secret from ContentGraph   |                               |
| NEXT_PUBLIC_CG_PREVIEW_MODE | Toggles fetching Draft Content | true/false , default is false |


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
