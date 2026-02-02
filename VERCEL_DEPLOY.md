# Deploying to Vercel

Follow these steps to deploy your Valentine's website to Vercel with a custom domain.

## Step 1: Add Environment Variables FIRST

**IMPORTANT:** You must add environment variables BEFORE deploying, otherwise the build will fail.

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these two variables:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://euwhklimodtiajcaxpug.supabase.co
```

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d2hrbGltb2R0aWFqY2F4cHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMzg2ODYsImV4cCI6MjA4NTYxNDY4Nn0.1KtdAIJu90UNbDGUb8MQyHNictZaX_MpDe8bcra8rC8
```

4. Select **Production**, **Preview**, and **Development** for both
5. Click **Save**

## Step 2: Deploy to Vercel

### Option A: Import from GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New...** → **Project**
3. Import your GitHub repository: `Impossible-to-reject-valentine-proposal-`
4. Vercel will auto-detect Next.js settings
5. **Make sure environment variables are added** (see Step 1)
6. Click **Deploy**

### Option B: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Step 3: Add Custom Domain

1. After deployment, go to your project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `valentine.yourdomain.com`)
4. Follow the DNS configuration instructions:

### For Subdomain (e.g., valentine.yourdomain.com)
Add a CNAME record:
```
Type: CNAME
Name: valentine
Value: cname.vercel-dns.com
```

### For Root Domain (e.g., yourdomain.com)
Add A records:
```
Type: A
Name: @
Value: 76.76.21.21
```

5. Wait for DNS propagation (5-10 minutes)
6. SSL certificate will be automatically provisioned

## Step 4: Test Your Deployment

1. Visit your custom domain
2. Create a test proposal
3. Copy the link and open in incognito
4. Test the "No" button behavior
5. Click "Yes" and verify the dashboard updates

## Troubleshooting

### Build Fails with "Missing Supabase environment variables"
- **Solution:** Add environment variables in Vercel dashboard (Step 1)
- Redeploy after adding variables

### "Proposal not found" errors
- **Solution:** Check that Supabase URL and key are correct in Vercel
- Verify the database table exists in Supabase

### Domain not working
- **Solution:** Wait 5-10 minutes for DNS propagation
- Use `dig your-domain.com` to check DNS records
- Clear browser cache

### Dashboard not updating
- **Solution:** Check browser console for errors
- Verify Supabase connection in Network tab
- Ensure RLS policies are enabled

## Updating Your Deployment

Every time you push to GitHub, Vercel will automatically redeploy:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will build and deploy automatically! 🚀

## Cost

- **Vercel:** Free for hobby projects
- **Supabase:** Free tier (up to 500MB database)
- **Custom Domain:** Varies by registrar (~$10-15/year)

Enjoy your live Valentine's website! 💕
