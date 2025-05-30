//create from next-sanity
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01", // Match this in all places
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  token: process.env.SANITY_API_TOKEN, // If using drafts
  ignoreBrowserTokenWarning: true,
});