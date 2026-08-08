/**
 * Helper function to get translated category labels
 * @param {string} category - The category name
 * @param {string} language - Current language ('en' or 'ar')
 * @returns {string} Translated category label
 */
export function getCategoryLabel(category, language = 'en') {
  const categoryTranslations = {
    en: {
      'Fiction': 'Fiction',
      'Non-Fiction': 'Non-Fiction',
      'Mystery': 'Mystery',
      'Thriller': 'Thriller',
      'Romance': 'Romance',
      'Sci-Fi': 'Sci-Fi',
      'Fantasy': 'Fantasy',
      'Biography': 'Biography',
      'History': 'History',
      'Self-Help': 'Self-Help',
      'Business': 'Business',
      'Technology': 'Technology',
      'Children': 'Children',
      'Young Adult': 'Young Adult',
    },
    ar: {
      'Fiction': 'روايات',
      'Non-Fiction': 'كتب غير روائية',
      'Mystery': 'غموض',
      'Thriller': 'إثارة',
      'Romance': 'رومانسية',
      'Sci-Fi': 'خيال علمي',
      'Fantasy': 'فانتازيا',
      'Biography': 'سيرة ذاتية',
      'History': 'تاريخ',
      'Self-Help': 'تطوير الذات',
      'Business': 'أعمال',
      'Technology': 'تكنولوجيا',
      'Children': 'أطفال',
      'Young Adult': 'شباب',
    },
  };

  // Return translated category or original if not found
  return categoryTranslations[language]?.[category] || category;
}

/**
 * Get all category options for the current language
 * @param {string} language - Current language ('en' or 'ar')
 * @returns {Array} Array of category names in current language
 */
export function getCategoryOptions(language = 'en') {
  const categories = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Sci-Fi',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology',
    'Children',
    'Young Adult',
  ];

  return categories;
}

const categoryHelpers = {
  getCategoryLabel,
  getCategoryOptions,
};

export default categoryHelpers;
