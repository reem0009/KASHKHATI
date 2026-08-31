import { useState } from 'react';
import type { AvatarConfig } from '../types';
import { Button, Card, CardBody } from '../components/ui';
import { AVATAR_STYLES, AVATAR_PATTERNS, COLOR_PALETTE } from '../constants';

interface AvatarGeneratorProps {
  onSave?: (config: AvatarConfig) => void;
}

export const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ onSave }) => {
  const [config, setConfig] = useState<AvatarConfig>({
    id: `avatar-${Date.now()}`,
    baseColor: COLOR_PALETTE.PRIMARY[500],
    pattern: AVATAR_PATTERNS[0],
    style: 'geometric',
    accessories: [],
  });

  const handleColorChange = (color: string) => {
    setConfig({ ...config, baseColor: color });
  };

  const handlePatternChange = (pattern: string) => {
    setConfig({ ...config, pattern });
  };

  const handleStyleChange = (style: 'geometric' | 'abstract' | 'cultural') => {
    setConfig({ ...config, style });
  };

  const handleRandomize = () => {
    const randomColor = Object.values(COLOR_PALETTE.PRIMARY)[
      Math.floor(Math.random() * 10)
    ];
    const randomPattern = AVATAR_PATTERNS[Math.floor(Math.random() * AVATAR_PATTERNS.length)];
    const randomStyle = Object.values(AVATAR_STYLES)[
      Math.floor(Math.random() * 3)
    ] as 'geometric' | 'abstract' | 'cultural';

    setConfig({
      ...config,
      baseColor: randomColor,
      pattern: randomPattern,
      style: randomStyle,
    });
  };

  return (
    <div className="container-md mx-auto py-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
        {/* Preview */}
        <div className="flex-col-center">
          <Card className="w-full max-w-sm">
            <CardBody className="flex-col-center">
              <AvatarPreview config={config} />
              <Button
                variant="secondary"
                onClick={handleRandomize}
                className="mt-xl w-full"
              >
                🎲 عشوائي / Randomize
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-lg">
          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-md">اللون / Color</h3>
              <div className="grid grid-cols-5 gap-md">
                {Object.entries(COLOR_PALETTE.PRIMARY).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => handleColorChange(color)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      config.baseColor === color
                        ? 'border-neutral-900 shadow-lg'
                        : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={`Shade ${key}`}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-md">النمط / Pattern</h3>
              <div className="grid grid-cols-2 gap-md">
                {AVATAR_PATTERNS.map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => handlePatternChange(pattern)}
                    className={`px-md py-md rounded-lg border-2 font-medium transition-all ${
                      config.pattern === pattern
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-md">النمط / Style</h3>
              <div className="space-y-md">
                {Object.entries(AVATAR_STYLES).map(([key, style]) => (
                  <label key={key} className="flex items-center p-md border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="avatar-style"
                      value={style}
                      checked={config.style === style}
                      onChange={() => handleStyleChange(style as 'geometric' | 'abstract' | 'cultural')}
                      className="mr-md"
                    />
                    <span className="font-medium text-neutral-900 capitalize">{style}</span>
                  </label>
                ))}
              </div>
            </CardBody>
          </Card>

          <div className="flex gap-md">
            <Button
              variant="primary"
              onClick={() => onSave?.(config)}
              className="flex-1"
            >
              ✓ حفظ / Save Avatar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AvatarPreviewProps {
  config: AvatarConfig;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({ config }) => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="rounded-2xl shadow-lg"
    >
      {/* Background */}
      <rect width="200" height="200" fill={config.baseColor} />

      {/* Base Shape */}
      {config.style === 'geometric' && (
        <>
          <circle cx="100" cy="100" r="80" fill={config.baseColor} opacity="0.8" />
          <polygon
            points="100,20 180,80 180,180 20,180 20,80"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
        </>
      )}

      {config.style === 'abstract' && (
        <>
          <path
            d="M 50 50 Q 100 20 150 50 Q 180 100 150 150 Q 100 180 50 150 Q 20 100 50 50"
            fill="rgba(255,255,255,0.1)"
          />
          <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </>
      )}

      {config.style === 'cultural' && (
        <>
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </>
      )}

      {/* Pattern */}
      <g opacity="0.3">
        {config.pattern === 'circles' && (
          <>
            <circle cx="60" cy="60" r="15" fill="rgba(255,255,255,0.5)" />
            <circle cx="140" cy="60" r="15" fill="rgba(255,255,255,0.5)" />
            <circle cx="100" cy="140" r="15" fill="rgba(255,255,255,0.5)" />
          </>
        )}
        {config.pattern === 'mandalas' && (
          <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="5,5" />
        )}
      </g>

      {/* Center Accent */}
      <circle cx="100" cy="100" r="25" fill="rgba(255,255,255,0.15)" />
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fill="rgba(255,255,255,0.6)"
        fontSize="40"
        fontWeight="bold"
        fontFamily="serif"
      >
        ك
      </text>
    </svg>
  );
};
