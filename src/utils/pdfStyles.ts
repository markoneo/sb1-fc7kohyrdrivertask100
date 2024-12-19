import { jsPDF } from 'jspdf';

export interface PDFStyles {
  fontSize: {
    title: number;
    heading: number;
    content: number;
    footer: number;
  };
  spacing: {
    lineHeight: number;
    sectionGap: number;
    contentGap: number;
  };
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const defaultStyles: PDFStyles = {
  fontSize: {
    title: 24,
    heading: 14,
    content: 12,
    footer: 10
  },
  spacing: {
    lineHeight: 10,
    sectionGap: 15,
    contentGap: 8
  },
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }
};

export function applyHeadingStyle(pdf: jsPDF): void {
  pdf.setFontSize(defaultStyles.fontSize.heading);
  pdf.setTextColor(0, 0, 0);
}

export function applyContentStyle(pdf: jsPDF): void {
  pdf.setFontSize(defaultStyles.fontSize.content);
  pdf.setTextColor(0, 0, 0);
}

export function applyFooterStyle(pdf: jsPDF): void {
  pdf.setFontSize(defaultStyles.fontSize.footer);
  pdf.setTextColor(128, 128, 128);
}