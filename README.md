# SWPPP Automation

- https://swppp-automation.vercel.app/

## Features

- Automate swppp reporting with daily, weekly, and monthly reporting.
- Aggregate projects, and weather data for easy swppp daily/weekly reporting
- Swppp project plan builder and document aggregator
- Swppp learing resources for Swppp managers
- Compliance and automation tools to make swppp easy

## Demo

- https://swppp-automation.vercel.app/

  ## Video Demo 
  
  - Displays multiple projects for swppp automation
  - Click a project, weather data by day is on the left the report generator is on the right
  - Click fill to enter in the weather data by day
  - Add pictures if needed
  - Add project condition notes if needed
  - Click send for the swppp report to be generated as a pdf and emailed to the relevant party
  - Manage several swppp projects in seconds instead of hours pulling data and writing reports 


- https://www.loom.com/share/e317bdc6bf7c460c8be36dbba18fe852?sid=2bc6fa8e-8faa-4f47-814f-9a4afef7e529


## Contribution Instructions
Never work on main, only pull request to main from respective branch

Work on respective branch and pull request in

Before Commits -> Run ```yarn run build``` or ```npm run build``` -> Ensure a clean build is pushed to your branch before commiting 

Upon clean build commit and open pull requests. 

**It is the contributor/branch users responsibility to pull main changes in periodically or when changes are made on main.** Use this to help -> [Do not rebase, merge instead like so](https://stackoverflow.com/a/74695315)

## Develop locally

If you haven't already done so, clone your Github repository to your local machine.

Next, use the [Vercel CLI](https://vercel.com/download) to link your project:

```bash
vercel login
vercel link
```

### Setting up the env vars locally

Use the Vercel CLI to download the development env vars:

```bash
vercel env pull .env.local
```

Running this command will create a new `.env.local` file in your project folder. For security purposes, you will need to set the `SUPABASE_SERVICE_ROLE_KEY` manually from your [Supabase dashboard](https://app.supabase.io/) (`Settings > API`).

### Use the Stripe CLI to test webhooks

[Install the Stripe CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#login-account).

Next, start local webhook forwarding:

```bash
stripe listen --forward-to=localhost:3000/api/webhooks
```

Running this Stripe command will print a webhook secret (such as, `whsec_***`) to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

### Install dependencies and run the Next.js client

In a separate terminal, run the following commands to install dependencies and start the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Note that webhook forwarding and the development server must be running concurrently in two separate terminals for the application to work correctly.

Finally, navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application rendered.

This repository is a clone of the following repo for any troubleshooting:

https://github.com/vercel/nextjs-subscription-payments

## Going live

### Archive testing products

Archive all test mode Stripe products before going live. Before creating your live mode products, make sure to follow the steps below to set up your live mode env vars and webhooks.

### Configure production environment variables

To run the project in live mode and process payments with Stripe, switch Stripe from "test mode" to "production mode." Your Stripe API keys will be different in production mode, and you will have to create a separate production mode webhook. Copy these values and paste them into Vercel, replacing the test mode values.

### Redeploy

Afterward, you will need to rebuild your production deployment for the changes to take effect. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy" (do NOT enable the "Use existing Build Cache" option).


## Todo List

### Front End

- Design Overhall Schema
-- Form Design
-- Header
-- Forms
-- Button 

### Back End and Features

- submission form - form handeling route upon successful submission - location
- settings page, add delete project page
- edit projects page and form to edit projects
- project page change from for to overview, new page to route to report submission
- project page - map tile, link to swppp plan builder
