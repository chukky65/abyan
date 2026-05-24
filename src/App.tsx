import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Menu as MenuIcon, X, MapPin, Phone, Clock, ArrowRight, ExternalLink, ChevronDown, Globe, Loader2, CheckCircle2, Instagram, Facebook, Sun, Moon, Leaf, Flame, WheatOff, AlertCircle } from 'lucide-react';

const translations = {
  en: {
    nav: {
      home: 'Home', menu: 'Menu', about: 'About', visit: 'Visit',
      orderOnline: 'Order Online', bookTable: 'Book a Table', book: 'Book'
    },
    footer: {
      desc: 'Authentic Yemeni mandi, shuwa, and shawarma — slow-cooked the traditional way and served in a warm, family setting.',
      visit: 'Visit', explore: 'Explore', orderTalabat: 'Order via Talabat', rights: 'Abyan Yemeni Restaurant.', followUs: 'Connect',
      designedBy: 'Designed by Chukky'
    },
    newsletter: {
      title: 'Join our Newsletter',
      desc: 'Get updates on special events and new menu items.',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      success: 'Thanks for subscribing!'
    },
    home: {
      title: 'The taste of Yemen, slow-cooked in Oman.',
      desc: 'Mandi rice clay-roasted overnight. Lamb shuwa wrapped in banana leaves. Shawarma carved fresh from the spit. Every dish at Abyan is made the way it has been for generations.',
      exploreMenu: 'Explore the menu',
      dishesTitle: 'Dishes that built our reputation.',
      viewFullMenu: 'View full menu',
      ctaTitle: 'Come hungry.\nLeave with stories.',
      ctaDesc: 'Plenty of parking, spacious seating, and a warm welcome wait for you in Halban.',
      getDirections: 'Get directions',
      order: 'Order on Talabat',
      until: 'Until',
      time: '11:30 PM',
      readMore: 'Read more about Abyan',
      galleryTitle: 'Our Atmosphere & Dishes',
      galleryDesc: 'A glimpse into our kitchen and dining rooms.'
    },
    menu: {
      title: 'A journey through Yemeni flavor.',
      desc: 'Every plate is prepared fresh to order. Prices in Omani Rial · per person OMR 1–2.',
      footerInfo: 'Menu shown reflects our most popular dishes. Daily specials may vary — call us at',
      forTodayInfo: 'for today\'s selection.',
      categories: [
        {
          title: "Mandi & Mains",
          items: [
            { name: "Laham Mandi (1/4 Dabiha)", desc: "Our signature dish — tender lamb slow-roasted in a traditional underground oven, served over fragrant saffron rice with raisins and toasted almonds.", dietary: ['gf', 'nuts'] },
            { name: "Laham Shuwa", desc: "Spice-marinated lamb wrapped in banana leaves and slow-cooked for hours until it falls off the bone.", dietary: ['gf'] },
            { name: "Half Chicken Mandi", desc: "Half a chicken slow-roasted Mandi-style, served on a bed of spiced rice.", dietary: ['gf'] },
            { name: "Half Chicken Saloona", desc: "Fresh chicken stewed in a fragrant tomato and spice broth, served with rice.", dietary: ['gf', 'spicy'] }
          ]
        },
        {
          title: "Shawarma",
          items: [
            { name: "Plate Shawarma", desc: "Generous portion of freshly carved chicken shawarma served with garlic sauce, pickles and warm Arabic bread.", dietary: ['spicy'] },
            { name: "Shawarma Roll Chicken", desc: "Classic chicken shawarma wrap with toum, pickles and crisp vegetables in fresh saj bread.", dietary: [] },
            { name: "Shawarma Meat", desc: "Slow-marinated beef shawarma carved fresh from the spit and rolled with tahini and onions.", dietary: [] }
          ]
        },
        {
          title: "Sides & Salads",
          items: [
            { name: "Salata Khaas", desc: "Our special house salad — crisp tomatoes, cucumbers, onions and herbs in a bright citrus dressing.", dietary: ['v', 'gf'] },
            { name: "Sandwich Falafil", desc: "Crispy falafel rolled with tahini, pickles and fresh vegetables.", dietary: ['v', 'vg'] }
          ]
        }
      ]
    },
    about: {
      title: 'Yemeni hospitality,\nthe heart of Halban.',
      p1: 'Abyan was born from a simple idea: that the food of Yemen — its slow-cooked mandi, its smoky shuwa, its perfectly spiced shawarma — deserves to be made the right way, without shortcuts and without compromise.',
      p2: 'Every morning, our cooks begin marinating meats with cardamom, turmeric, cumin and dried lime. Rice is layered with saffron and roasted in the traditional clay oven. By the time you sit down, hours of patient work are already on the plate in front of you.',
      p3: 'Whether you\'re stopping by for a quick shawarma roll, joining family for a generous mandi feast, or ordering in through Talabat, we\'re glad you\'re here.',
      quote: '"Made the right way, without shortcuts."',
      guestsSay: 'What our guests are saying.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          question: "What is your reservation cancellation policy?",
          answer: "We kindly ask for at least 24 hours notice for any reservation changes or cancellations. This allows us to offer the table to other guests. For groups larger than 10, a 48-hour notice is appreciated."
        },
        {
          question: "Do you have vegetarian or vegan options?",
          answer: "Yes! While we are known for our slow-cooked meats, our Salata Khaas and Sandwich Falafil are fully vegetarian. Please note that our Mandy and Shuwa rice is traditionally cooked with meat broth for authentic flavor."
        },
        {
          question: "Do I need to make a reservation?",
          answer: "Walk-ins are always welcome! However, for larger groups on weekends, we recommend booking a table through our website's 'Book a Table' feature to ensure immediate seating."
        },
        {
          question: "Is there parking available?",
          answer: "Yes, we have ample free parking available directly in front of and around the restaurant for your convenience."
        }
      ]
    },
    contact: {
      title: "We'd love to see you in Halban.",
      visitUs: "Visit Us",
      location: "Our Location",
      openMaps: "Open in Google Maps",
      callUs: "Call Us",
      callNow: "Call now",
      hours: "Hours",
      openDaily: "Open Daily",
      times: "11:00 AM – 11:30 PM",
      getDirections: "Get Directions",
      address: "J24G+H6 Halban, Oman",
      abyan: "Abyan Restaurant"
    },
    booking: {
      title: "Book a Table",
      fullName: "Full Name",
      phone: "Phone Number",
      date: "Date",
      time: "Time",
      guests: "Number of Guests",
      person: "Person",
      people: "People",
      confirm: "Confirm Booking",
      terms: "By proceeding, you agree to our booking terms and conditions.",
      success: "Booking confirmed"
    },
    testimonials: [
      "Excellent shawarma. Crispy and tasty. Good ambience, spacious, affordable — authentic Arabic cuisine.",
      "There is a nice place to sit and a variety of food is available. Cheap and good food. Plenty of parking too.",
      "Excellent service, good food. We will be back."
    ],
    gallery: [
      { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', alt: 'Restaurant Interior' },
      { img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80', alt: 'Dining area' },
      { img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80', alt: 'Authentic Dishes' },
      { img: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?auto=format&fit=crop&w=1200&q=80', alt: 'Fresh Spices' },
      { img: 'https://images.unsplash.com/photo-1544378730-8b5104211cef?auto=format&fit=crop&w=1200&q=80', alt: 'Roasted Meat' },
      { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', alt: 'Atmosphere' }
    ],
    featuredDishes: [
      {
        title: "Laham Mandi (1/4 Dabiha)",
        desc: "Our signature dish — tender lamb slow-roasted in a traditional underground oven, served over fragrant saffron rice with raisins and toasted almonds.",
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Laham Shuwa",
        desc: "Spice-marinated lamb wrapped in banana leaves and slow-cooked for hours until it falls off the bone.",
        img: "https://images.unsplash.com/photo-1544378730-8b5104211cef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Plate Shawarma",
        desc: "Generous portion of freshly carved chicken shawarma served with garlic sauce, pickles and warm Arabic bread.",
        img: "https://images.unsplash.com/photo-1633366970860-64670c326e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  ar: {
    nav: {
      home: 'الرئيسية', menu: 'القائمة', about: 'من نحن', visit: 'زيارة',
      orderOnline: 'اطلب عبر الإنترنت', bookTable: 'احجز طاولة', book: 'احجز'
    },
    footer: {
      desc: 'المندي اليمني الأصيل، والشواء، والشاورما - مطبوخ ببطء بالطريقة التقليدية ويقدم في جو عائلي دافئ.',
      visit: 'زيارة', explore: 'استكشف', orderTalabat: 'اطلب عبر طلبات', rights: 'مطعم أبين اليمني.', followUs: 'تواصل معنا',
      designedBy: 'صممه Chukky'
    },
    newsletter: {
      title: 'اشترك في نشرتنا الإخبارية',
      desc: 'احصل على تحديثات حول المناسبات الخاصة وعناصر القائمة الجديدة.',
      placeholder: 'أدخل بريدك الإلكتروني',
      button: 'اشتراك',
      success: 'شكراً لاشتراكك!'
    },
    home: {
      title: 'طعم اليمن، مطبوخ ببطء في عُمان.',
      desc: 'أرز المندي المحمص في الطين طوال الليل. لحم الشواء ملفوف بأوراق الموز. شاورما مقطعة طازجة من السيخ. كل طبق في أبين يتم تحضيره بالطريقة التي تم تحضيره بها لأجيال.',
      exploreMenu: 'استكشف القائمة',
      dishesTitle: 'أطباق بنت سمعتنا.',
      viewFullMenu: 'عرض القائمة الكاملة',
      ctaTitle: 'تعال جائعاً.\nغادر بقصص.',
      ctaDesc: 'الكثير من مواقف السيارات ومقاعد واسعة وترحيب حار في انتظارك في حلبان.',
      getDirections: 'احصل على الاتجاهات',
      order: 'اطلب عبر طلبات',
      until: 'حتى',
      time: '11:30 مساءً',
      readMore: 'اقرأ المزيد عن أبين',
      galleryTitle: 'أجواؤنا وأطباقنا',
      galleryDesc: 'لمحة عن مطبخنا وصالات الطعام.'
    },
    menu: {
      title: 'رحلة عبر النكهة اليمنية.',
      desc: 'يتم تحضير كل طبق طازجًا عند الطلب. الأسعار بالريال العماني · للشخص الواحد 1-2 ريال عماني.',
      footerInfo: 'تعكس القائمة المعروضة أطباقنا الأكثر شعبية. قد تختلف العروض اليومية — اتصل بنا على',
      forTodayInfo: 'لاختيار اليوم.',
      categories: [
        {
          title: "المندي والأطباق الرئيسية",
          items: [
            { name: "لحم مندي (1/4 ذبيحة)", desc: "طبقنا المميز - لحم الضأن الطري المطبوخ ببطء في فرن تقليدي تحت الأرض، يقدم فوق أرز الزعفران العطري مع الزبيب واللوز المحمص.", dietary: ['gf', 'nuts'] },
            { name: "لحم شواء", desc: "لحم ضأن متبل بالبهارات ملفوف بأوراق الموز ومطبوخ ببطء لساعات حتى يتساقط من العظم.", dietary: ['gf'] },
            { name: "نصف دجاجة مندي", desc: "نصف دجاجة مطبوخة ببطء على طريقة المندي، تقدم على طبقة من الأرز المتبل.", dietary: ['gf'] },
            { name: "نصف دجاجة صالونة", desc: "دجاج طازج مطهي في مرق الطماطم والتوابل العطري، يقدم مع الأرز.", dietary: ['gf', 'spicy'] }
          ]
        },
        {
          title: "الشاورما",
          items: [
            { name: "صحن شاورما", desc: "حصة سخية من شاورما الدجاج المقطعة طازجة تقدم مع صلصة الثوم والمخللات والخبز العربي الدافئ.", dietary: ['spicy'] },
            { name: "ساندويتش شاورما دجاج بخبز الصاج", desc: "ساندويتش شاورما الدجاج الكلاسيكي مع الثومية، المخللات، والخضار الطازجة في خبز الصاج الطازج.", dietary: [] },
            { name: "شاورما لحم", desc: "شاورما اللحم البقري المتبل ببطء المقطعة طازجة من السيخ وملفوفة مع الطحينة والبصل.", dietary: [] }
          ]
        },
        {
          title: "الأطباق الجانبية والسلطات",
          items: [
            { name: "سلطة خاص", desc: "سلطة المنزل الخاصة بنا - طماطم مقرمشة، خيار، بصل وأعشاب في صلصة حمضيات مشرقة.", dietary: ['v', 'gf'] },
            { name: "ساندويتش فلافل", desc: "فلافل مقرمشة ملفوفة بالطحينة، مخللات وخضروات طازجة.", dietary: ['v', 'vg'] }
          ]
        }
      ]
    },
    about: {
      title: 'الضيافة اليمنية،\nقلب حلبان.',
      p1: 'ولدت أبين من فكرة بسيطة: أن طعام اليمن - المندي المطبوخ ببطء، الشواء المدخن، الشاورما المتبلة بشكل مثالي - يستحق أن يُصنع بالطريقة الصحيحة، دون اختصارات ودون مساومة.',
      p2: 'كل صباح، يبدأ طهاتنا في تتبيل اللحوم بالهيل والكركم والكمون والليمون المجفف. يتم وضع الأرز على شكل طبقات مع الزعفران وتحميصه في فرن الطين التقليدي. بحلول الوقت الذي تجلس فيه، تكون ساعات من العمل الصبور موجودة بالفعل على الطبق أمامك.',
      p3: 'سواء كنت تتوقف للحصول على لفافة شاورما سريعة، أو تنضم إلى العائلة للحصول على وليمة مندي سخية، أو تطلب عبر طلبات، يسعدنا وجودك هنا.',
      quote: '"مصنوع بالطريقة الصحيحة، دون اختصارات."',
      guestsSay: 'ما يقوله ضيوفنا.',
      faqTitle: 'الأسئلة الشائعة',
      faqs: [
        {
          question: "ما هي سياسة إلغاء الحجز لديكم؟",
          answer: "نرجو منكم إبلاغنا قبل 24 ساعة على الأقل بأي تغييرات أو إلغاء للحجز. هذا يتيح لنا تقديم الطاولة لضيوف آخرين. بالنسبة للمجموعات التي تزيد عن 10 أشخاص، نقدر إبلاغنا قبل 48 ساعة."
        },
        {
          question: "هل لديكم خيارات نباتية؟",
          answer: "نعم! على الرغم من أننا معروفون باللحوم المطبوخة ببطء، إلا أن سلطة خاص وساندويتش فلافل نباتية بالكامل. يُرجى ملاحظة أن أرز المندي والشواء مطبوخ تقليديًا مع مرق اللحم للحصول على نكهة أصلية."
        },
        {
          question: "هل أحتاج إلى إجراء حجز؟",
          answer: "نرحب دائمًا بالضيوف بدون حجز! ومع ذلك، بالنسبة للمجموعات الكبيرة في عطلات نهاية الأسبوع، نوصي بحجز طاولة من خلال ميزة 'احجز طاولة' على موقعنا لضمان الجلوس الفوري."
        },
        {
          question: "هل تتوفر مواقف للسيارات؟",
          answer: "نعم، لدينا مواقف مجانية واسعة للسيارات متوفرة مباشرة أمام المطعم وحوله لراحتك."
        }
      ]
    },
    contact: {
      title: "نود أن نراك في حلبان.",
      visitUs: "قم بزيارتنا",
      location: "موقعنا",
      openMaps: "افتح في خرائط جوجل",
      callUs: "اتصل بنا",
      callNow: "اتصل الان",
      hours: "ساعات العمل",
      openDaily: "مفتوح يوميا",
      times: "11:00 صباحًا - 11:30 مساءً",
      getDirections: "احصل على الاتجاهات",
      address: "J24G+H6 حلبان، عمان",
      abyan: "مطعم أبين"
    },
    booking: {
      title: "احجز طاولة",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      date: "التاريخ",
      time: "الوقت",
      guests: "عدد الضيوف",
      person: "شخص",
      people: "أشخاص",
      confirm: "تأكيد الحجز",
      terms: "بالمتابعة، فإنك توافق على شروط وأحكام الحجز الخاصة بنا.",
      success: "تم تأكيد الحجز"
    },
    testimonials: [
      "شاورما ممتازة. مقرمشة ولذيذة. جو رائع، فسيح، وبأسعار معقولة - مطبخ عربي أصيل.",
      "مكان لطيف للجلوس وتتوفر مجموعة متنوعة من الأطعمة. طعام جيد ورخيص. الكثير من مواقف السيارات أيضا.",
      "خدمة ممتازة، طعام جيد. سنعود بالتأكيد."
    ],
    gallery: [
      { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', alt: 'الداخلية' },
      { img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80', alt: 'منطقة تناول الطعام' },
      { img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80', alt: 'أطباق أصلية' },
      { img: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?auto=format&fit=crop&w=1200&q=80', alt: 'بهارات طازجة' },
      { img: 'https://images.unsplash.com/photo-1544378730-8b5104211cef?auto=format&fit=crop&w=1200&q=80', alt: 'لحم مشوي' },
      { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', alt: 'الأجواء' }
    ],
    featuredDishes: [
      {
        title: "لحم مندي (1/4 ذبيحة)",
        desc: "طبقنا المميز - لحم الضأن الطري المطبوخ ببطء في فرن تقليدي تحت الأرض، يقدم فوق أرز الزعفران العطري مع الزبيب واللوز المحمص.",
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "لحم شواء",
        desc: "لحم ضأن متبل بالبهارات ملفوف بأوراق الموز ومطبوخ ببطء لساعات حتى يتساقط من العظم.",
        img: "https://images.unsplash.com/photo-1544378730-8b5104211cef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "صحن شاورما",
        desc: "حصة سخية من شاورما الدجاج المقطعة طازجة تقدم مع صلصة الثوم والمخللات والخبز العربي الدافئ.",
        img: "https://images.unsplash.com/photo-1633366970860-64670c326e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

type Language = 'en' | 'ar';

export const LanguageContext = createContext<any>(null);
export const useLanguage = () => useContext(LanguageContext);
export const ThemeContext = createContext<any>(null);
export const useTheme = () => useContext(ThemeContext);

const SEO = ({ title, description, withLocalBusiness = false }: { title: string, description: string, withLocalBusiness?: boolean }) => {
  const { lang } = useLanguage();
  
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Abyan Yemeni Restaurant",
    "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "@id": "https://abyan-restaurant.com",
    "url": "https://abyan-restaurant.com",
    "telephone": "97000384",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "J24G+H6",
      "addressLocality": "Halban",
      "addressRegion": "Al Batinah",
      "postalCode": "320",
      "addressCountry": "OM"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.6331,
      "longitude": 58.0531
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "11:00",
      "closes": "23:30"
    },
    "servesCuisine": "Yemeni"
  };

  return (
    <Helmet>
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{title} | Abyan Yemeni Restaurant</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#2D241C" />
      {withLocalBusiness && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
      )}
    </Helmet>
  );
};

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mockEmailNotification, setMockEmailNotification] = useState<{show: boolean, id: string}>({show: false, id: ''});

  const location = useLocation();

  const links = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.menu, path: '/menu' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.visit, path: '/contact' },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const fakeBookingId = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Auto close and reset after success
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setTimeout(() => {
          setIsSuccess(false);
          setBookingData({ name: '', phone: '', date: '', time: '', guests: '2' });
          
          // Trigger mock email notification after modal closes
          setMockEmailNotification({ show: true, id: fakeBookingId });
          setTimeout(() => {
            setMockEmailNotification({ show: false, id: '' });
          }, 5000); // Hide notification after 5 seconds
        }, 300); // Wait for modal exit animation
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <nav className="fixed w-full z-40 top-0 transition-all duration-300 bg-[#FAF9F6]/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-[#2D241C]/5 dark:border-[#FAF9F6]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-amber-700 text-[#FAF9F6] flex items-center justify-center font-bold text-xl rounded-sm group-hover:bg-amber-800 transition-colors">A</div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#2D241C] dark:text-[#FAF9F6]">Abyan</span>
                <span className="text-sm font-medium text-amber-700/80 hidden sm:block tracking-wide mx-1">Yemeni Restaurant</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-amber-700' : 'text-[#2D241C]/70 dark:text-[#FAF9F6]/70 hover:text-[#2D241C]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center p-2 text-[#2D241C] dark:text-[#FAF9F6] hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" strokeWidth={2.5} /> : <Moon className="w-4 h-4" strokeWidth={2.5} />}
                </button>
                <button
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] hover:bg-black/5 rounded-md transition-colors gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
                </button>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] bg-transparent hover:bg-black/5 rounded-md transition-colors border border-[#2D241C]/20 dark:border-[#FAF9F6]/20"
                >
                  {t.nav.bookTable}
                </button>
                <a
                  href="https://www.talabat.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#FAF9F6] bg-amber-700 hover:bg-amber-800 rounded-md transition-colors shadow-sm"
                >
                  {t.nav.orderOnline}
                </a>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="text-[#2D241C] dark:text-[#FAF9F6] border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 p-2 rounded flex items-center gap-1"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" strokeWidth={2.5} /> : <Moon className="w-4 h-4" strokeWidth={2.5} />}
              </button>
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="text-[#2D241C] dark:text-[#FAF9F6] border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 p-2 rounded flex items-center gap-1"
                aria-label="Toggle Language"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="text-xs font-medium text-[#2D241C] dark:text-[#FAF9F6] border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 px-3 py-1.5 rounded"
              >
                {t.nav.book}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#2D241C] dark:text-[#FAF9F6] p-2 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAF9F6] dark:bg-[#121212] border-b border-[#2D241C]/5 dark:border-[#FAF9F6]/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-4 text-base font-medium rounded-md ${
                      location.pathname === link.path ? 'text-amber-700 bg-amber-50' : 'text-[#2D241C]/80 dark:text-[#FAF9F6]/80 hover:text-[#2D241C] dark:text-[#FAF9F6] hover:bg-[#2D241C]/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-[#2D241C] dark:text-[#FAF9F6] hover:bg-black/5 rounded-md"
                >
                  {t.nav.bookTable}
                </button>
                <a
                  href="https://www.talabat.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-4 text-base font-medium text-amber-700 hover:bg-amber-50 dark:bg-amber-900/20 rounded-md flex items-center gap-2"
                >
                  {t.nav.orderOnline} <ExternalLink className="h-4 w-4 rtl:rotate-180 rtl:ml-2" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 px-4 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#2D241C]/40 backdrop-blur-sm"
              onClick={() => setIsBookingModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FAF9F6] dark:bg-[#121212] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-[#2D241C]/10 dark:border-[#FAF9F6]/10 bg-white dark:bg-[#1c1c1c]">
                <h3 className="font-serif text-2xl font-bold text-[#2D241C] dark:text-[#FAF9F6]">{t.booking.title}</h3>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-[#2D241C]/60 dark:text-[#FAF9F6]/60 hover:text-[#2D241C] dark:text-[#FAF9F6] transition-colors p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto relative">
                <div className="mb-6 relative rounded-xl overflow-hidden h-32 md:h-40 shrink-0 shadow-sm border border-[#2D241C]/5 dark:border-[#FAF9F6]/5">
                  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" alt="Dining area preview" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 font-serif text-white text-sm tracking-wide">
                     {lang === 'en' ? 'The Dining Room' : 'صالة الطعام'}
                  </div>
                </div>
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 z-10 bg-[#FAF9F6] dark:bg-[#121212] flex flex-col items-center justify-center p-6 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
                      >
                        <CheckCircle2 className="w-8 h-8" />
                      </motion.div>
                      <h4 className="text-xl font-bold font-serif text-[#2D241C] dark:text-[#FAF9F6] mb-2">{t.booking.success}</h4>
                      <p className="text-[#2D241C]/70 dark:text-[#FAF9F6]/70">
                        {lang === 'en' 
                          ? `Thank you, ${bookingData.name}. We'll see you on ${bookingData.date}.`
                          : `شكراً لك، ${bookingData.name}. نراك في ${bookingData.date}.`}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <form onSubmit={handleBookingSubmit} className={`space-y-5 transition-opacity duration-300 ${isSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1.5">{t.booking.fullName}</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none bg-white dark:bg-[#1c1c1c] transition-shadow text-[#2D241C] dark:text-[#FAF9F6]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1.5">{t.booking.phone}</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none bg-white dark:bg-[#1c1c1c] transition-shadow text-[#2D241C] dark:text-[#FAF9F6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1.5">{t.booking.date}</label>
                      <input
                        type="date"
                        id="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none bg-white dark:bg-[#1c1c1c] transition-shadow text-[#2D241C] dark:text-[#FAF9F6]"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1.5">{t.booking.time}</label>
                      <input
                        type="time"
                        id="time"
                        required
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none bg-white dark:bg-[#1c1c1c] transition-shadow text-[#2D241C] dark:text-[#FAF9F6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1.5">{t.booking.guests}</label>
                    <select
                      id="guests"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#2D241C]/20 dark:border-[#FAF9F6]/20 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none bg-white dark:bg-[#1c1c1c] transition-shadow text-[#2D241C] dark:text-[#FAF9F6] appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? t.booking.person : t.booking.people}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-800/70 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-900/10"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{lang === 'en' ? 'Confirming...' : 'جاري التأكيد...'}</span>
                        </>
                      ) : (
                        t.booking.confirm
                      )}
                    </button>
                    <p className="text-center text-xs text-[#2D241C]/50 dark:text-[#FAF9F6]/50 mt-4">
                      {t.booking.terms}
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mockEmailNotification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[60] w-[90%] max-w-sm bg-white dark:bg-[#1c1c1c] border border-amber-200 dark:border-amber-900/40 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-4 flex gap-4">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shrink-0 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#2D241C] dark:text-[#FAF9F6] text-sm mb-1">{lang === 'en' ? 'Booking Confirmed' : 'تم تأكيد الحجز'}</h4>
                <p className="text-xs text-[#2D241C]/70 dark:text-[#FAF9F6]/70 leading-relaxed">
                  {lang === 'en' 
                    ? `Your table has been reserved. Booking ID: ` 
                    : `تم حجز طاولتك. معرف الحجز: `}
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-500">{mockEmailNotification.id}</span>
                </p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setMockEmailNotification({ show: false, id: '' })} className="text-xs font-medium text-[#2D241C]/60 dark:text-[#FAF9F6]/60 hover:text-[#2D241C] dark:hover:text-[#FAF9F6] bg-[#2D241C]/5 dark:bg-[#FAF9F6]/5 px-3 py-1.5 rounded-md transition-colors">
                    {lang === 'en' ? 'Dismiss' : 'إخفاء'}
                  </button>
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-amber-100 dark:bg-amber-900/30">
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: 'linear' }}
                className="h-full bg-amber-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#2D241C] text-[#FAF9F6] py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <Link to="/" className="flex items-center gap-2 mb-6">
             <div className="w-8 h-8 bg-[#FAF9F6] dark:bg-[#121212] text-[#2D241C] dark:text-[#FAF9F6] flex items-center justify-center font-bold text-xl rounded-sm">A</div>
             <span className="font-serif text-2xl font-bold tracking-tight">Abyan</span>
          </Link>
          <p className="text-[#FAF9F6]/70 leading-relaxed max-w-sm mb-8 text-sm">
            {t.footer.desc}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FAF9F6]/80 hover:bg-amber-700 hover:text-white transition-all transform hover:scale-105">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FAF9F6]/80 hover:bg-amber-700 hover:text-white transition-all transform hover:scale-105">
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FAF9F6]/80 hover:bg-amber-700 hover:text-white transition-all transform hover:scale-105">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <h4 className="font-serif font-semibold text-lg mb-6 tracking-wide text-amber-500/90">{t.footer.visit}</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-[#FAF9F6]/80 text-sm">
              <MapPin className="h-5 w-5 text-amber-600 shrink-0" />
              <span>J24G+H6 Halban, Oman</span>
            </li>
            <li className="flex items-center gap-3 text-[#FAF9F6]/80 text-sm">
              <Phone className="h-5 w-5 text-amber-600 shrink-0" />
              <a href="tel:97000384" className="hover:text-[#FAF9F6] hover:underline underline-offset-4">9700 0384</a>
            </li>
            <li className="flex items-center gap-3 text-[#FAF9F6]/80 text-sm">
              <Clock className="h-5 w-5 text-amber-600 shrink-0" />
              <span>{t.contact.openDaily}</span>
            </li>
          </ul>
        </div>
        
        <div className="lg:col-span-2">
          <h4 className="font-serif font-semibold text-lg mb-6 tracking-wide text-amber-500/90">{t.footer.explore}</h4>
          <ul className="space-y-4">
            <li key="Menu">
              <Link to="/menu" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] transition-colors text-sm hover:underline underline-offset-4">
                {t.nav.menu}
              </Link>
            </li>
            <li key="About">
              <Link to="/about" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] transition-colors text-sm hover:underline underline-offset-4">
                {t.nav.about}
              </Link>
            </li>
            <li key="Visit">
              <Link to="/contact" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] transition-colors text-sm hover:underline underline-offset-4">
                {t.nav.visit}
              </Link>
            </li>
            <li>
               <a href="https://www.talabat.com/" target="_blank" rel="noopener noreferrer" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] transition-colors text-sm hover:underline underline-offset-4 flex items-center gap-2 w-fit">
                  {t.footer.orderTalabat} <ExternalLink className="h-3 w-3 rtl:rotate-180" />
               </a>
            </li>
          </ul>
        </div>
        
        <div className="lg:col-span-3">
          <h4 className="font-serif font-semibold text-lg mb-6 tracking-wide text-amber-500/90">{t.newsletter.title}</h4>
          <p className="text-[#FAF9F6]/80 text-sm mb-4 leading-relaxed">{t.newsletter.desc}</p>
          <form onSubmit={handleNewsletterSubmit} className="relative">
             <input 
               type="email" 
               required 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder={t.newsletter.placeholder} 
               className="w-full bg-[#FAF9F6]/5 dark:bg-[#121212]/5 border border-[#FAF9F6]/10 rounded-md py-2.5 px-4 text-sm text-[#FAF9F6] placeholder-[#FAF9F6]/40 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors" 
             />
             <button 
               type="submit" 
               disabled={isSubscribed}
               className="absolute right-1 top-1 bottom-1 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-800/80 text-white text-sm font-medium px-4 rounded transition-colors rtl:right-auto rtl:left-1 flex items-center justify-center gap-1 min-w-[90px]"
             >
               {isSubscribed ? <CheckCircle2 className="w-4 h-4" /> : t.newsletter.button}
             </button>
          </form>
          <AnimatePresence>
            {isSubscribed && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-green-400 text-xs mt-2 absolute"
              >
                {t.newsletter.success}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#FAF9F6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF9F6]/50">
        <p>&copy; {new Date().getFullYear()} {t.footer.rights} | {t.footer.designedBy}</p>
        <div className="flex items-center gap-4">
          <Link to="/menu" className="hover:text-[#FAF9F6]">{t.nav.menu}</Link>
          <Link to="/about" className="hover:text-[#FAF9F6]">{t.nav.about}</Link>
          <Link to="/contact" className="hover:text-[#FAF9F6]">{t.nav.visit}</Link>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.testimonials.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <SEO title={t.nav.home} description={t.home.desc} withLocalBusiness />
      <section className="relative min-h-[85vh] flex items-center bg-[#2D241C] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="Yemeni cuisine background"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D241C] via-[#2D241C]/80 to-transparent rtl:bg-gradient-to-l"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FAF9F6] leading-[1.1] tracking-tight mb-6 whitespace-pre-line"
            >
              {t.home.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-[#FAF9F6]/80 mb-10 leading-relaxed font-light max-w-xl"
            >
              {t.home.desc}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#FAF9F6] bg-amber-700 hover:bg-amber-800 rounded-md transition-all hover:scale-[1.02] shadow-lg shadow-amber-900/20 gap-2"
              >
                {t.home.exploreMenu} <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </Link>
              <a
                href="tel:97000384"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#FAF9F6] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-md transition-colors border border-white/10"
              >
                9700 0384
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] tracking-tight mb-4">{t.home.dishesTitle}</h2>
            </div>
            <Link to="/menu" className="text-amber-700 font-medium hover:text-amber-800 flex items-center gap-1 group pb-1">
              {t.home.viewFullMenu} <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {t.featuredDishes.map((dish: any, idx: number) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                key={dish.title}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-[#2D241C]/5 dark:bg-[#FAF9F6]/5">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] mb-3">{dish.title}</h3>
                <p className="text-[#2D241C]/70 dark:text-[#FAF9F6]/70 leading-relaxed">{dish.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] dark:bg-[#121212] border-t border-[#2D241C]/5 dark:border-[#FAF9F6]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] tracking-tight mb-4">{t.home.galleryTitle}</h2>
            <p className="text-lg text-[#2D241C]/70 dark:text-[#FAF9F6]/70 font-light max-w-2xl mx-auto">{t.home.galleryDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {t.gallery.map((img: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative bg-[#2D241C]/5 dark:bg-[#FAF9F6]/5"
                onClick={() => setLightboxImage(img.img)}
              >
                <img src={img.img} alt={img.alt} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-[#2D241C]/0 group-hover:bg-[#2D241C]/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-amber-50 dark:bg-amber-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
          >
             <div className="text-amber-500 mb-8 flex justify-center gap-1">
               {[1,2,3,4,5].map(i => <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
             </div>
             <div className="min-h-[160px] md:min-h-[120px] mb-8 relative flex items-center justify-center">
               <AnimatePresence mode="wait">
                 <motion.blockquote
                   key={currentTestimonial}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.5 }}
                   className="text-2xl md:text-3xl font-serif italic text-[#2D241C] dark:text-[#FAF9F6] leading-relaxed absolute w-full px-4"
                 >
                   "{t.testimonials[currentTestimonial]}"
                 </motion.blockquote>
               </AnimatePresence>
             </div>
             <div className="flex justify-center gap-3 mb-10">
               {t.testimonials.map((_: any, idx: number) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentTestimonial(idx)}
                   className={`w-2.5 h-2.5 rounded-full transition-colors ${currentTestimonial === idx ? 'bg-amber-700' : 'bg-amber-700/20'}`}
                   aria-label={`Go to testimonial ${idx + 1}`}
                 />
               ))}
             </div>
             <Link to="/about" className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800 uppercase tracking-widest pb-1 border-b border-amber-700/30 hover:border-amber-700 transition-colors">
               {t.home.readMore}
             </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2D241C] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6 whitespace-pre-line">{t.home.ctaTitle}</h2>
            <p className="text-lg text-[#FAF9F6]/70 max-w-md mb-8">
              {t.home.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#2D241C] dark:text-[#FAF9F6] bg-[#FAF9F6] dark:bg-[#121212] hover:bg-white dark:bg-[#1c1c1c] rounded-md transition-colors"
              >
                {t.home.getDirections}
              </Link>
              <a
                href="https://www.talabat.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#FAF9F6] bg-transparent hover:bg-white/10 rounded-md transition-colors border border-white/20"
              >
                {t.home.order}
              </a>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
               <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Restaurant interior" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 ltr:-left-6 rtl:-right-6 w-24 h-24 bg-amber-700 rounded-full flex items-center justify-center transform -rotate-12 rtl:rotate-12">
               <span className="font-serif font-bold text-center leading-tight whitespace-pre-line text-sm">{t.home.until}<br/>{t.home.time}</span>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2D241C]/95 backdrop-blur-sm"
          >
            <button 
              className="absolute top-6 right-6 sm:top-8 sm:right-8 z-[60] text-white hover:text-amber-500 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
              wheel={{ step: 0.1 }}
              doubleClick={{ mode: "reset" }}
            >
              <TransformComponent wrapperClass="!w-full !h-full flex items-center justify-center" contentClass="!w-full !h-full flex items-center justify-center">
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  src={lightboxImage}
                  alt="Gallery full size"
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl cursor-grab active:cursor-grabbing"
                  onClick={(e) => e.stopPropagation()}
                />
              </TransformComponent>
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const getDietaryBadge = (type: string, lang: 'en' | 'ar') => {
  const badges = {
    v: { icon: Leaf, label: { en: 'Vegan', ar: 'نباتي صرف' }, colors: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800' },
    vg: { icon: Leaf, label: { en: 'Vegetarian', ar: 'نباتي' }, colors: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800' },
    gf: { icon: WheatOff, label: { en: 'Gluten-Free', ar: 'خالٍ من الغلوتين' }, colors: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50' },
    spicy: { icon: Flame, label: { en: 'Spicy', ar: 'حار' }, colors: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800' },
    nuts: { icon: AlertCircle, label: { en: 'Contains Nuts', ar: 'يحتوي على مكسرات' }, colors: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800' }
  };
  const badge = badges[type as keyof typeof badges];
  if (!badge) return null;
  const Icon = badge.icon;
  return (
    <span key={type} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${badge.colors}`}>
      <Icon className="w-3 h-3" />
      {badge.label[lang]}
    </span>
  );
};

const Menu = () => {
  const { lang, t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-20 bg-[#FAF9F6] dark:bg-[#121212] min-h-screen"
    >
      <SEO title={t.nav.menu} description={t.menu.desc} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-20">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] tracking-tight mb-6"
          >
            {t.menu.title}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-[#2D241C]/60 dark:text-[#FAF9F6]/60 text-lg"
          >
             {t.menu.desc}
          </motion.p>
        </div>

        <div className="space-y-24">
          {t.menu.categories.map((cat: any) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] border-b border-[#2D241C]/10 dark:border-[#FAF9F6]/10 pb-4 mb-8">
                {cat.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {cat.items.map((item: any) => (
                  <div key={item.name} className="group">
                    <h3 className="text-lg font-bold text-[#2D241C] dark:text-[#FAF9F6] mb-2 font-serif flex flex-wrap items-center gap-2">
                       {item.name}
                       {item.dietary && item.dietary.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 ml-1 rtl:ml-0 rtl:mr-1">
                             {item.dietary.map((type: string) => getDietaryBadge(type, lang))}
                          </div>
                       )}
                    </h3>
                    <p className="text-[#2D241C]/70 dark:text-[#FAF9F6]/70 leading-relaxed text-sm lg:text-base">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center border border-amber-100 dark:border-amber-900/30"
        >
           <p className="text-[#2D241C]/80 dark:text-[#FAF9F6]/80 inline-flex flex-col sm:flex-row items-center justify-center gap-2">
             <span>{t.menu.footerInfo}</span>
             <a href="tel:97000384" className="font-semibold text-amber-800 hover:underline">9700 0384</a>
             <span>{t.menu.forTodayInfo}</span>
           </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-20 bg-[#FAF9F6] dark:bg-[#121212] min-h-screen"
    >
       <SEO title={t.nav.about} description={t.about.p1} />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
             <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] tracking-tight mb-8 leading-tight whitespace-pre-line">{t.about.title}</h1>
                <div className="space-y-6 text-lg text-[#2D241C]/80 dark:text-[#FAF9F6]/80 leading-relaxed font-light">
                   <p>{t.about.p1}</p>
                   <p>{t.about.p2}</p>
                   <p>{t.about.p3}</p>
                </div>
             </div>
             
             <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#2D241C]/5 dark:bg-[#FAF9F6]/5">
                   <img src="https://images.unsplash.com/photo-1541544741938-0af808871ccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Cooking process" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-8 ltr:-left-8 rtl:-right-8 w-48 h-48 bg-amber-50 dark:bg-amber-900/20 rounded-full border border-amber-100 dark:border-amber-900/30 hidden md:flex items-center justify-center p-8 text-center">
                   <span className="font-serif italic text-amber-800 text-lg leading-snug">{t.about.quote}</span>
                </div>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="mt-32 pt-20 border-t border-[#2D241C]/10 dark:border-[#FAF9F6]/10"
          >
             <h2 className="text-3xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] tracking-tight mb-16 text-center">{t.about.guestsSay}</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {t.testimonials.map((quote: string, i: number) => (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     viewport={{ once: true }}
                     key={i} 
                     className="bg-white dark:bg-[#1c1c1c] p-8 rounded-xl shadow-sm border border-[#2D241C]/5 dark:border-[#FAF9F6]/5"
                   >
                      <div className="text-amber-400 mb-4 flex gap-1">
                        {[...Array(5)].map((_, j) => <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                      </div>
                      <p className="text-[#2D241C]/80 dark:text-[#FAF9F6]/80 italic">"{quote}"</p>
                   </motion.div>
                ))}
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="mt-32 pt-20 border-t border-[#2D241C]/10 dark:border-[#FAF9F6]/10 max-w-3xl mx-auto"
          >
             <h2 className="text-3xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] tracking-tight mb-12 text-center">{t.about.faqTitle}</h2>
             <div className="space-y-4">
                {t.about.faqs.map((faq: any, index: number) => (
                   <div key={index} className="bg-white dark:bg-[#1c1c1c] rounded-xl shadow-sm border border-[#2D241C]/5 dark:border-[#FAF9F6]/5 overflow-hidden">
                      <button
                         onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                         className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                      >
                         <span className="font-serif text-lg font-bold text-[#2D241C] dark:text-[#FAF9F6]">{faq.question}</span>
                         <ChevronDown className={`w-5 h-5 text-[#2D241C]/50 dark:text-[#FAF9F6]/50 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                         {openFaqIndex === index && (
                            <motion.div
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                               <div className="px-6 pb-6 text-[#2D241C]/70 dark:text-[#FAF9F6]/70 leading-relaxed">
                                  {faq.answer}
                               </div>
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                ))}
             </div>
          </motion.div>
       </div>
    </motion.div>
  );
};

const Contact = () => {
  const { lang, t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-20 bg-[#FAF9F6] dark:bg-[#121212] min-h-screen"
    >
       <SEO title={t.nav.visit} description={t.contact.title} />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] tracking-tight mb-8">{t.contact.title}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             <div className="space-y-12">
                <div className="bg-white dark:bg-[#1c1c1c] p-8 rounded-2xl shadow-sm border border-[#2D241C]/5 dark:border-[#FAF9F6]/5">
                   <h3 className="text-2xl font-serif font-bold text-[#2D241C] dark:text-[#FAF9F6] mb-6">{t.contact.visitUs}</h3>
                   <ul className="space-y-6">
                      <li className="flex items-start gap-4">
                         <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center shrink-0">
                           <MapPin className="h-6 w-6 text-amber-700" />
                         </div>
                         <div>
                            <p className="font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1">{t.contact.location}</p>
                            <p className="text-[#2D241C]/70 dark:text-[#FAF9F6]/70 mb-2">{t.contact.address}</p>
                            <a href="https://www.google.com/maps/search/?api=1&query=Abyan+Yemeni+restaurant+Halban" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors uppercase tracking-wide flex items-center gap-1 w-fit">{t.contact.openMaps} <ArrowRight className="w-4 h-4 rtl:rotate-180" /></a>
                         </div>
                      </li>
                      <li className="flex items-start gap-4 pt-4 border-t border-black/5">
                         <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center shrink-0">
                           <Phone className="h-6 w-6 text-amber-700" />
                         </div>
                         <div>
                            <p className="font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1">{t.contact.callUs}</p>
                            <a href="tel:97000384" className="text-[#2D241C]/70 dark:text-[#FAF9F6]/70 hover:text-amber-700 transition-colors block mb-2">9700 0384</a>
                            <a href="tel:97000384" className="text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors uppercase tracking-wide flex items-center gap-1 w-fit">{t.contact.callNow} <ArrowRight className="w-4 h-4 rtl:rotate-180" /></a>
                         </div>
                      </li>
                      <li className="flex items-start gap-4 pt-4 border-t border-black/5">
                         <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center shrink-0">
                           <Clock className="h-6 w-6 text-amber-700" />
                         </div>
                         <div>
                            <p className="font-medium text-[#2D241C] dark:text-[#FAF9F6] mb-1">{t.contact.hours}</p>
                            <p className="text-[#2D241C]/70 dark:text-[#FAF9F6]/70 whitespace-pre-line">{t.contact.openDaily}</p>
                         </div>
                      </li>
                   </ul>
                </div>
             </div>
             
             <div className="bg-[#2D241C]/5 dark:bg-[#FAF9F6]/5 rounded-2xl p-2 relative min-h-[400px]">
                <div className="absolute inset-0 m-2 rounded-xl overflow-hidden bg-[#e5e3df] flex items-center justify-center">
                   <div className="absolute inset-0 opacity-40 mix-blend-multiply flex items-center justify-center pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#2D241C]/20 dark:text-[#FAF9F6]/20" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                   </div>
                   
                   {/* GUtech Landmark */}
                   <div className="absolute top-[20%] left-[15%] md:left-[25%] flex flex-col items-center group cursor-pointer z-10 hover:z-30">
                      <div className="w-8 h-8 bg-blue-600/90 rounded-full flex items-center justify-center shadow-md mb-2 transform group-hover:scale-110 transition-transform">
                         <Globe className="h-4 w-4 text-white" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-[#1c1c1c] px-3 py-1.5 rounded-md shadow-lg text-xs font-semibold whitespace-nowrap text-[#2D241C] dark:text-[#FAF9F6] border border-[#2D241C]/10 dark:border-[#FAF9F6]/10">
                         {lang === 'en' ? 'GUtech University' : 'الجامعة الألمانية للتكنولوجيا'}
                      </div>
                   </div>

                   {/* Expressway Landmark */}
                   <div className="absolute bottom-[20%] right-[15%] md:right-[25%] flex flex-col items-center group cursor-pointer z-10 hover:z-30">
                      <div className="w-8 h-8 bg-emerald-600/90 rounded-full flex items-center justify-center shadow-md mb-2 transform group-hover:scale-110 transition-transform">
                         <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-[#1c1c1c] px-3 py-1.5 rounded-md shadow-lg text-xs font-semibold whitespace-nowrap text-[#2D241C] dark:text-[#FAF9F6] border border-[#2D241C]/10 dark:border-[#FAF9F6]/10">
                         {lang === 'en' ? 'Muscat Expressway' : 'طريق مسقط السريع'}
                      </div>
                   </div>

                   {/* Souq Seeb Landmark */}
                   <div className="absolute top-[30%] right-[10%] flex flex-col items-center group cursor-pointer z-10 hover:z-30">
                      <div className="w-8 h-8 bg-purple-600/90 rounded-full flex items-center justify-center shadow-md mb-2 transform group-hover:scale-110 transition-transform">
                         <Globe className="h-4 w-4 text-white" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-[#1c1c1c] px-3 py-1.5 rounded-md shadow-lg text-xs font-semibold whitespace-nowrap text-[#2D241C] dark:text-[#FAF9F6] border border-[#2D241C]/10 dark:border-[#FAF9F6]/10">
                         {lang === 'en' ? 'Seeb Souq' : 'سوق السيب'}
                      </div>
                   </div>

                   <div className="relative z-20 flex flex-col items-center">
                      <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center shadow-xl shadow-amber-900/20 mb-4 transform hover:scale-110 transition-transform">
                         <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <div className="bg-white dark:bg-[#1c1c1c] px-6 py-4 rounded-xl shadow-xl shadow-black/10 text-center transition-transform hover:scale-[1.02]">
                         <h4 className="font-bold text-[#2D241C] dark:text-[#FAF9F6] font-serif text-lg mb-1">{t.contact.abyan}</h4>
                         <p className="text-sm text-[#2D241C]/60 dark:text-[#FAF9F6]/60 mb-4">{t.contact.address}</p>
                         <a href="https://www.google.com/maps/search/?api=1&query=Abyan+Yemeni+restaurant+Halban" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-md text-sm font-medium transition-colors">
                            {t.contact.getDirections}
                         </a>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
      <HelmetProvider>
      <Router>
        <div 
          className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#121212] font-sans text-[#2D241C] dark:text-[#FAF9F6] selection:bg-amber-200 selection:text-amber-900"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow flex flex-col">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
      </HelmetProvider>
    </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

// Utility to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
