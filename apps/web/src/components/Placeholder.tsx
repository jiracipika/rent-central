export default function PlaceholderPage({ title, icon }: { title: string; icon: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pb-20"
      style={{ background: 'var(--ios-grouped-bg)' }}
    >
      <div
        className="animate-ios-fade-in"
        style={{
          background: 'var(--ios-grouped-bg2)',
          borderRadius: 20,
          padding: '48px 32px',
          textAlign: 'center',
          maxWidth: 340,
          width: '100%',
          border: '0.5px solid var(--ios-sep)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'rgba(0,122,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: 32,
          }}
        >
          {icon}
        </div>

        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.35px',
            color: 'var(--ios-label)',
            marginBottom: 8,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: 15,
            color: 'var(--ios-label2)',
            lineHeight: 1.47,
            letterSpacing: '-0.23px',
          }}
        >
          We&apos;re building this feature. Check back soon!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: 'var(--ios-blue)',
                animation: `pulse-dot 1.8s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
