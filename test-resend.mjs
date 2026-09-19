// Quick test: node test-resend.mjs
import { Resend } from 'resend';
import { readFileSync } from 'fs';

// Read .env manually (no dotenv dependency needed)
let apiKey;
try {
  const envContent = readFileSync('.env', 'utf-8');
  const match = envContent.match(/RESEND_API_KEY=(.+)/);
  apiKey = match?.[1]?.trim();
} catch {
  // .env doesn't exist
}

if (!apiKey || apiKey === 're_tu_api_key_aqui') {
  console.error('❌ No API key found. Add your Resend API key to .env:');
  console.error('   RESEND_API_KEY=re_xxxxxxxxxxxx');
  process.exit(1);
}

console.log('🔑 API key found:', apiKey.substring(0, 8) + '...');

const resend = new Resend(apiKey);

try {
  const { data, error } = await resend.emails.send({
    from: 'GetUp Test <noreply@ugetup.com>',
    to: ['info@ugetup.com'],
    subject: 'Test from GetUp - Resend is working!',
    html: '<h1>It works!</h1><p>If you received this, Resend is configured correctly.</p>',
  });

  if (error) {
    console.error('❌ Resend error:', error);
    process.exit(1);
  }

  console.log('✅ Email sent successfully!');
  console.log('   Email ID:', data.id);
  console.log('   Check your inbox at info@ugetup.com');
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
