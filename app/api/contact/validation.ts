import { serviceNames } from '../../services';
export { serviceNames } from '../../services';

export type ContactField = 'name' | 'company' | 'email' | 'service' | 'message';
export type ContactInput = Record<ContactField, string> & { website: string };
type ValidationResult =
  | { ok: true; value: ContactInput }
  | { ok: false; fields: Partial<Record<ContactField, string>> };

const limits: Record<ContactField, number> = {
  name: 100, company: 120, email: 254, service: 40, message: 5000,
};

export function parseContact(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, fields: { name: 'Enter your name.', email: 'Enter your email.', message: 'Enter a message.' } };
  }

  const source = input as Record<string, unknown>;
  const fields: Partial<Record<ContactField, string>> = {};
  const value = {} as ContactInput;
  for (const field of Object.keys(limits) as ContactField[]) {
    const raw = source[field];
    if (raw === undefined || raw === null || raw === '') {
      if (field === 'name' || field === 'email' || field === 'message') fields[field] = `Enter your ${field}.`;
      value[field] = '';
      continue;
    }
    if (typeof raw !== 'string') {
      fields[field] = 'Enter valid text.';
      value[field] = '';
      continue;
    }
    value[field] = raw.trim();
    if (value[field].length > limits[field]) fields[field] = `Use ${limits[field]} characters or fewer.`;
  }

  if (!fields.name && value.name.length < 2) fields.name = 'Enter at least 2 characters.';
  if (!fields.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.email)) fields.email = 'Enter a valid email address.';
  if (!fields.message && value.message.length < 10) fields.message = 'Enter at least 10 characters.';
  if (!fields.service && value.service && !serviceNames.includes(value.service as typeof serviceNames[number])) {
    fields.service = 'Choose a listed service.';
  }

  // Website is an unobtrusive honeypot, never sent to the provider.
  value.website = typeof source.website === 'string' ? source.website.slice(0, 200) : '';
  return Object.keys(fields).length ? { ok: false, fields } : { ok: true, value };
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] || character);
}

export function createRateLimiter(now: () => number = Date.now) {
  const windowMs = 15 * 60 * 1000;
  const buckets = new Map<string, { count: number; expires: number }>();
  return {
    take(ip: string) {
      const time = now();
      for (const [key, bucket] of buckets) if (bucket.expires <= time) buckets.delete(key);
      const keys = [['global', 100], [`ip:${ip}`, 5]] as const;
      if (keys.some(([key, max]) => (buckets.get(key)?.count || 0) >= max)) return false;
      for (const [key] of keys) {
        const current = buckets.get(key);
        buckets.set(key, current ? { ...current, count: current.count + 1 } : { count: 1, expires: time + windowMs });
      }
      return true;
    },
  };
}
