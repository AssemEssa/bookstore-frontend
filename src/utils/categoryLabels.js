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
 * @returns {Array} Array of category objects with value and label
 */
export function getCategoryOptions(language = 'en') {
  const categories = [
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

  // For the filter sidebar, return objects with value and label
  const categoryObjects = [
    { value: '', label: language === 'ar' ? 'الكل' : 'All' },
    ...categories.map(cat => ({
      value: cat,
      label: getCategoryLabel(cat, language)
    }))
  ];

  return categoryObjects;
}

/**
 * Get all category names (for admin forms)
 * @returns {Array} Array of category names in English
 */
export function getCategoryNames() {
  return [
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
}

const categoryHelpers = {
  getCategoryLabel,
  getCategoryOptions,
  getCategoryNames,
};

export default categoryHelpers;
