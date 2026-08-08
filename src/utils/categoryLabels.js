/**
 * Helper function to get translated category labels
 * @param {string} category - The category name
 * @param {string} language - Current language ('en' or 'ar')
 * @returns {string} Translated category label
 */
export const getCategoryLabel = (category, language = 'en') => {
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
};
