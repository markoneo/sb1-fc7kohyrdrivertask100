import { jsPDF } from 'jspdf';
import { DriverTask } from '../../types/task';
import { defaultStyles, applyHeadingStyle, applyContentStyle, applyFooterStyle } from './styles';
import { drawRideConnectLogo } from './logo';
import { drawIcon } from './icons';

export function generateDriverTaskPDF(task: DriverTask): void {
  const pdf = new jsPDF();
  const { margins, spacing } = defaultStyles;
  let yPosition = margins.top;

  // Add RideConnect logo
  drawRideConnectLogo(pdf, margins.left, yPosition, 1.5);
  yPosition += spacing.sectionGap * 2;

  // Add document title
  pdf.setFontSize(defaultStyles.fontSize.heading);
  pdf.text('Driver Task Details', margins.left, yPosition);
  yPosition += spacing.sectionGap;

  // Helper function to add a section with icon
  const addSection = (
    title: string,
    content: { label: string; value: string; icon?: keyof typeof ICONS }[],
    sectionIcon?: keyof typeof ICONS
  ): void => {
    applyHeadingStyle(pdf);
    
    // Draw section icon if provided
    if (sectionIcon) {
      drawIcon(pdf, sectionIcon, margins.left, yPosition - 4, { size: 16, color: '#009DFF' });
      pdf.text(title, margins.left + 20, yPosition);
    } else {
      pdf.text(title, margins.left, yPosition);
    }
    
    yPosition += spacing.contentGap;

    applyContentStyle(pdf);
    content.forEach(({ label, value, icon }) => {
      if (icon) {
        drawIcon(pdf, icon, margins.left, yPosition - 4, { size: 12 });
        pdf.text(`${label}: ${value}`, margins.left + 16, yPosition);
      } else {
        pdf.text(`${label}: ${value}`, margins.left, yPosition);
      }
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
    { label: 'Date', value: task.date, icon: 'clock' },
    { label: 'Time', value: task.time, icon: 'clock' }
  ]);

  // Pick-up and Drop-off Information
  addSection('Pick-up and Drop-off Information', [
    { label: 'Pick-up Address', value: task.pickupAddress, icon: 'mapPin' },
    { label: 'Drop-off Address', value: task.dropoffAddress, icon: 'mapPin' }
  ]);

  // Client Information
  addSection('Client Information', [
    { label: 'Name', value: task.clientName, icon: 'user' },
    { label: 'Phone', value: task.clientPhone, icon: 'phone' }
  ]);

  // Vehicle and Driver Information
  addSection('Vehicle and Driver Information', [
    { label: 'Vehicle Type', value: task.vehicleType, icon: 'truck' },
    { label: 'Driver Name', value: task.driverName, icon: 'user' }
  ]);

  // Payment Information
  addSection('Payment Information', [
    { label: 'Price', value: `$${task.price.toFixed(2)}`, icon: task.paymentMethod === 'Credit Card' ? 'creditCard' : 'banknote' },
    { label: 'Payment Method', value: getPaymentMethodText(task.paymentMethod), icon: task.paymentMethod === 'Credit Card' ? 'creditCard' : 'banknote' }
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