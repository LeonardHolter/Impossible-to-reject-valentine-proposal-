# Impossible-to-reject-valentine-proposal 💕

A fun Valentine's Day website where you can generate personalized proposal links and track responses. The "No" button runs away from the cursor, making it impossible to reject!

## Features

- 💖 **Link Generator**: Create personalized Valentine's proposals with custom names
- 🏃‍♂️ **Interactive "No" button**: Moves away when you try to click it, then slowly returns if not chased
- 🎉 **Celebration animation**: Beautiful animation when "Yes" is clicked
- 📊 **Dashboard**: Track proposal status in real-time (Pending/Yes/No)
- 📱 **Fully responsive**: Works on desktop and mobile
- ⚡ **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Supabase

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the SQL from `supabase-schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS proposals (
  id TEXT PRIMARY KEY,
  sender_name TEXT NOT NULL,
  crush_name TEXT NOT NULL,
  response TEXT NOT NULL DEFAULT 'pending' CHECK (response IN ('pending', 'yes', 'no')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_proposals_id ON proposals(id);

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON proposals
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Get your **Project URL** and **Anon Key** from:
   - Settings → API → Project URL
   - Settings → API → Project API keys → `anon` `public`

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### For the Sender:

1. Visit the homepage
2. Enter your name and your crush's name
3. Click "Generate Valentine's Link"
4. Copy the generated link and send it to your crush
5. Click "Dashboard" to track their response in real-time

### For the Receiver (Your Crush):

1. Open the link sent by the sender
2. See the personalized Valentine's proposal
3. Try to click "No" (it will run away! 😈)
4. Click "Yes" to accept

### Dashboard Features:

- Shows who sent the proposal and who it's for
- Displays creation and response dates
- Real-time status updates (auto-refreshes every 5 seconds)
- Copy link to share again
- Create new proposals

## How It Works

### Technical Details:

- **"No" Button Behavior**:
  - Uses `onMouseEnter` and `onTouchStart` events to detect cursor proximity
  - Calculates random position 150px+ away from cursor
  - Slides smoothly to new position (0.25s animation)
  - Returns to original position after 2 seconds of not being chased (0.8s animation)
  - Can be chased mid-return to flee again

- **Data Flow**:
  - Proposals stored in Supabase with unique IDs (generated via nanoid)
  - Three API routes: create, fetch, and respond
  - Dashboard auto-refreshes to show real-time updates

- **Pages Structure**:
  - `/` - Link generator homepage
  - `/valentines/[id]` - Valentine's proposal page
  - `/dashboard/[id]` - Sender's dashboard

## Deployment

### Deploy to Vercel:

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Your app will be live and ready to spread Valentine's love! 💝

## Project Structure

```
├── app/
│   ├── api/proposals/          # API routes
│   │   ├── create/route.ts     # Create new proposal
│   │   └── [id]/
│   │       ├── route.ts        # Get proposal by ID
│   │       └── respond/route.ts # Update response
│   ├── valentines/[id]/        # Valentine's proposal page
│   ├── dashboard/[id]/         # Dashboard page
│   ├── page.tsx                # Home/Link generator
│   └── layout.tsx              # Root layout
├── lib/
│   └── supabase.ts             # Supabase client config
└── supabase-schema.sql         # Database schema

```

## Security Notes

- The RLS policy currently allows all operations for simplicity
- For production, consider implementing user authentication
- Proposals are public via URL (anyone with the link can view)
- No sensitive data should be stored in proposals

Enjoy spreading the Valentine's love! 💝
