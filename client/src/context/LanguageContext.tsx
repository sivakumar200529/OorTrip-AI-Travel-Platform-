import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isTamil: boolean;
}

export const LANGUAGES: { code: LanguageCode; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
];

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Brand
    brandName: 'OorTrip AI',
    tagline: 'Discover Tamil Nadu. Your Journey, Intelligently Planned.',
    heroSubtitle: 'Plan smarter. Explore deeper. Experience Tamil Nadu.',
    planMyTrip: 'PLAN MY TRIP',
    exploreTN: 'EXPLORE TAMIL NADU',
    
    // Nav
    navHome: 'Home',
    navPlanner: 'AI Planner',
    navDestinations: 'Destinations',
    navMap: 'Smart Map',
    navExperiences: 'Experiences',
    navBudget: 'Budget',
    navPass: 'Tourist Pass',
    navSafety: 'Safety SOS',
    navLogin: 'Demo Login',
    navDashboard: 'Dashboard',
    navAdmin: 'Admin Portal',
    
    // Hero 3D
    heroBadge: '✨ NEXT-GEN DIGITAL TOURISM PLATFORM',
    heroCardTitle: 'MAHABALIPURAM',
    heroCardSub: 'Ancient Shore Temple & Coastal Heritage',
    heroRating: '★ 4.8 / 5.0 (3.8k reviews)',
    heroAvgCost: '₹800 average',
    heroDuration: '3–4 hours',
    heroCrowd: 'MEDIUM CROWD',
    
    // AI Planner
    plannerTitle: 'AI Personalized Journey Generator',
    plannerSub: 'Nine intelligent parameters curated for authentic Tamil Nadu exploration',
    step1: 'WHERE ARE YOU STARTING?',
    step2: 'WHERE DO YOU WANT TO GO?',
    step3: 'HOW MANY DAYS?',
    step4: 'WHAT IS YOUR BUDGET?',
    step5: 'WHAT DO YOU LOVE?',
    step6: 'WHO ARE YOU TRAVELLING WITH?',
    step7: 'HOW WILL YOU TRAVEL?',
    step8: 'FOOD PREFERENCE',
    step9: 'ACCESSIBILITY PREFERENCE',
    generateButton: 'CREATE MY ITINERARY WITH AI',
    
    // AI Assistant
    aiAssistantTitle: 'OorTrip AI Assistant',
    aiAssistantSub: 'Your real-time Tamil Nadu travel companion',
    askAnything: 'Ask anything about Tamil Nadu...',
    
    // General
    explore: 'Explore',
    bookNow: 'Book Now',
    demoNotice: 'DEMO / SIMULATED DATA',
    acceptSuggestion: 'ACCEPT',
    keepOriginal: 'KEEP ORIGINAL',
    budgetRemaining: 'Remaining',
    budgetSpent: 'Spent',
    totalBudget: 'Trip Budget',
  },
  ta: {
    // Brand
    brandName: 'ஊர்டிரிப் AI',
    tagline: 'தமிழ்நாட்டைக் கண்டறியுங்கள். உங்கள் பயணம், அறிவார்ந்த திட்டமிடலுடன்.',
    heroSubtitle: 'புத்திசாலித்தனமாக திட்டமிடுங்கள். ஆழமாக ஆராயுங்கள். தமிழ்நாட்டை அனுபவியுங்கள்.',
    planMyTrip: 'பயணத்தை திட்டமிடுங்கள்',
    exploreTN: 'தமிழ்நாட்டை ஆராயுங்கள்',
    
    // Nav
    navHome: 'முகப்பு',
    navPlanner: 'AI திட்டமிடுபவர்',
    navDestinations: 'இடங்கள்',
    navMap: 'வரைபடம்',
    navExperiences: 'அனுபவங்கள்',
    navBudget: 'பட்ஜெட்',
    navPass: 'சுற்றுலா பாஸ்',
    navSafety: 'அவசர SOS',
    navLogin: 'உள்நுழைவு',
    navDashboard: 'டாஷ்போர்டு',
    navAdmin: 'நிர்வாக தளம்',
    
    // Hero 3D
    heroBadge: '✨ அடுத்த தலைமுறை டிஜிட்டல் சுற்றுலா தளம்',
    heroCardTitle: 'மகாபலிபுரம்',
    heroCardSub: 'பல்லவர் கால கடற்கரைக் கோயில் மற்றும் புராதனச் சிற்பங்கள்',
    heroRating: '★ 4.8 / 5.0 (3.8k மதிப்பாய்வுகள்)',
    heroAvgCost: '₹800 சராசரி செலவு',
    heroDuration: '3–4 மணி நேரம்',
    heroCrowd: 'மிதமான கூட்டம்',
    
    // AI Planner
    plannerTitle: 'AI தனிப்பயனாக்கப்பட்ட பயணத் திட்டம்',
    plannerSub: 'உண்மையான தமிழ்நாடு பயணத்திற்கான ஒன்பது அறிவார்ந்த தேர்வுகள்',
    step1: 'நீங்கள் எங்கிருந்து தொடங்குகிறீர்கள்?',
    step2: 'நீங்கள் எங்கு செல்ல விரும்புகிறீர்கள்?',
    step3: 'எத்தனை நாட்கள்?',
    step4: 'உங்கள் பட்ஜெட் எவ்வளவு?',
    step5: 'உங்களுக்கு என்ன பிடிக்கும்?',
    step6: 'யாருடன் பயணிக்கிறீர்கள்?',
    step7: 'எந்த வாகனத்தில் பயணிப்பீர்கள்?',
    step8: 'உணவு விருப்பம்',
    step9: 'சிறப்பு வசதி தேவைகள்',
    generateButton: 'AI கொண்டு பயணத் திட்டத்தை உருவாக்கு',
    
    // AI Assistant
    aiAssistantTitle: 'ஊர்டிரிப் AI உதவியாளர்',
    aiAssistantSub: 'உங்கள் நேரடி தமிழ்நாடு பயண வழிகாட்டி',
    askAnything: 'தமிழ்நாடு பற்றி எதையும் கேளுங்கள்...',
    
    // General
    explore: 'ஆராயுங்கள்',
    bookNow: 'முன்பதிவு செய்',
    demoNotice: 'மாதிரி / செயற்கைத் தகவல் (DEMO DATA)',
    acceptSuggestion: 'ஏற்றுக்கொள்',
    keepOriginal: 'அசல் திட்டத்தை வைத்திரு',
    budgetRemaining: 'மீதம் உள்ளது',
    budgetSpent: 'செலவு செய்யப்பட்டது',
    totalBudget: 'பயண பட்ஜெட்',
  },
  hi: {
    brandName: 'OorTrip AI',
    tagline: 'तमिलनाडु की खोज करें। आपकी यात्रा, बुद्धिमत्ता से नियोजित।',
    heroSubtitle: 'समझदारी से योजना बनाएं। गहराई से जानें। तमिलनाडु का अनुभव लें।',
    planMyTrip: 'मेरी यात्रा की योजना बनाएं',
    exploreTN: 'तमिलनाडु देखें',
    navHome: 'होम',
    navPlanner: 'AI प्लानर',
    navDestinations: 'गंतव्य',
    navMap: 'स्मार्ट मैप',
    navExperiences: 'अनुभव',
    navBudget: 'बजट',
    navPass: 'पर्यटक पास',
    navSafety: 'सुरक्षा SOS',
    navLogin: 'लॉग इन',
    navDashboard: 'डैशबोर्ड',
    navAdmin: 'एडमिन पोर्टल',
    heroBadge: '✨ अगली पीढ़ी का डिजिटल पर्यटन मंच',
    heroCardTitle: 'महाबलीपुरम',
    heroCardSub: 'प्राचीन तटीय मंदिर और विरासत',
    heroRating: '★ 4.8 / 5.0',
    heroAvgCost: '₹800 औसत',
    heroDuration: '3–4 घंटे',
    heroCrowd: 'मध्यम भीड़',
    plannerTitle: 'AI यात्रा योजनाकार',
    plannerSub: 'तमिलनाडु के लिए 9 पैरामीटर युक्त योजना',
    step1: 'आप कहाँ से शुरू कर रहे हैं?',
    step2: 'आप कहाँ जाना चाहते हैं?',
    step3: 'कितने दिन?',
    step4: 'आपका बजट कितना है?',
    step5: 'आपकी पसंद क्या है?',
    step6: 'आप किसके साथ यात्रा कर रहे हैं?',
    step7: 'परिवहन साधन?',
    step8: 'खानपान वरीयता',
    step9: 'सुलभता आवश्यकताएँ',
    generateButton: 'AI यात्रा कार्यक्रम तैयार करें',
    aiAssistantTitle: 'OorTrip AI सहायक',
    aiAssistantSub: 'आपका वास्तविक समय साथी',
    askAnything: 'तमिलनाडु के बारे में कुछ भी पूछें...',
    explore: 'खोजें',
    bookNow: 'बुक करें',
    demoNotice: 'डेमो डेटा',
    acceptSuggestion: 'स्वीकार करें',
    keepOriginal: 'मूल रखें',
    budgetRemaining: 'शेष',
    budgetSpent: 'खर्च',
    totalBudget: 'कुल बजट',
  },
  te: {
    brandName: 'OorTrip AI',
    tagline: 'తమిళనాడును అన్వేషించండి. మీ ప్రయాణం, మేధోవంతంగా ప్రణాళిక చేయబడింది.',
    heroSubtitle: 'తెలివిగా ప్లాన్ చేసుకోండి. తమిళనాడును అనుభవించండి.',
    planMyTrip: 'నా ట్రిప్ ప్లాన్ చేయండి',
    exploreTN: 'తమిళనాడు దర్శించండి',
    navHome: 'హోమ్',
    navPlanner: 'AI ప్లానర్',
    navDestinations: 'ప్రదేశాలు',
    navMap: 'స్మార్ట్ మ్యాప్',
    navExperiences: 'అనుభవాలు',
    navBudget: 'బడ్జెట్',
    navPass: 'టూరిస్ట్ పాస్',
    navSafety: 'రక్షణ SOS',
    navLogin: 'లాగిన్',
    navDashboard: 'డ్యాష్‌బోర్డ్',
    navAdmin: 'అడ్మిన్',
    heroBadge: '✨ డిజిటల్ టూరిజం ప్లాట్‌ఫారమ్',
    heroCardTitle: 'మహాబలిపురం',
    heroCardSub: 'ప్రాచీన తీర దేవాలయం',
    heroRating: '★ 4.8 / 5.0',
    heroAvgCost: '₹800 సగటు',
    heroDuration: '3–4 గంటలు',
    heroCrowd: 'మధ్యస్థ రద్దీ',
    plannerTitle: 'AI ట్రావెల్ ప్లానర్',
    plannerSub: 'వ్యక్తిగతీకరించిన ప్రయాణ ప్రణాళిక',
    step1: 'మీరు ఎక్కడి నుండి బయలుదేరుతున్నారు?',
    step2: 'ఎక్కడికి వెళ్లాలనుకుంటున్నారు?',
    step3: 'ఎన్ని రోజులు?',
    step4: 'మీ బడ్జెట్?',
    step5: 'మీ ఆసక్తులు ఏమిటి?',
    step6: 'ఎవరితో ప్రయాణిస్తున్నారు?',
    step7: 'రవాణా ఎంపిక?',
    step8: 'ఆహార ప్రాధాన్యత',
    step9: 'సౌలభ్య అవసరాలు',
    generateButton: 'AI ప్రయాణ ప్రణాళిక రూపొందించండి',
    aiAssistantTitle: 'OorTrip AI సహాయకుడు',
    aiAssistantSub: 'మీ టూర్ గైడ్',
    askAnything: 'ఏదైనా అడగండి...',
    explore: 'అన్వేషించండి',
    bookNow: 'బుక్ చేయండి',
    demoNotice: 'డెమో డేటా',
    acceptSuggestion: 'అంగీకరించు',
    keepOriginal: 'అసలుది ఉంచు',
    budgetRemaining: 'మిగిలినది',
    budgetSpent: 'ఖర్చు',
    totalBudget: 'మొత్తం బడ్జెట్',
  },
  ml: {
    brandName: 'OorTrip AI',
    tagline: 'തമിഴ്നാട് കണ്ടെത്തുക. നിങ്ങളുടെ യാത്ര, ബുദ്ധിപൂർവ്വം ആസൂത്രണം ചെയ്തത്.',
    heroSubtitle: 'തന്ത്രപരമായി ആസൂത്രണം ചെയ്യുക. തമിഴ്നാട് ആസ്വദിക്കുക.',
    planMyTrip: 'എന്റെ യാത്ര പ്ലാൻ ചെയ്യുക',
    exploreTN: 'തമിഴ്നാട് കാണുക',
    navHome: 'ഹോം',
    navPlanner: 'AI പ്ലാനർ',
    navDestinations: 'സ്ഥലങ്ങൾ',
    navMap: 'സ്മാർട്ട് മാപ്പ്',
    navExperiences: 'അനുഭവങ്ങൾ',
    navBudget: 'ബഡ്ജറ്റ്',
    navPass: 'ടൂറിസ്റ്റ് പാസ്',
    navSafety: 'സുരക്ഷാ SOS',
    navLogin: 'ലോഗിൻ',
    navDashboard: 'ഡാഷ്‌ബോർഡ്',
    navAdmin: 'അഡ്മിൻ',
    heroBadge: '✨ ഡിജിറ്റൽ ടൂറിസം പ്ലാറ്റ്‌ഫോം',
    heroCardTitle: 'മഹാബലിപുരം',
    heroCardSub: 'പുരാതന തീര ക്ഷേത്രം',
    heroRating: '★ 4.8 / 5.0',
    heroAvgCost: '₹800 ശരാശരി',
    heroDuration: '3–4 മണിക്കൂർ',
    heroCrowd: 'ഇടത്തരം തിരക്ക്',
    plannerTitle: 'AI യാത്രാ പ്ലാനർ',
    plannerSub: 'വ്യക്തിഗത യാത്രാ പദ്ധതി',
    step1: 'എവിടെ നിന്നാണ് ആരംഭിക്കുന്നത്?',
    step2: 'എങ്ങോട്ടാണ് പോകേണ്ടത്?',
    step3: 'എത്ര ദിവസങ്ങൾ?',
    step4: 'ബഡ്ജറ്റ് എത്രയാണ്?',
    step5: 'താൽപ്പര്യങ്ങൾ എന്തൊക്കെ?',
    step6: 'ആരൊക്കെയാണ് കൂടെയുള്ളത്?',
    step7: 'യാത്രാ സൗകര്യം?',
    step8: 'ഭക്ഷണ മുൻഗണന',
    step9: 'പ്രത്യേക സൗകര്യങ്ങൾ',
    generateButton: 'AI യാത്ര തയ്യാറാക്കുക',
    aiAssistantTitle: 'OorTrip AI അസിസ്റ്റന്റ്',
    aiAssistantSub: 'നിങ്ങളുടെ യാത്രാ കൂട്ടുകാരൻ',
    askAnything: 'എന്തും ചോദിക്കാം...',
    explore: 'കണ്ടെത്തുക',
    bookNow: 'ബുക്ക് ചെയ്യുക',
    demoNotice: 'ഡെമോ ഡാറ്റ',
    acceptSuggestion: 'സ്വീകരിക്കുക',
    keepOriginal: 'യഥാർത്ഥം നിലനിർത്തുക',
    budgetRemaining: 'ബാക്കി',
    budgetSpent: 'ചിലവ്',
    totalBudget: 'ആകെ ബഡ്ജറ്റ്',
  },
  kn: {
    brandName: 'OorTrip AI',
    tagline: 'ತಮಿಳುನಾಡನ್ನು ಅನ್ವೇಷಿಸಿ. ನಿಮ್ಮ ಪ್ರಯಾಣ, ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಯೋಜಿಸಲಾಗಿದೆ.',
    heroSubtitle: 'ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಯೋಜಿಸಿ. ತಮಿಳುನಾಡನ್ನು ಅನುಭವಿಸಿ.',
    planMyTrip: 'ನನ್ನ ಪ್ರವಾಸ ಯೋಜಿಸಿ',
    exploreTN: 'ತಮಿಳುನಾಡು ವೀಕ್ಷಿಸಿ',
    navHome: 'ಮುಖಪುಟ',
    navPlanner: 'AI ಪ್ಲಾನರ್',
    navDestinations: 'ಸ್ಥಳಗಳು',
    navMap: 'ಸ್ಮಾರ್ಟ್ ನಕ್ಷೆ',
    navExperiences: 'ಅನುಭವಗಳು',
    navBudget: 'ಬಜೆಟ್',
    navPass: 'ಪ್ರವಾಸಿ ಪಾಸ್',
    navSafety: 'ಸುರಕ್ಷತೆ SOS',
    navLogin: 'ಲಾಗಿನ್',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navAdmin: 'ನಿರ್ವಾಹಕ',
    heroBadge: '✨ ಡಿಜಿಟಲ್ ಪ್ರವಾಸೋದ್ಯಮ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್',
    heroCardTitle: 'ಮಹಾಬಲಿಪುರಂ',
    heroCardSub: 'ಪ್ರಾಚೀನ ಕರಾವಳಿ ದೇವಾಲಯ',
    heroRating: '★ 4.8 / 5.0',
    heroAvgCost: '₹800 ಸರಾಸರಿ',
    heroDuration: '3–4 ಗಂಟೆಗಳು',
    heroCrowd: 'ಮಧ್ಯಮ ಜನಸಂದಣಿ',
    plannerTitle: 'AI ಪ್ರವಾಸ ಯೋಜಕ',
    plannerSub: 'ವೈಯಕ್ತೀಕರಿಸಿದ ಪ್ರವಾಸ ಯೋಜನೆ',
    step1: 'ನೀವು ಎಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸುತ್ತೀರಿ?',
    step2: 'ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗಲು ಬಯಸುತ್ತೀರಿ?',
    step3: 'ಎಷ್ಟು ದಿನಗಳು?',
    step4: 'ನಿಮ್ಮ ಬಜೆಟ್ ಎಷ್ಟು?',
    step5: 'ನಿಮ್ಮ ಆಸಕ್ತಿಗಳು ಏನು?',
    step6: 'ಯಾರೊಂದಿಗೆ ಪ್ರಯಾಣಿಸುತ್ತಿದ್ದೀರಿ?',
    step7: 'ಸಾರಿಗೆ ಆಯ್ಕೆ?',
    step8: 'ಆಹಾರ ಆದ್ಯತೆ',
    step9: 'ಪ್ರವೇಶಿಸುವಿಕೆ ಅಗತ್ಯತೆಗಳು',
    generateButton: 'AI ಪ್ರವಾಸ ಕಾರ್ಯಕ್ರಮ ರಚಿಸಿ',
    aiAssistantTitle: 'OorTrip AI ಸಹಾಯಕ',
    aiAssistantSub: 'ನಿಮ್ಮ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ',
    askAnything: 'ಏನನ್ನಾದರೂ ಕೇಳಿ...',
    explore: 'ಅನ್ವೇಷಿಸಿ',
    bookNow: 'ಬುಕ್ ಮಾಡಿ',
    demoNotice: 'ಡೆಮೊ ಮಾಹಿತಿ',
    acceptSuggestion: 'ಸ್ವೀಕರಿಸಿ',
    keepOriginal: 'ಮೂಲ ಇರಿಸಿ',
    budgetRemaining: 'ಉಳಿದಿದೆ',
    budgetSpent: 'ಖರ್ಚು',
    totalBudget: 'ಒಟ್ಟು ಬಜೆಟ್',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    const saved = localStorage.getItem('oortrip_lang') as LanguageCode;
    if (saved && TRANSLATIONS[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('oortrip_lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTamil: language === 'ta' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
