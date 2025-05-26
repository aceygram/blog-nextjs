import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes/index';

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || 'g90xy098',
  dataset: dataset || 'production',
  schema,
  plugins: [
    deskTool(),      // for content editing
    visionTool(),    // optional, GROQ playground
  ],
});
