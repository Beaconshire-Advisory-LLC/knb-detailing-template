# Your KNB Detailing website
## Quick-start tutorial

**Prepared for Krista & Benjamin Hohman**
**By Beaconshire Advisory**

A complete walk-through of how to access your website on GitHub, download it, preview it, and upload it to Vercel — on a Mac or PC. Written for total beginners.

---

# Before you start

## What you'll need

- A computer — Mac or PC, doesn't matter which.
- A web browser. Any of Chrome, Safari, Edge, or Firefox is fine.
- An email address you'll use for business signups. Could be your existing Gmail, or a fresh one.
- About **30 minutes** for this tutorial. (Plus another 90 minutes later if you decide to fully launch — covered in a separate guide.)

## What this guide covers

By the end of this tutorial, you will have:

1. Looked at the live preview of your website
2. Created a GitHub account
3. Saved a copy of the website code into your own GitHub account
4. Created a Vercel account
5. Deployed your website to Vercel
6. Opened your live `*.vercel.app` URL in a browser

You will **not** yet have:
- A custom domain like `knbdetailing.com`
- Real payment processing
- A working email or text-message system

Those come later in the full setup walkthrough. **Today is just about getting the site visible and working at a temporary URL so you can decide whether to keep going.**

## PC vs Mac differences

There are essentially **none** for most of this tutorial. GitHub and Vercel both run in your web browser. You'll be clicking buttons in the same browser on either machine.

The one place the platforms differ — extracting a downloaded ZIP file — is covered explicitly when you get to it.

---

# Part 1 · Preview the live site (3 minutes)

The fastest way to see what you're getting is to click the preview link in the email I sent.

## Steps

1. **Open the email** from Beaconshire Advisory. It will have a subject line like *"A website for KNB Detailing — preview it now, launch when you're ready."*

2. **Find the line that says "Live preview"** — it has a URL underneath that ends in `.vercel.app`. Click that URL.

3. **The website opens in a new browser tab.** You'll see your real cyan-and-black KNB Detailing logo at the top, your branded silver work van as the hero image, and the Best of BusinessRate 2025 award called out beneath it.

