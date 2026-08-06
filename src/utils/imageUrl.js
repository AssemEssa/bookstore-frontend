/**
 * Helper function to get the correct image URL
 * - If the path starts with http:// or https://, return as is (external URL)
 * - If the path starts with /uploads, prepend the backend URL
 * - Otherwise, return as is
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://via.placeholder.com/300x450?text=No+Image';
  }
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's an uploaded image path, prepend the backend URL
  if (imagePath.startsWith('/uploads')) {
    // Use environment variable in production, or detect from window location in development
    const backendUrl = import.meta.env.VITE_API_URL || 
                       `${window.location.protocol}//${window.location.hostname}:5000`;
    return `${backendUrl}${imagePath}`;
  }
  
  // Otherwise return as is
  return imagePath;
};
