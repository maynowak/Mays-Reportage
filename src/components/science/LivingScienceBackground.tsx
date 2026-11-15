import { useId } from 'react';

type Density = 'low' | 'medium' | 'high';
type Variant = 'transition' | 'story' | 'story-end' | 'ambient';
type Theme = 'microbiology';

interface Props {
  density?: Density;
  variant?: Variant;
  theme?: Theme;
  className?: string;
}

function ScienceTile({ suffix }: { suffix: string }) {
  const teal = `science-teal-${suffix}`;
  const violet = `science-violet-${suffix}`;
  const glow = `science-glow-${suffix}`;
  const phage = `science-phage-${suffix}`;

  return (
    <svg
      className="science-tile"
      viewBox="0 0 800 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={teal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--science-teal)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--science-deep)" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id={violet} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--science-violet)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--surface-lavender)" stopOpacity="0.03" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0%" stopColor="var(--science-bright)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--science-bright)" stopOpacity="0" />
        </radialGradient>
        <g id={phage}>
          <g fill="none" stroke="var(--science-deep)" strokeWidth="3" strokeLinecap="round" opacity="0.5">
            <path d="M0 -26 14 -17 14 7 0 16 -14 7 -14 -17Z" fill="var(--science-teal)" fillOpacity="0.1" />
            <path d="M0 16v28M0 44l-15 16M0 44l15 16M0 48l-20 12M0 48l20 12" />
          </g>
        </g>
      </defs>

      <rect width="800" height="900" fill="transparent" />
      <ellipse cx="130" cy="160" rx="120" ry="160" fill={`url(#${teal})`} transform="rotate(-18 130 160)" />
      <ellipse cx="690" cy="470" rx="110" ry="150" fill={`url(#${violet})`} transform="rotate(22 690 470)" />
      <ellipse cx="290" cy="720" rx="150" ry="95" fill={`url(#${teal})`} opacity="0.6" />
      <circle cx="620" cy="120" r="120" fill={`url(#${glow})`} />
      <circle cx="190" cy="560" r="150" fill={`url(#${glow})`} opacity="0.55" />

      <g fill="none" stroke="var(--science-deep)" strokeWidth="2" opacity="0.24">
        <path d="M40 70c120 80-60 170 70 250s-80 170 50 260-70 180 60 250" />
        <path d="M78 70c120 80-60 170 70 250s-80 170 50 260-70 180 60 250" />
        <path d="M46 100h32M55 130h32M48 160h32M58 190h32M50 220h32M62 250h30M52 280h32M60 310h30M50 340h32M62 370h30M52 400h32M60 430h30M50 460h32M62 490h30M52 520h32M60 550h30M50 580h32M62 610h30M52 640h32M60 670h30M50 700h32M62 730h30M52 760h32M60 790h30" />
      </g>

      <g fill="none" stroke="var(--science-violet)" strokeWidth="2" opacity="0.2">
        <path d="M520 30c-90 120 80 160 10 280s-90 190 0 280-60 190 20 280" />
        <path d="M558 30c-90 120 80 160 10 280s-90 190 0 280-60 190 20 280" />
      </g>

      <use href={`#${phage}`} transform="translate(245 390) scale(1.05)" />
      <use href={`#${phage}`} transform="translate(640 680) scale(0.8)" />
      <use href={`#${phage}`} transform="translate(560 260) scale(0.55)" />

      <g fill="var(--science-deep)" opacity="0.28">
        <circle cx="350" cy="90" r="3" />
        <circle cx="380" cy="120" r="2" />
        <circle cx="330" cy="160" r="2.5" />
        <circle cx="720" cy="250" r="2" />
        <circle cx="740" cy="290" r="3" />
        <circle cx="120" cy="760" r="3" />
        <circle cx="160" cy="810" r="2" />
      </g>
      <g fill="none" stroke="var(--science-teal)" strokeWidth="1.5" opacity="0.22">
        <circle cx="700" cy="740" r="46" />
        <circle cx="700" cy="740" r="34" />
        <circle cx="120" cy="360" r="56" />
        <circle cx="120" cy="360" r="40" />
      </g>
    </svg>
  );
}

export function LivingScienceBackground({
  density = 'medium',
  variant = 'story',
  theme = 'microbiology',
  className = '',
}: Props) {
  const suffix = useId().replace(/:/g, '');
  const layers = variant === 'ambient' ? ['far', 'mid'] : ['far', 'mid', 'near'];

  return (
    <div
      className={`living-science living-science--${variant} living-science--${density} living-science--${theme}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <div className="living-science__glow" />
      {layers.map((layer) => (
        <div key={layer} className={`living-science__layer living-science__layer--${layer}`}>
          <ScienceTile suffix={`${suffix}-${layer}-a`} />
          <ScienceTile suffix={`${suffix}-${layer}-b`} />
        </div>
      ))}
      <div className="living-science__vignette" />
    </div>
  );
}
