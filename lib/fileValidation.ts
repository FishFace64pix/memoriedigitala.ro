/**
 * File validation constants and utilities
 */

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  photo: 10 * 1024 * 1024,      // 10MB
  video: 100 * 1024 * 1024,     // 100MB
  audio: 10 * 1024 * 1024,      // 10MB
} as const;

// Allowed MIME types
export const ALLOWED_TYPES = {
  photo: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ],
  video: [
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo',
  ],
  audio: [
    'audio/webm',
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
  ],
} as const;

/**
 * Validate file type
 */
export function validateFileType(
  file: File,
  uploadType: 'photo' | 'video' | 'audio'
): { valid: boolean; error?: string } {
  const allowedTypes = ALLOWED_TYPES[uploadType];
  const fileType = file.type;

  const typeArray = allowedTypes as readonly string[];
  if (!typeArray.includes(fileType)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(
  file: File,
  uploadType: 'photo' | 'video' | 'audio'
): { valid: boolean; error?: string } {
  const maxSize = FILE_SIZE_LIMITS[uploadType];
  const fileSize = file.size;

  if (fileSize > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Validate file name
 */
export function validateFileName(fileName: string): { valid: boolean; error?: string } {
  // Check for dangerous characters
  const dangerousChars = /[<>:"/\\|?*]/;
  if (dangerousChars.test(fileName)) {
    return {
      valid: false,
      error: 'Invalid file name. Contains dangerous characters.',
    };
  }

  // Check file name length
  if (fileName.length > 255) {
    return {
      valid: false,
      error: 'File name too long. Maximum 255 characters.',
    };
  }

  return { valid: true };
}

/**
 * Comprehensive file validation
 */
export function validateFile(
  file: File,
  uploadType: 'photo' | 'video' | 'audio'
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate file type
  const typeValidation = validateFileType(file, uploadType);
  if (!typeValidation.valid) {
    errors.push(typeValidation.error!);
  }

  // Validate file size
  const sizeValidation = validateFileSize(file, uploadType);
  if (!sizeValidation.valid) {
    errors.push(sizeValidation.error!);
  }

  // Validate file name
  const nameValidation = validateFileName(file.name);
  if (!nameValidation.valid) {
    errors.push(nameValidation.error!);
  }

  // Additional security checks
  if (file.size === 0) {
    errors.push('File is empty');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  // Remove dangerous characters
  let sanitized = fileName.replace(/[<>:"/\\|?*]/g, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  // Replace spaces with underscores
  sanitized = sanitized.replace(/\s+/g, '_');
  
  // Limit length
  if (sanitized.length > 100) {
    const ext = sanitized.substring(sanitized.lastIndexOf('.'));
    sanitized = sanitized.substring(0, 100 - ext.length) + ext;
  }
  
  return sanitized || 'file';
}

/**
 * Get file extension from MIME type
 */
export function getFileExtension(mimeType: string): string {
  const mimeMap: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'video/mp4': '.mp4',
    'video/webm': '.webm',
    'video/quicktime': '.mov',
    'video/x-msvideo': '.avi',
    'audio/webm': '.webm',
    'audio/mpeg': '.mp3',
    'audio/mp3': '.mp3',
    'audio/wav': '.wav',
    'audio/ogg': '.ogg',
  };

  return mimeMap[mimeType] || '';
}