4. **Click around.** Check these pages:
   - The home page
   - **Services → Boat detailing** (you'll see your real boat and pontoon photos)
   - **About** (your photo at the top)
   - **Gallery** (13 real KNB photos)
   - **Book** (the form works, but doesn't actually book anything yet)

5. **Decide.** If you like what you see, continue with this tutorial. If you don't, stop — there's no obligation.

## What you'll notice

The site is fully designed and styled with your real brand assets. The pages all render, the menus all work, the photos load. What's *not* live yet:

- Submitting the booking form doesn't book anything (no database connected yet)
- The "Sign in" link on the portal won't actually sign anyone in
- The "Admin" area isn't accessible
- No real emails or text messages get sent

These activate when **you** deploy your own copy in Parts 3 through 6.

---

# Part 2 · Sign up for GitHub (5 minutes)

GitHub is where the code that powers your website is stored. Think of it as a "Google Drive for software." You'll need a free GitHub account to save your own copy of the code.

## Steps

1. **Open a new browser tab.** Type `github.com` and press Enter.

2. **Click "Sign up"** in the top-right corner.

3. **Email**: type the email address you want to use for business signups. (We recommend using the same email for every account you create today — easier to keep track.)

4. **Password**: create a strong one. **Save it in a password manager** or write it in a notes app. You will need it.

5. **Username**: this becomes part of your repo URL. Pick something simple. Lowercase, no spaces. Good examples:
   - `knb-detailing`
   - `krista-hohman`
   - `khohman`

6. **Solve the puzzle** GitHub shows you (it confirms you're not a bot).

7. **Verify your email**: GitHub sends you a code. Type that code into the GitHub page.

8. **Plan**: pick **Free**. You will never need to upgrade.

9. **Skip the personalization wizard** (any questions about "what brings you to GitHub" — click "Skip personalization" at the bottom).

10. **You're in.** You should land on a page that says "Welcome to GitHub!" or shows your empty dashboard.

## What to write down

Keep these in a notes app or password manager:

- Your GitHub username: `_______________________________`
- Your GitHub email: `_______________________________`
- Your GitHub password: (in your password manager)

---

# Part 3 · Find the website code on GitHub (2 minutes)

I've pushed a complete copy of your website code to a public GitHub repository. You don't own it yet — but in Part 4 you'll get your own copy.

## Steps

1. **Find the link in my email** labeled "Setup walkthrough" or "GitHub repository." It will look like:

   `https://github.com/Beaconshire-Advisory-LLC/knb-detailing-template`

2. **Click that link.** Your browser opens the GitHub page for the project.

3. **What you'll see**:
   - The repository name at the top: `Beaconshire-Advisory-LLC/knb-detailing-template`
   - A list of folders and files (named things like `src`, `public`, `handoff`)
   - A **README** displayed below the file list, with a big "Are you Krista or Benjamin?" callout
   - A green **Code** button on the upper-right of the file list
   - A grey **Fork** button slightly higher up, in the very top-right of the page

Don't click anything yet. We'll click **Fork** in Part 4.

---

# Part 4 · Get your own copy ("fork" the code) (3 minutes)

**Forking** is GitHub's term for "make a copy of this repository in my own account." The forked copy is yours. You can change it, deploy it, share it. The original stays where it was. This is exactly what we want.

> **In plain English**: forking is like taking a photocopy of a recipe book. The original stays at the library, but now you have your own copy at home that you can write notes on.

## Steps

1. **On the GitHub repo page** from Part 3, look in the top-right corner of the page. You'll see three buttons in a row: **Sponsor**, **Watch**, and **Fork** with a small dropdown arrow next to it.

2. **Click "Fork"** (the button, not the dropdown).

3. **A new page opens** titled "Create a new fork."

4. **Owner**: this should already be set to your GitHub username. If it shows multiple options (like an organization name), pick your personal username.

5. **Repository name**: leave the default (`knb-detailing-template`) or shorten it to `knb-detailing`. Both work.

6. **Description**: leave blank or type something like "Our KNB Detailing website."

7. **Copy the main branch only**: leave this checkbox **checked**.

8. **Click the green "Create fork" button**.

9. **Wait ~5 seconds.** GitHub copies the entire project into your account.

10. **Confirmation**: you'll land on a page that looks identical to the previous one, but the URL bar now shows:

    `https://github.com/YOUR-USERNAME/knb-detailing` (or `knb-detailing-template`)

    Notice that the top of the page now shows **your username** as the owner, with a tiny "forked from Beaconshire-Advisory-LLC/knb-detailing-template" note in grey. **That's yours.**

11. **Bookmark this page.** You'll come back to it in Part 6.

## What you've accomplished

You now own a complete copy of the website code. It's just sitting on GitHub — it isn't running anywhere yet. **In Part 6, you'll connect it to Vercel and turn it into a real, viewable website.**

---

# Part 5 · (Optional alternative) Download the code as a ZIP file

**Skip this section if you forked the code in Part 4 — you don't need it.**

If forking didn't work or felt confusing, you can also download the code as a regular ZIP file and re-upload it later. This is slower but visually familiar.

## Steps (skip if you already forked)

1. **On the GitHub repo page**, find the green **Code** button on the upper-right of the file list.

2. **Click "Code."** A dropdown appears.

3. **Click "Download ZIP"** at the bottom of the dropdown.

4. **The file downloads** to your computer's Downloads folder. It will be named something like `knb-detailing-template-main.zip`.

5. **Find the file in your Downloads folder:**
   - **On a Mac**: open Finder → Downloads.
   - **On a PC**: open File Explorer → Downloads.

6. **Extract the ZIP file:**
   - **On a Mac**: double-click the ZIP. A new folder appears next to it (no ZIP).
   - **On a PC**: right-click the ZIP → "Extract All..." → click "Extract" in the dialog that appears.

7. **You now have a folder** named `knb-detailing-template-main` (or similar) containing the website code.

## What to do with the downloaded folder

Vercel cannot deploy from a folder on your computer — it needs the code on GitHub. So if you went this route, you now need to **put the folder back on GitHub as your own repo:**

1. On GitHub, click the **+ icon** at the top-right → **New repository**.
2. Repository name: `knb-detailing`.
3. Visibility: **Private** (recommended).
4. **Click "Create repository."**
5. On the new repo's page, you'll see a section labeled "**…or upload an existing file**." Click that link.
6. **Drag the contents of the extracted folder** into the upload box.
7. **Click "Commit changes"** at the bottom.

> ⚠️ **GitHub's web uploader has limits.** It refuses very large file batches and won't preserve hidden files (anything starting with a `.`). If it fails partway, scroll up and **strongly prefer Part 4 (Fork)** instead — it's safer and faster.

---

# Part 6 · Sign up for Vercel (3 minutes)

Vercel is where your website will actually run. They specialize in hosting websites built with the framework yours uses (Next.js). The free plan covers everything a small business needs.

## Steps

1. **New browser tab.** Go to `vercel.com`.

2. **Click "Sign Up"** in the top-right corner.

3. **Important**: click **"Continue with GitHub"** — not email. This connects your Vercel account to your GitHub account in one step, which is exactly what we want.

4. **GitHub asks**: "Authorize Vercel?" Click **"Authorize Vercel."**

5. **Vercel asks**: "What's your name?" Type your name (or your business name).

6. **Vercel asks**: "Which best describes you?" Pick **"Building products / Doing my own thing."**

7. **Plan**: pick **Hobby** (free).

8. **Click "Continue."**

9. **You land on your Vercel dashboard.** It's mostly empty — that's correct.

---

# Part 7 · Deploy your website (10 minutes)

This is the magic part. With one button click, Vercel will pull your forked code from GitHub, build it, and put it on a live URL.

## Steps

1. **On your Vercel dashboard**, click the **"Add New..."** button (top-right) → **"Project."**

2. **You'll see**: "Let's build something new." A list of your GitHub repositories appears below.

3. **Find `knb-detailing` (or `knb-detailing-template`)** in the list. Click the **"Import"** button next to it.

> If you don't see it, click "**Adjust GitHub App Permissions**" at the bottom of the list and grant Vercel access to your repo. Then refresh.

4. **The "Configure Project" screen opens.** Vercel automatically detects this is a Next.js project — leave all the framework settings as they are.

5. **Scroll down to "Environment Variables."** This is where you tell the site how to connect to your database, payment processor, and so on. **For this first preview deploy, you can skip them all** — the site will deploy without them and the parts that need them will simply be disabled (like in the preview link you saw in Part 1).

   *If you want to fill them in to make everything work, that's covered in the separate setup walkthrough document. For just the visual preview, leave this section blank.*

6. **Click the big "Deploy" button** at the bottom of the page.

7. **Wait ~3 minutes.** A progress bar shows the build steps:
   - **Cloning** (Vercel grabs your code from GitHub)
   - **Building** (it compiles the website)
   - **Deploying** (it makes the result live)
   - **Assigning domains** (Vercel gives it a URL)

8. **You'll see a celebration screen** with confetti and your new URL:

   `https://knb-detailing-XYZ.vercel.app`

   (The `XYZ` part is a unique code Vercel generates.)

9. **Click "Continue to Dashboard."** You land on your project's page.

10. **Click the URL** at the top of the page (the big `*.vercel.app` link). A new tab opens — **and that's your live website.**

---

# Part 8 · What just happened

Congratulations. You now have:

- **A live website** at `https://knb-detailing-XYZ.vercel.app` that anyone with the URL can visit
- **A free Vercel project** that automatically rebuilds the site any time you change the code on GitHub
- **A free GitHub repository** that holds your code
- **No subscription**, **no monthly fee to Beaconshire Advisory**, and **no obligation to do anything else**

## What's not yet working

Your live site is **visually complete** but the dynamic features are dormant. Specifically:

| Feature | Why it doesn't work yet | When it will work |
|---|---|---|
| The booking form | No database connected | After you complete the Setup Walkthrough |
| Customer sign-in | No authentication service connected | Same |
| Real payments | Stripe not connected | Same |
| Booking confirmations by email | Email service not connected | Same |
| SMS reminders | Twilio not connected | Same |
| Admin dashboard | Same | Same |
| Custom `knbdetailing.com` domain | Domain not connected | Same |

The Setup Walkthrough document (`02-setup-walkthrough.md` in the same handoff folder) takes you through activating each of those — about 2 hours of clicking, plus 1–3 days of waiting on Stripe and Twilio to verify your business.

## What you decide right now

**You have a working preview.** You can:

1. **Stop here** — share the `*.vercel.app` URL with friends and family, gather feedback, decide if you want to go all the way.
2. **Continue with the Setup Walkthrough** — connect the database, payments, email, SMS, and a custom domain. This takes about 2 hours of clicking plus 1–3 days of waiting on Stripe and Twilio to verify your business.

There's no wrong answer. The preview alone is already more than most small businesses have on the internet.

---

# Optional · Preview the site on your own computer

Skip this section unless you're curious or comfortable with the command line.

Some developers like to run the website on their own computer before deploying it. This lets you make changes and test them privately. It is **not necessary** for any of the steps above.

## Steps (advanced)

### On a Mac

1. Open **Terminal** (press Cmd+Space, type "Terminal", press Enter).
2. Install Node.js by typing this and pressing Enter:
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. After that finishes, type:
   ```
   brew install node pnpm git
   ```
4. Navigate to your Downloads folder:
   ```
   cd ~/Downloads/knb-detailing-template-main
   ```
   (Adjust the folder name if yours is different.)
5. Install dependencies and start the site:
   ```
   pnpm install
   pnpm dev
   ```
6. Open your browser to `http://localhost:3000`. The site is now running on your laptop.

### On a PC

1. Download Node.js from <https://nodejs.org> (pick the LTS version, click the Windows installer).
2. Run the installer. Click Next on every screen until it finishes.
3. Download Git from <https://git-scm.com/download/win>. Same drill — click Next on every screen.
4. Open **Command Prompt** (press Windows key, type "cmd", press Enter).
5. Type these one at a time:
   ```
   npm install -g pnpm
   cd %USERPROFILE%\Downloads\knb-detailing-template-main
   pnpm install
   pnpm dev
   ```
6. Open your browser to `http://localhost:3000`. The site is now running on your PC.

To stop it, press **Ctrl+C** in the Terminal/Command Prompt.

---

# FAQ

## "I forgot my GitHub password."

On GitHub's sign-in page, click "Forgot password?" — they'll email you a reset link.

## "I clicked the wrong button somewhere."

Just close the tab and start over. None of these steps cost money or commit you to anything. The worst case is you've created an unused empty repo or Vercel project, which you can delete from your account settings.

## "I see an error page when I open my Vercel URL."

Wait one more minute, then refresh. Sometimes the deploy takes a little longer than the dashboard says it will. If it still shows an error after 5 minutes, go to your Vercel dashboard → click your project → "Deployments" tab → click the most recent deployment → look at the logs. The error message at the bottom usually tells you what went wrong.

## "My preview URL works but the booking form doesn't do anything."

That's expected. The form is a real form, but without a connected database, it just logs the submission to Vercel's logs and shows a thank-you message. You'll connect the database (Supabase) in the full Setup Walkthrough.

## "How do I make this look different / change the colors / edit the home page?"

For now, that's something Beaconshire Advisory can do for you, or any web developer with Next.js experience. Everything is in your GitHub repo — `src/lib/constants.ts` (business info), `src/lib/images.ts` (photos), `src/app/(marketing)/page.tsx` (home page), `src/app/globals.css` (colors). It's not difficult once you've seen the pattern; Beaconshire can show you in a screen-share if you want.

## "Can I take this somewhere else later?"

Yes. Everything is in your accounts. You can delete Vercel and use Netlify. You can fire your developer and hire another. You can rebuild the design from scratch and keep the customer data. **You own this.** There's no lock-in.

---

# Where to go next

Once you've decided you want to fully launch:

1. **Open `02-setup-walkthrough.md`** in the `handoff/` folder of your repo. This is the full step-by-step for connecting your database, payments, email, SMS, and custom domain.

2. **Block 90 minutes on your calendar** plus give yourself 3 business days of background time for Stripe + SMS carrier approvals.

3. **Follow it top to bottom.** You won't need to call me unless something is truly unusual.

If you decide to stay with just the preview for now: enjoy. You can always come back later and complete the full launch.

---

*This tutorial was prepared by Beaconshire Advisory specifically for KNB Detailing. You own this website outright — there is no ongoing fee to me, no subscription, and no commitment. Thanks for the opportunity to build it for you.*

*— James Flecker, Beaconshire Advisory*
