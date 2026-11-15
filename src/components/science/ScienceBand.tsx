import { LivingScienceBackground } from './LivingScienceBackground';

export function ScienceBand({
  variant = 'story',
}: {
  variant?: 'transition' | 'story' | 'story-end';
}) {
  return (
    <div className={`science-band science-band--${variant}`} aria-hidden="true">
      <LivingScienceBackground variant={variant} density={variant === 'transition' ? 'high' : 'medium'} />
      <div className="science-band__vignette" />
    </div>
  );
}
