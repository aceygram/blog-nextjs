// src/sanity/client.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'g90xy098',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
