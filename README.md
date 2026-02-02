# 💕 Impossible to Reject Valentine Proposal

> A playful Valentine's Day website where the "No" button literally runs away from your cursor!

**🌐 Live Demo:** [https://impossible-to-reject-valentine-prop.vercel.app/](https://impossible-to-reject-valentine-prop.vercel.app/)

## 🎯 What is this?

Ever wanted to ask someone to be your Valentine in the most fun and creative way possible? This website lets you create personalized Valentine's proposals where:

- ✨ **The "No" button runs away** when they try to click it
- 💖 **Only "Yes" is clickable** - making rejection nearly impossible!
- 📊 **Track their response** in real-time on your private dashboard
- 🎉 **Celebrate together** with a beautiful animation when they say yes

## 🚀 How It Works

### For You (The Sender):

1. **Visit the website** → Enter your name and your crush's name
2. **Generate a unique link** → Get a shareable Valentine's proposal URL
3. **Send the link** → Share it via text, email, or social media
4. **Track the response** → Check your dashboard to see if they said yes!

### For Them (Your Valentine):

1. **Open the link** → See a cute personalized Valentine's proposal
2. **Try clicking "No"** → Watch it hilariously run away from the cursor 🏃‍♂️
3. **Eventually click "Yes"** → The only way forward! 💕
4. **See the celebration** → Enjoy the surprise animation

## ✨ Features

- 💖 **Personalized Proposals**: Custom names make it special
- 🏃‍♂️ **Animated "No" Button**: Slides away and returns when not chased
- 🎉 **Celebration Screen**: Beautiful animation on acceptance
- 📊 **Real-time Dashboard**: Auto-refreshing status updates
- 🔗 **Unlimited Links**: Create as many proposals as you want
- 📱 **Mobile Friendly**: Works perfectly on all devices
- 🎨 **Beautiful UI**: Modern design with smooth animations

## 🛠 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Code Quality**: ESLint + Husky pre-commit hooks

## 📸 Screenshots

### Link Generator
Create personalized Valentine's proposals with custom names

### Valentine's Proposal Page
The "No" button runs away when you try to click it!

### Dashboard
Track responses in real-time

## 🎮 Try It Now

**👉 [impossible-to-reject-valentine-prop.vercel.app](https://impossible-to-reject-valentine-prop.vercel.app/)**

No installation needed - just visit the link and start creating proposals!

## 🔧 Run It Yourself

Want to customize it or run your own instance? Here's how:

### Prerequisites
- Node.js 18+ installed
- A free [Supabase](https://supabase.com) account

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/LeonardHolter/Impossible-to-reject-valentine-proposal-.git
cd Impossible-to-reject-valentine-proposal-
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Run the SQL from `supabase-schema.sql` in SQL Editor
   - Get your Project URL and Anon Key from Settings → API

4. **Configure environment variables**
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your Supabase credentials

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see it in action!

For detailed setup instructions, see [SETUP.md](SETUP.md)

## 💡 Use Cases

- 💑 **Ask your crush** to be your Valentine
- 🎭 **Prank your friends** with an impossible choice
- 💍 **Creative proposals** for special occasions
- 🎉 **Fun group activity** at parties
- 💝 **Spread love** on Valentine's Day

## 🎨 Customization

Want to personalize it further?

- **Change the gif**: Replace `public/puss.gif` with your own
- **Update colors**: Modify the Tailwind classes in components
- **Adjust timing**: Change button return delay in `app/valentines/[id]/page.tsx`
- **Custom messages**: Edit text in the page components

## 🏗 How It Works

### The Magic Behind the "No" Button:

1. **Detection**: Uses `onMouseEnter` and `onTouchStart` events
2. **Calculation**: Finds a random spot 150px+ away from the cursor
3. **Animation**: Smoothly slides away in 0.25 seconds
4. **Return**: After 2 seconds of no chase, slowly glides back (0.8s)
5. **Re-chase**: Can flee again if you try to catch it mid-return!

### Architecture:

```
User creates link → Supabase stores proposal → Unique URL generated
    ↓
Crush opens link → Sees proposal → Clicks Yes
    ↓
Response saved → Dashboard updates in real-time
```

### Pages:

- `/` - Link generator
- `/valentines/[id]` - Proposal page (with the magic button!)
- `/dashboard/[id]` - Response tracker

## 🚀 Deployment

Want to deploy your own version?

1. Fork this repository
2. Deploy to [Vercel](https://vercel.com) (one-click deploy)
3. Add your Supabase credentials as environment variables
4. Done! Your site is live

See [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) for detailed deployment instructions.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/LeonardHolter/Impossible-to-reject-valentine-proposal-/issues).

## 💖 Show Your Support

Give a ⭐️ if you like this project and share it with friends who need help asking their Valentine!

## 👨‍💻 Author

**Leonard Holter**
- GitHub: [@LeonardHolter](https://github.com/LeonardHolter)

## 🙏 Acknowledgments

- Inspired by the classic "impossible to reject" Valentine's Day memes
- Built with love for Valentine's Day 2026 💕

---

**Ready to spread some love?** 👉 [Try it now!](https://impossible-to-reject-valentine-prop.vercel.app/)

Made with ❤️ and ☕

