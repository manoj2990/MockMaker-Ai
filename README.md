# MockMaker-AI

MockMaker-AI is an AI-powered mock interview platform built with cutting-edge technologies to help users prepare for job interviews effectively. This platform leverages AI to generate interview questions, assess responses, and provide insightful feedback to improve performance.

## Live Demo
🔗 [Visit Deployed App](https://mock-maker-ai.vercel.app/) 
## Features

- AI-Powered Mock Interviews – Uses Google Gemini AI to generate interview questions based on user-selected Position/Feild.
- Voice & Video Support – Supports audio and video responses to simulate real interview scenarios.
- Real-Time Feedback – AI analyzes answers and provides constructive feedback.
- User Authentication – Secure authentication powered by Clerk.
- Dark Mode Support – Seamless UI experience with Next.js and TailwindCSS.
- Payment Integration – Razorpay for subscription-based access.
- Database Management – Uses Neon Postgres and Drizzle ORM for efficient data handling.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Framer Motion](https://www.framer.com/motion/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction), [Google Generative AI](https://ai.google.dev/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [Neon Postgres](https://neon.tech/), [Drizzle ORM](https://orm.drizzle.team/)
- **Payments**: [Razorpay](https://razorpay.com/)

## Project Structure

```
MockMaker-AI
│── app/
│   │── _commonComponent/
│   │   ├── footer.jsx
│   │   ├── HeroScroll.jsx
│   │   ├── HowItWork.jsx
│   │   ├── MovingBorderDemo.jsx
│   │   ├── subscriptionHelper.jsx
│   │   ├── Testimonial.jsx
│   │── auth/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │── api/
│   │   ├── razorpay/
│   │   ├── subscription/
│   │── dashboard/
│   │   ├── _components/
│   │   ├── interview/[interviewID]/
│   │   │   ├── feedback/
│   │   │   │   ├── page.jsx
│   │   │   ├── start/
│   │   ├── price/
│   │   │   ├── page.jsx
│── components/
│   │── ui/
│   │   ├── collapsible.jsx
│   │   ├── dialog.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── sonner.jsx
│   │   ├── textarea.jsx
│   │   ├── button.jsx
│   │   ├── container-scroll-animation.jsx
│   │   ├── moving-border.jsx
│── constants/
│   ├── Steps.jsx
│── lib/
│   ├── utils.js
│── public/
│── razorpayPayment/
│   ├── paymentButton.jsx
│   ├── shootsuccessFireWork.jsx
│── utils/
│   ├── GeminiAI.js
│   ├── neondbConfig.js
│   ├── schema.js
│── .gitignore
│── drizzle.config.js
│── jsconfig.json
│── middleware.js
│── next.config.mjs
│── package-lock.json
│── package.json
│── postcss.config.js
│── tailwind.config.js
│── tsconfig.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
- Yarn or npm

### Clone the Repository

```sh
git clone https://github.com/manoj2990/MockMaker-Ai.git
cd MockMaker-Ai
```

### Install Dependencies

```sh
yarn install  # or npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the necessary credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_GOOGLE_AI_KEY=your_google_ai_key
DATABASE_URL=your_neon_postgres_url
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Run the Development Server

```sh
yarn dev  # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application in action.

## Database Management

Run the following commands to set up and manage the database:

```sh
yarn db:push  # Push migrations to the database
yarn db:studio  # Open Drizzle Studio to visualize the database
```

## Deployment

MockMaker-AI can be deployed on platforms like Vercel, Netlify, or Railway. Make sure to set up the necessary environment variables in your hosting provider.

## Contributing

Contributions are welcome! If you'd like to improve MockMaker-AI, feel free to fork the repo and submit a pull request.

## License

This project is licensed under the MIT License.

---

### Developer Social Media
[Website](https://mock-maker-ai.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/manoj-krumar/)

