/**
 * QR Code Generation Utility
 * 
 * This utility generates a QR code for the form URL.
 * The QR code is Evergreen (permanent) and does not expire.
 * You can use a library like qrcode.react or a service like QR Server API.
 */

/**
 * Generate QR code using QR Server API (free, no API key needed)
 * @param url The URL to encode in the QR code
 * @param size The size of the QR code image (default: 200)
 * @returns URL of the QR code image
 */
export const generateQRCodeURL = (url: string, size: number = 200): string => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
}

/**
 * Generate QR code using QRCode.js (client-side)
 * This requires the qrcode library to be installed
 */
export const generateQRCodeDataURL = async (url: string): Promise<string> => {
  // This would use a library like 'qrcode' or 'qrcode.react'
  // For now, we'll use the QR Server API as it doesn't require additional dependencies
  return generateQRCodeURL(url)
}

