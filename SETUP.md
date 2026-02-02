# Quick Setup Guide

Follow these steps to get your Valentine's website up and running:

## Step 1: Supabase Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in:
   - Project name: `valentines-website` (or any name)
   - Database password: (create a strong password)
   - Region: (choose closest to you)
4. Wait for project to be created (~2 minutes)

## Step 2: Create Database Table

1. In your Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql` file
4. Click "Run" or press Cmd/Ctrl + Enter
5. You should see "Success. No rows returned"

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to Settings (gear icon) → API
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Configure Environment Variables

1. Open the `.env.local` file in your project
2. Paste your values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
3. Save the file

## Step 5: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing the Flow

1. **Homepage**: Enter your name and crush's name → Generate link
2. **Copy the link** and open it in a new incognito/private window (to simulate your crush)
3. **Try clicking "No"** - watch it run away!
4. **Click "Yes"** - see the celebration
5. **Go back to Dashboard** - see the "Yes" response!

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env.local` exists and has both variables filled in
- Restart your dev server after adding environment variables

### "Proposal not found" error
- Check that the SQL schema was created successfully in Supabase
- Verify your Supabase URL and key are correct
- Check Supabase dashboard → Table Editor → you should see "proposals" table

### Table doesn't exist
- Go back to Step 2 and run the SQL again
- Make sure there were no errors when running the SQL

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

Enjoy! 💕
