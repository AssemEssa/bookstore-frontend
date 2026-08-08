import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    setDirection(savedLanguage === 'ar' ? 'rtl' : 'ltr');
    
    // Set document direction and language
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
    
    setLanguage(newLanguage);
    setDirection(newDirection);
    
    // Save preference
    localStorage.setItem('language', newLanguage);
    
    // Update document
    document.documentElement.dir = newDirection;
    document.documentElement.lang = newLanguage;
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    direction,
    toggleLanguage,
    t,
    isRTL: language === 'ar',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.books': 'Books',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.signup': 'Sign Up',
    'nav.cart': 'Cart',

    // Home Page
    'home.hero.title': 'Discover Your Next',
    'home.hero.highlight': 'Great Read',
    'home.hero.subtitle': 'Explore our curated collection of premium books across all genres. From timeless classics to contemporary bestsellers, find your perfect book today.',
    'home.hero.browse': 'Browse Collection',
    'home.hero.featured': 'Featured Books',
    'home.featured.tag': 'Handpicked',
    'home.featured.title': 'Featured Books',
    'home.featured.subtitle': 'Carefully selected titles that we absolutely love',
    'home.bestsellers.tag': 'Popular',
    'home.bestsellers.title': 'Bestsellers',
    'home.bestsellers.subtitle': 'The most loved books by our community',
    'home.stats.books': 'Books Available',
    'home.stats.customers': 'Happy Customers',
    'home.stats.categories': 'Categories',
    'home.stats.rating': 'Average Rating',
    'home.viewAll': 'View All Books',

    // Books Page
    'books.title': 'Browse Books',
    'books.subtitle': 'Explore our entire collection',
    'books.search': 'Search',
    'books.searchPlaceholder': 'Search books...',
    'books.categories': 'Categories',
    'books.sortBy': 'Sort By',
    'books.sort.newest': 'Newest First',
    'books.sort.priceLow': 'Price: Low to High',
    'books.sort.priceHigh': 'Price: High to Low',
    'books.sort.rating': 'Highest Rated',
    'books.sort.title': 'Title: A to Z',
    'books.showing': 'Showing',
    'books.booksText': 'books',
    'books.noBooks': 'No books found',
    'books.adjustFilters': 'Try adjusting your filters',

    // Book Detail
    'book.back': 'Back',
    'book.by': 'by',
    'book.reviews': 'reviews',
    'book.save': 'Save',
    'book.inStock': 'In Stock',
    'book.available': 'available',
    'book.outOfStock': 'Out of Stock',
    'book.quantity': 'Quantity:',
    'book.addToCart': 'Add to Cart',
    'book.details': 'Book Details',
    'book.publisher': 'Publisher:',
    'book.pages': 'Pages:',
    'book.language': 'Language:',
    'book.isbn': 'ISBN:',
    'book.description': 'Description',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyText': 'Start adding some books to your collection!',
    'cart.browse': 'Browse Books',
    'cart.remove': 'Remove',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.continueShopping': 'Continue Shopping',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shippingAddress': 'Shipping Address',
    'checkout.street': 'Street Address',
    'checkout.city': 'City',
    'checkout.state': 'State',
    'checkout.zipCode': 'Phone Number',
    'checkout.country': 'Country',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.creditCard': 'Credit Card',
    'checkout.debitCard': 'Debit Card',
    'checkout.paypal': 'PayPal',
    'checkout.cashOnDelivery': 'Cash on Delivery',
    'checkout.placeOrder': 'Place Order',
    'checkout.processing': 'Processing...',

    // Auth
    'auth.welcomeBack': 'Welcome Back',
    'auth.loginSubtitle': 'Login to your account',
    'auth.createAccount': 'Create Account',
    'auth.joinSubtitle': 'Join BookHaven today',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.login': 'Login',
    'auth.loggingIn': 'Logging in...',
    'auth.signup': 'Sign Up',
    'auth.signingUp': 'Creating account...',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.demoAccounts': 'Demo Accounts:',
    'auth.admin': 'Admin:',
    'auth.user': 'User:',

    // Profile
    'profile.title': 'My Profile',
    'profile.orderHistory': 'Order History',
    'profile.noOrders': 'No orders yet',
    'profile.noOrdersText': 'Start shopping to see your orders here',
    'profile.order': 'Order',
    'profile.status': 'Status',
    'profile.date': 'Date',
    'profile.qty': 'Qty:',

    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Manage your bookstore',
    'admin.books': 'Books',
    'admin.orders': 'Orders',
    'admin.users': 'Users',
    'admin.allBooks': 'All Books',
    'admin.addBook': '+ Add New Book',
    'admin.cover': 'Cover',
    'admin.bookTitle': 'Title',
    'admin.author': 'Author',
    'admin.category': 'Category',
    'admin.price': 'Price',
    'admin.stock': 'Stock',
    'admin.actions': 'Actions',
    'admin.delete': 'Delete',
    'admin.allOrders': 'All Orders',
    'admin.orderId': 'Order ID',
    'admin.customer': 'Customer',
    'admin.allUsers': 'All Users',
    'admin.name': 'Name',
    'admin.role': 'Role',
    'admin.joined': 'Joined',
    'admin.addBookTitle': 'Add New Book',
    'admin.description': 'Description',
    'admin.originalPrice': 'Original Price',
    'admin.coverImageUrl': 'Cover Image URL',
    'admin.cancel': 'Cancel',
    'admin.add': 'Add Book',

    // Order Status
    'status.processing': 'Processing',
    'status.shipped': 'Shipped',
    'status.delivered': 'Delivered',
    'status.cancelled': 'Cancelled',

    // Common
    'common.all': 'All',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.ok': 'OK',

    // Categories
    'category.Fiction': 'Fiction',
    'category.Non-Fiction': 'Non-Fiction',
    'category.Mystery': 'Mystery',
    'category.Thriller': 'Thriller',
    'category.Romance': 'Romance',
    'category.Sci-Fi': 'Sci-Fi',
    'category.Fantasy': 'Fantasy',
    'category.Biography': 'Biography',
    'category.History': 'History',
    'category.Self-Help': 'Self-Help',
    'category.Business': 'Business',
    'category.Technology': 'Technology',
    'category.Children': 'Children',
    'category.Young Adult': 'Young Adult',

    // Footer
    'footer.about': 'About BookHaven',
    'footer.aboutText': 'Your premium destination for discovering and purchasing books. We curate the finest collection of literature from around the world.',
    'footer.quickLinks': 'Quick Links',
    'footer.browseBooks': 'Browse Books',
    'footer.featured': 'Featured',
    'footer.bestsellers': 'Bestsellers',
    'footer.categories': 'Categories',
    'footer.customerService': 'Customer Service',
    'footer.contact': 'Contact Us',
    'footer.shipping': 'Shipping Info',
    'footer.returns': 'Returns',
    'footer.faq': 'FAQ',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'Subscribe to get special offers and updates!',
    'footer.emailPlaceholder': 'Your email',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.books': 'الكتب',
    'nav.profile': 'الملف الشخصي',
    'nav.admin': 'لوحة التحكم',
    'nav.login': 'تسجيل الدخول',
    'nav.logout': 'تسجيل الخروج',
    'nav.signup': 'إنشاء حساب',
    'nav.cart': 'السلة',

    // Home Page
    'home.hero.title': 'اكتشف كتابك',
    'home.hero.highlight': 'الرائع القادم',
    'home.hero.subtitle': 'استكشف مجموعتنا المنسقة من الكتب الممتازة في جميع الأنواع. من الكلاسيكيات الخالدة إلى الكتب الأكثر مبيعاً المعاصرة، اعثر على كتابك المثالي اليوم.',
    'home.hero.browse': 'تصفح المجموعة',
    'home.hero.featured': 'الكتب المميزة',
    'home.featured.tag': 'مختارة بعناية',
    'home.featured.title': 'الكتب المميزة',
    'home.featured.subtitle': 'عناوين مختارة بعناية نحبها كثيراً',
    'home.bestsellers.tag': 'الأكثر شعبية',
    'home.bestsellers.title': 'الأكثر مبيعاً',
    'home.bestsellers.subtitle': 'الكتب الأكثر حباً من مجتمعنا',
    'home.stats.books': 'كتاب متاح',
    'home.stats.customers': 'عميل سعيد',
    'home.stats.categories': 'تصنيف',
    'home.stats.rating': 'متوسط التقييم',
    'home.viewAll': 'عرض جميع الكتب',

    // Books Page
    'books.title': 'تصفح الكتب',
    'books.subtitle': 'استكشف مجموعتنا الكاملة',
    'books.search': 'بحث',
    'books.searchPlaceholder': 'ابحث عن الكتب...',
    'books.categories': 'التصنيفات',
    'books.sortBy': 'ترتيب حسب',
    'books.sort.newest': 'الأحدث أولاً',
    'books.sort.priceLow': 'السعر: من الأقل للأعلى',
    'books.sort.priceHigh': 'السعر: من الأعلى للأقل',
    'books.sort.rating': 'الأعلى تقييماً',
    'books.sort.title': 'العنوان: أ - ي',
    'books.showing': 'عرض',
    'books.booksText': 'كتاب',
    'books.noBooks': 'لم يتم العثور على كتب',
    'books.adjustFilters': 'جرب تعديل الفلاتر',

    // Book Detail
    'book.back': 'رجوع',
    'book.by': 'بواسطة',
    'book.reviews': 'تقييم',
    'book.save': 'وفر',
    'book.inStock': 'متوفر',
    'book.available': 'متاح',
    'book.outOfStock': 'غير متوفر',
    'book.quantity': 'الكمية:',
    'book.addToCart': 'أضف للسلة',
    'book.details': 'تفاصيل الكتاب',
    'book.publisher': 'الناشر:',
    'book.pages': 'الصفحات:',
    'book.language': 'اللغة:',
    'book.isbn': 'الرقم التسلسلي:',
    'book.description': 'الوصف',

    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.emptyText': 'ابدأ بإضافة بعض الكتب إلى مجموعتك!',
    'cart.browse': 'تصفح الكتب',
    'cart.remove': 'إزالة',
    'cart.summary': 'ملخص الطلب',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن',
    'cart.tax': 'الضريبة',
    'cart.total': 'الإجمالي',
    'cart.checkout': 'إتمام الطلب',
    'cart.continueShopping': 'متابعة التسوق',

    // Checkout
    'checkout.title': 'إتمام الطلب',
    'checkout.shippingAddress': 'عنوان الشحن',
    'checkout.street': 'عنوان الشارع',
    'checkout.city': 'المدينة',
    'checkout.state': 'المحافظة',
    'checkout.zipCode': 'رقم الهاتف',
    'checkout.country': 'الدولة',
    'checkout.paymentMethod': 'طريقة الدفع',
    'checkout.creditCard': 'بطاقة ائتمان',
    'checkout.debitCard': 'بطاقة خصم',
    'checkout.paypal': 'باي بال',
    'checkout.cashOnDelivery': 'الدفع عند الاستلام',
    'checkout.placeOrder': 'تأكيد الطلب',
    'checkout.processing': 'جاري المعالجة...',

    // Auth
    'auth.welcomeBack': 'مرحباً بعودتك',
    'auth.loginSubtitle': 'سجل الدخول إلى حسابك',
    'auth.createAccount': 'إنشاء حساب',
    'auth.joinSubtitle': 'انضم إلى BookHaven اليوم',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.login': 'تسجيل الدخول',
    'auth.loggingIn': 'جاري تسجيل الدخول...',
    'auth.signup': 'إنشاء حساب',
    'auth.signingUp': 'جاري إنشاء الحساب...',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'auth.demoAccounts': 'حسابات تجريبية:',
    'auth.admin': 'مدير:',
    'auth.user': 'مستخدم:',

    // Profile
    'profile.title': 'ملفي الشخصي',
    'profile.orderHistory': 'سجل الطلبات',
    'profile.noOrders': 'لا توجد طلبات بعد',
    'profile.noOrdersText': 'ابدأ التسوق لرؤية طلباتك هنا',
    'profile.order': 'طلب',
    'profile.status': 'الحالة',
    'profile.date': 'التاريخ',
    'profile.qty': 'الكمية:',

    // Admin
    'admin.title': 'لوحة التحكم',
    'admin.subtitle': 'إدارة المكتبة',
    'admin.books': 'الكتب',
    'admin.orders': 'الطلبات',
    'admin.users': 'المستخدمين',
    'admin.allBooks': 'جميع الكتب',
    'admin.addBook': '+ إضافة كتاب جديد',
    'admin.cover': 'الغلاف',
    'admin.bookTitle': 'العنوان',
    'admin.author': 'المؤلف',
    'admin.category': 'التصنيف',
    'admin.price': 'السعر',
    'admin.stock': 'المخزون',
    'admin.actions': 'الإجراءات',
    'admin.delete': 'حذف',
    'admin.allOrders': 'جميع الطلبات',
    'admin.orderId': 'رقم الطلب',
    'admin.customer': 'العميل',
    'admin.allUsers': 'جميع المستخدمين',
    'admin.name': 'الاسم',
    'admin.role': 'الدور',
    'admin.joined': 'تاريخ الانضمام',
    'admin.addBookTitle': 'إضافة كتاب جديد',
    'admin.description': 'الوصف',
    'admin.originalPrice': 'السعر الأصلي',
    'admin.coverImageUrl': 'رابط صورة الغلاف',
    'admin.cancel': 'إلغاء',
    'admin.add': 'إضافة كتاب',

    // Order Status
    'status.processing': 'قيد المعالجة',
    'status.shipped': 'تم الشحن',
    'status.delivered': 'تم التسليم',
    'status.cancelled': 'ملغي',

    // Common
    'common.all': 'الكل',
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.close': 'إغلاق',
    'common.ok': 'موافق',

    // Categories
    'category.Fiction': 'روايات',
    'category.Non-Fiction': 'كتب غير روائية',
    'category.Mystery': 'غموض',
    'category.Thriller': 'إثارة',
    'category.Romance': 'رومانسية',
    'category.Sci-Fi': 'خيال علمي',
    'category.Fantasy': 'فانتازيا',
    'category.Biography': 'سيرة ذاتية',
    'category.History': 'تاريخ',
    'category.Self-Help': 'تطوير الذات',
    'category.Business': 'أعمال',
    'category.Technology': 'تكنولوجيا',
    'category.Children': 'أطفال',
    'category.Young Adult': 'شباب',

    // Footer
    'footer.about': 'عن BookHaven',
    'footer.aboutText': 'وجهتك المميزة لاكتشاف وشراء الكتب. نقوم بتنسيق أفضل مجموعة من الأدب من جميع أنحاء العالم.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.browseBooks': 'تصفح الكتب',
    'footer.featured': 'مميزة',
    'footer.bestsellers': 'الأكثر مبيعاً',
    'footer.categories': 'التصنيفات',
    'footer.customerService': 'خدمة العملاء',
    'footer.contact': 'اتصل بنا',
    'footer.shipping': 'معلومات الشحن',
    'footer.returns': 'المرتجعات',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.newsleterText': 'اشترك للحصول على العروض الخاصة والتحديثات!',
    'footer.emailPlaceholder': 'بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
  },
};
