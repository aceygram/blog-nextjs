"use client";

// src/app/studio/[[...index]]/page.tsx
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';



export default function StudioPage() {
  return <NextStudio config={config} />;
}