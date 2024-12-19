import { jsPDF } from 'jspdf';
import { DriverTask } from '../types/task';
import { defaultStyles, applyHeadingStyle, applyContentStyle, applyFooterStyle } from './pdfStyles';

export function generateDriverTaskPDF(task: DriverTask): void {
  const pdf = new jsPDF();
  const { margins, spacing } = defaultStyles;
  let yPosition = margins.top;

  // Add RideConnect text header
  pdf.setFontSize(defaultStyles.fontSize.title);
  pdf.setTextColor(0, 0, 0);
  pdf.text('RideConnect', margins.left, yPosition);
  yPosition += spacing.sectionGap * 2;

  // Add document title
  pdf.setFontSize(defaultStyles.fontSize.heading);
  pdf.text('Driver Task Details', margins.left, yPosition);
  yPosition += spacing.sectionGap;

  // Helper function to add a section
  const addSection = (title: string, content: { label: string; value: string }[]): void => {
    applyHeadingStyle(pdf);
    pdf.text(title, margins.left, yPosition);
    yPosition += spacing.contentGap;

    applyContentStyle(pdf);
    content.forEach(({ label, value }) => {
      pdf.text(`${label}: ${value}`, margins.left, yPosition);
      yPosition += spacing.lineHeight;
    });
    yPosition += spacing.contentGap;
  };

  // Format payment method text
  const getPaymentMethodText = (method: string): string => {
    return method === 'Credit Card' ? 'Already Paid with credit card' : 'Cash to the driver';
  };

  // Task Information
  addSection('Task Information', [
    { label: 'Title', value: task.title },
    { label: 'Description', value: task.description },
    { label: 'Date', value: task.date },
    { label: 'Time', value: task.time }
  ]);

  // Pick-up and Drop-off Information
  addSection('Pick-up and Drop-off Information', [
    { label: 'Pick-up Address', value: task.pickupAddress },
    { label: 'Drop-off Address', value: task.dropoffAddress }
  ]);

  // Client Information
  addSection('Client Information', [
    { label: 'Name', value: task.clientName },
    { label: 'Phone', value: task.clientPhone }
  ]);

  // Vehicle and Driver Information
  addSection('Vehicle and Driver Information', [
    { label: 'Vehicle Type', value: task.vehicleType },
    { label: 'Driver Name', value: task.driverName }
  ]);

  // Payment Information
  addSection('Payment Information', [
    { label: 'Price', value: `$${task.price.toFixed(2)}` },
    { label: 'Payment Method', value: getPaymentMethodText(task.paymentMethod) }
  ]);

  if (task.additionalInfo) {
    addSection('Additional Information', [
      { label: 'Notes', value: task.additionalInfo }
    ]);
  }

  // Add footer
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;

  // Add timestamp
  const timestamp = 'Generated on ' + new Date().toLocaleString();
  applyFooterStyle(pdf);
  pdf.text(timestamp, pageWidth - pdf.getTextWidth(timestamp) - margins.right, pageHeight - margins.bottom);

  // Save the PDF
  pdf.save(`rideconnect-task-${task.id}.pdf`);
}