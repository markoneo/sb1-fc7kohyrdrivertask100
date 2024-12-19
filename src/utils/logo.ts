import { jsPDF } from 'jspdf';

interface LogoColors {
  primary: string;
  secondary: string;
}

export const BRAND_COLORS: LogoColors = {
  primary: '#009DFF', // Light blue
  secondary: '#000000' // Black
};

export function hexToRGB(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export function drawRideConnectLogo(pdf: jsPDF, x: number, y: number, scale: number = 1): void {
  const baseSize = 12 * scale;
  const letterSpacing = 0.2 * scale;
  
  pdf.setFontSize(baseSize);
  const [r, g, b] = hexToRGB(BRAND_COLORS.primary);
  
  // First line - "Ride"
  // "Ri" in blue
  pdf.setTextColor(r, g, b);
  pdf.text('R', x, y);
  let currentX = x + pdf.getTextWidth('R') + letterSpacing;
  pdf.text('i', currentX, y);
  currentX += pdf.getTextWidth('i') + letterSpacing;
  
  // "de" in black
  pdf.setTextColor(0, 0, 0);
  pdf.text('de', currentX, y);
  
  // Second line - "Connect"
  // Reset x position for new line
  currentX = x;
  const lineHeight = baseSize * 1.2;
  
  // "Co" in black
  pdf.text('Co', currentX, y + lineHeight);
  currentX += pdf.getTextWidth('Co') + letterSpacing;
  
  // "nn" in blue
  pdf.setTextColor(r, g, b);
  pdf.text('nn', currentX, y + lineHeight);
  currentX += pdf.getTextWidth('nn') + letterSpacing;
  
  // "ect" in black
  pdf.setTextColor(0, 0, 0);
  pdf.text('ect', currentX, y + lineHeight);
}