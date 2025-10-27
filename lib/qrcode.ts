import QRCode from 'qrcode';

export async function generateQRCode(text: string): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

export async function downloadQRCode(url: string, filename: string) {
  try {
    const qrDataUrl = await generateQRCode(url);
    const link = document.createElement('a');
    link.download = filename;
    link.href = qrDataUrl;
    link.click();
  } catch (error) {
    console.error('Error downloading QR code:', error);
  }
}

export function getQRCardURL(eventUrl: string): string {
  // Return the URL for the QR card template
  // This would be served from the backend
  return `/api/qr-template?url=${encodeURIComponent(eventUrl)}`;
}

