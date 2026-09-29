import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export function GET() {
  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: 96, background: '#0b1c31', color: '#f1f5f9',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ width: 92, height: 8, background: '#3a7ca5', marginBottom: 54 }} />
      <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: 3 }}>KNORX</div>
      <div style={{ fontSize: 28, letterSpacing: 7, color: '#90bad3', marginTop: 8 }}>TECHNOLOGIES</div>
      <div style={{ fontSize: 32, marginTop: 76 }}>From Complexity to Working Systems.</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
