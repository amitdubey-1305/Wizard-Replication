import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';

/**
 * A simple Vite plugin that adds two dev-only API endpoints:
 *   POST /api/send-otp    — generates a 6-digit OTP and prints it to the terminal
 *   POST /api/verify-otp  — verifies the OTP entered by the user
 *   POST /api/logout      — clears any server-side session state (for demo)
 *
 * These run ONLY during `npm run dev`. The production build is purely static.
 */
function otpDevServerPlugin(): Plugin {
  // In-memory OTP store: email → { otp, expiresAt }
  const otpStore = new Map<string, { otp: string; expiresAt: number }>();

  function generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  return {
    name: 'otp-dev-server',
    configureServer(server) {
      // Middleware: parse JSON body manually
      async function readBody(req: import('http').IncomingMessage): Promise<Record<string, string>> {
        return new Promise((resolve) => {
          let body = '';
          req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
          req.on('end', () => {
            try { resolve(JSON.parse(body)); } catch { resolve({}); }
          });
        });
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST') return next();

        // ── POST /api/send-otp ──────────────────────────────────────────────
        if (req.url === '/api/send-otp') {
          const { email } = await readBody(req);

          if (!email || !email.includes('@')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Invalid email address' }));
            return;
          }

          const otp = generateOtp();
          const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
          otpStore.set(email.toLowerCase(), { otp, expiresAt });

          // ✅ Print to the terminal running npm run dev
          console.log('\n');
          console.log('╔══════════════════════════════════════════════╗');
          console.log('║           🔐  OTP VERIFICATION CODE           ║');
          console.log('╠══════════════════════════════════════════════╣');
          console.log(`║  Email : ${email.padEnd(37)}║`);
          console.log(`║  OTP   : ${otp.padEnd(37)}║`);
          console.log('║  Valid for: 5 minutes                        ║');
          console.log('╚══════════════════════════════════════════════╝');
          console.log('\n');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: `OTP sent to ${email}` }));
          return;
        }

        // ── POST /api/verify-otp ────────────────────────────────────────────
        if (req.url === '/api/verify-otp') {
          const { email, otp } = await readBody(req);

          if (!email || !otp) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Email and OTP are required' }));
            return;
          }

          const record = otpStore.get(email.toLowerCase());

          if (!record) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'No OTP found for this email. Please request a new one.' }));
            return;
          }

          if (Date.now() > record.expiresAt) {
            otpStore.delete(email.toLowerCase());
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'OTP has expired. Please request a new one.' }));
            return;
          }

          if (record.otp !== otp.trim()) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Invalid OTP. Please check and try again.' }));
            return;
          }

          // ✅ OTP matched — clear it (one-time use)
          otpStore.delete(email.toLowerCase());
          console.log(`\n✅ OTP verified successfully for: ${email}\n`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Email verified successfully!' }));
          return;
        }

        // ── POST /api/logout ─────────────────────────────────────────────────
        if (req.url === '/api/logout') {
          const { email } = await readBody(req);
          if (email) otpStore.delete(email.toLowerCase());
          console.log(`\n🚪 User logged out: ${email || 'unknown'}\n`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), otpDevServerPlugin()],
});
