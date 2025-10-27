import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const accessKey = searchParams.get('accessKey');
    const eventUrl = searchParams.get('eventUrl');
    const quantity = parseInt(searchParams.get('quantity') || '1');

    if (!eventId || !accessKey || !eventUrl) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Create QR code image
    const qrCodeDataURL = await QRCode.toDataURL(eventUrl);
    const qrImageBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');

    // Create PDF with minimal options
    const chunks: Buffer[] = [];
    
    return new Promise<NextResponse>((resolve, reject) => {
      const doc = new PDFDocument({
        size: [842, 595], // A4 landscape
        bufferPages: true,
      });

      // Generate specified quantity of cards
      for (let i = 0; i < quantity; i++) {
        if (i > 0) {
          doc.addPage();
        }

        // Title
        doc.fontSize(24)
          .fillColor('blue')
          .text('MemorieDigitala.ro', { align: 'center' });

        // Subtitle
        doc.fontSize(14)
          .fillColor('gray')
          .text('Scan to share your memories', { align: 'center' });

        // QR Code - centered
        const qrSize = 150;
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const qrX = (pageWidth - qrSize) / 2;
        const qrY = 170;
        
        doc.image(qrImageBuffer, qrX, qrY, {
          fit: [qrSize, qrSize],
        });

        // Instructions
        doc.fontSize(12)
          .fillColor('black')
          .text('1. Scan this QR code with your phone', { align: 'center' })
          .text('2. Upload your photos and videos', { align: 'center' })
          .text('3. Share the memories!', { align: 'center' });

        // Footer
        doc.fontSize(10)
          .fillColor('gray')
          .text(`Event ID: ${eventId}`, { align: 'center' });
      }

      // Collect PDF chunks
      doc.on('data', (chunk) => chunks.push(chunk));
      
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(
          new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename=qr-cards-${eventId}.pdf`,
            },
          })
        );
      });
      
      doc.on('error', (error) => {
        console.error('PDF generation error:', error);
        reject(
          NextResponse.json(
            { error: 'Error generating PDF: ' + error.message },
            { status: 500 }
          )
        );
      });
      
      // End the document
      doc.end();
    });

  } catch (error: any) {
    console.error('Error generating QR template PDF:', error);
    return NextResponse.json(
      { error: 'Error generating PDF: ' + error.message },
      { status: 500 }
    );
  }
}
