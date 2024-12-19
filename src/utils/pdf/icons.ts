import { jsPDF } from 'jspdf';
import { defaultStyles } from './styles';

// Icon paths in SVG format
const ICONS = {
  clock: 'M12 6v6h4.5M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
  mapPin: 'M12 21s-8-4.5-8-11a8 8 0 1 1 16 0c0 6.5-8 11-8 11zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  truck: 'M1 3h15v13H1V3zm15 0l4 4v9h-4V3zm-4 13v2H3v-2h9z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  creditCard: 'M1 4v16h22V4H1zm0 4h22M4 12h4',
  banknote: 'M1 4v16h22V4H1zm8 8h6M3 8h2m14 0h2m-2 8h2M5 16H3',
};

interface IconOptions {
  size?: number;
  color?: string;
}

export function drawIcon(
  pdf: jsPDF,
  iconName: keyof typeof ICONS,
  x: number,
  y: number,
  options: IconOptions = {}
): void {
  const { size = 12, color = '#000000' } = options;
  const scale = size / 24; // SVG viewBox is 24x24

  // Convert hex color to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  pdf.setDrawColor(r, g, b);
  pdf.setLineWidth(0.5);

  // Save current transform state
  pdf.saveGraphicsState();

  // Apply scaling transform
  pdf.transform(
    scale, 0,
    0, scale,
    x, y
  );

  // Draw the icon path
  const path = ICONS[iconName];
  pdf.path(path);

  // Restore transform state
  pdf.restoreGraphicsState();
}