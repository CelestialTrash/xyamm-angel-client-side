// src/sanityClient.js
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'y75hs7vq', // Replace with your project ID
  dataset: 'production', // Make sure this matches the dataset in Sanity
  apiVersion: '2023-09-23', // Use the latest API version
  useCdn: true, // Use the CDN for faster response, set false for fresh data
});

export default sanityClient;

