import { vercelPreset } from '@vercel/remix/vite';

console.log('Testing vercelPreset import...');
const preset = vercelPreset();
console.log('Preset result:', JSON.stringify(preset, null, 2));
console.log('Preset name:', preset.name);
console.log('Has remixConfig:', typeof preset.remixConfig === 'function');
EOF < /dev/null