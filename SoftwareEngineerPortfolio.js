import React, { useState } from 'react';
import { Briefcase, BookOpen, Code, Mail, MapPin, Linkedin, Github, LayoutGrid, Zap, TrendingUp, MousePointerClick, Home } from 'lucide-react';

// Tailwind CSS is assumed to be available.

// --- SABİT KİŞİSEL VERİLER (LÜTFEN BUNLARI KENDİNİZE GÖRE DÜZENLEYİN) ---
const userProfile = {
  name: "Nejla Mulayim",
  title: "Yazılım Mühendisliği Öğrencisi | 3. Sınıf",
  summary: "Öğrenme odaklı, problem çözme yeteneği yüksek ve tam yığın geliştirme konularına tutkuyla bağlı 3. sınıf yazılım mühendisliği öğrencisiyim. Özellikle React, Node.js ve modern veritabanı teknolojileri üzerinde çalışmaktan keyif alıyorum. Akademik bilgimi gerçek dünya projelerine dönüştürerek staj ve mezuniyet sonrası pozisyonlarda değer katmayı hedefliyorum.",
  contact: {
    email: "ntysoftware@gmail.com",
    location: "Türkiye",
    linkedin: "http://linkedin.com/in/nejla-mulayim",
    github: "https://github.com/nejlamulayim11",
  },
  skills: [
    { category: "Diller", items: ["C", "C++", "Python", "JavaScript", "SQL"] },
    { category: "Frontend", items: ["HTML5", "CSS3", "React", "Tailwind CSS", "Redux (Temel)"] },
    { category: "Backend & DB", items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs"] },
  ],
  education: [
    {
      degree: "Yazılım Mühendisliği, B.Sc.",
      institution: "Lefke Avrupa Üniversitesi",
      years: "2022 - 2027 (Beklenen)",
      details: "Web Geliştirme Teknolojileri, Veri Yapıları, Algoritmalar ve İşletim Sistemleri gibi temel derslerde başarı. (JavaScript/Frontend konularına odaklanılmıştır).",
    },
    {
      degree: "Lise Diploması",
      institution: "Gaziantep Kolej Vakfı Anadolu Lisesi",
      years: "2017 - 2021",
      details: "Sayısal bölüm",
    },
  ],
  experience: [
    {
      title: "Stajyer Mühendis",
      company: "BADEX LTD.",
      years: "Haziran 2024 - Ağustos 2024",
      details: [
        "Staj dönemi boyunca yürütülen teknik çalışmalar ve öğrenilen teknolojiler üzerine detaylı bir raporu hazırladım ve yönetime sundum.",
      ],
    },
  ],
  projects: [
    {
      name: "Akıllı Otopark Takip Sistemi",
      description: "C++ kullanarak araç giriş/çıkış, kapasite yönetimi ve yer tahsisi gibi temel otopark mantığının konsol tabanlı simülasyonu. HTML ve CSS ile anlık doluluk durumunu gösteren basit bir görsel arayüz oluşturulmuştur.",
      technologies: ["C++", "HTML5", "CSS3", "Veri Yapıları", "Simülasyon"],
    },
    {
      name: "Gelişmiş Veri Yapıları Uygulaması",
      description: "C++ kullanarak Hash Tabloları, Dengeli İkili Arama Ağaçları (AVL/Red-Black) ve Graf Algoritmalarının (Dijkstra, BFS/DFS) sıfırdan implementasyonu. Performans analizleri yapılmıştır.",
      technologies: ["C++", "Veri Yapıları", "Algoritmalar", "Terminal Arayüzü"],
    },
    {
      name: "Basit Kullanıcı Kaydı ve Takvim Uygulaması",
      description: "Temel HTML5 ve CSS3 ile tasarlanmış, JavaScript ile dinamizm katılmış basit bir Kullanıcı Kayıt/Giriş ve Etkinlik Takvimi arayüzü. (Veritabanı bağlantısı simülasyonu C ile yapılmıştır).",
      technologies: ["C", "HTML5", "CSS3", "JavaScript", "Temel Veri Saklama"],
    },
    {
      name: "Yapay Zeka Destekli Not Alma Uygulaması",
      description: "Kullanıcının notlarını özetlemek ve anahtar kelimeleri çıkarmak için Python ve küçük bir makine öğrenimi modeli (temel NLP) kullanan masaüstü uygulaması.",
      technologies: ["Python", "Flask", "SQLite", "NLP (Temel)"],
    },
    {
      name: "Temel Makine Öğrenimi Uygulamaları Koleksiyonu",
      description: "Yeni başlayanlar için popüler veri setleri (Titanic, Iris vb.) üzerinde temel seviye regresyon, sınıflandırma ve kümeleme algoritmalarının Python ile uygulanması.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Temel ML Algoritması"],
    },
    {
      name: "Basit Yapılacaklar (To-Do) Listesi Uygulaması",
      description: "Günlük görevleri takip etmek için geliştirilmiş, yerel depolama kullanan (veya bir C/C++ arka ucu simüle eden) basit bir web tabanlı To-Do listesi uygulaması.",
      technologies: ["HTML", "CSS", "JavaScript", "Yerel Depolama/Simülasyon"],
    },
  ]
};

// --- YARDIMCI BİLEŞENLER ---

const SectionTitle = ({ icon: Icon, title }) => (
  // Pembe (pink) renkli vurgu
  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 border-b border-pink-300/80 pb-2 flex items-center space-x-3">
    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
    <span>{title}</span>
  </h2>
);

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-5 sm:p-6 rounded-xl shadow-md border border-gray-200 transition duration-500 cursor-default bg-white h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 25px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
        borderColor: isHovered ? '#F472B6' : '#e5e7eb', // Pembe vurgu
      }}
    >
      <h3 
        className={`text-lg sm:text-xl font-bold transition duration-300 ${isHovered ? 'text-pink-700' : 'text-gray-900'} mb-2`}
      >
        {project.name}
      </h3>
      
      <p className="text-gray-700 leading-relaxed text-sm flex-grow mb-2">{project.description}</p>
    </div>
  );
};

// Footer bileşeni artık global olarak App içinde çağrılacak.
const Footer = ({ name }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-xs sm:text-sm">
      <p>
        Bu Portfolyo CV, Yazılım Mühendisliği Öğrencisi ({name}) tarafından React ve Tailwind CSS ile tamamen responsive olarak oluşturulmuştur.
      </p>
      <div 
        onClick={handleClick}
        className="mt-2 inline-flex items-center space-x-1 p-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition duration-200 cursor-pointer select-none border border-pink-200"
      >
        <MousePointerClick className="w-4 h-4" />
        <span className="font-semibold">
          JS Dinamik Etkileşim: {clickCount} kez tıklandı!
        </span>
      </div>
    </footer>
  );
};


// --- NAVİGASYON BİLEŞENİ ---

const NAV_ITEMS = [
  { id: 'anasayfa', label: 'Ana Sayfa', icon: Home },
  { id: 'hakkinda', label: 'Hakkında', icon: Zap },
  { id: 'projeler', label: 'Projeler', icon: LayoutGrid },
  { id: 'egitim', label: 'Eğitim & Deneyim', icon: TrendingUp },
  { id: 'iletisim', label: 'İletişim', icon: Mail },
];

const Navbar = ({ currentSection, onSectionChange }) => (
  <nav className="sticky top-0 z-10 bg-white shadow-lg border-b border-pink-200/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        {/* Sol Tarafta İsim Başlangıcı (Sadece Mobil/Küçük Ekranlarda) */}
        <div className="flex-shrink-0 flex items-center text-lg font-bold text-gray-900 sm:hidden">
          {userProfile.name}
        </div>
        
        {/* Sağ Tarafta Navigasyon Menüsü */}
        <div className="flex flex-1 justify-center sm:justify-end">
          <div className="flex space-x-2 sm:space-x-4">
            {NAV_ITEMS.map((item) => {
              const isActive = currentSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center space-x-1 
                    ${isActive
                      // Aktif buton rengi: Pastel pembe (pink-300) ve koyu pembe metin
                      ? 'bg-pink-300 text-pink-900 shadow-inner hover:bg-pink-400'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </nav>
);


// --- BÖLÜM BİLEŞENLERİ (Yeni Yapı) ---

// 1. ANA SAYFA
const HomePage = ({ profile }) => (
  <section className="animate-fade-in">
    <header className="py-12 bg-pink-100 shadow-2xl rounded-lg">
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 transition-transform duration-300 hover:scale-[1.02] cursor-default">
          {profile.name}
        </h1>
        <p className="text-xl sm:text-2xl mt-2 font-light text-pink-700">{profile.title}</p>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg bg-pink-50 p-4 rounded-lg border border-pink-200 shadow-inner mt-6 max-w-4xl mx-auto">
          {profile.summary}
        </p>
      </div>
    </header>
  </section>
);

// 2. HAKKINDA (Özet ve Beceriler)
const AboutSection = ({ profile }) => (
  <section className="animate-fade-in">
    <SectionTitle icon={Zap} title="Hakkımda & Beceriler" />
    
    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Özet</h3>
    <p className="text-gray-700 leading-relaxed text-base sm:text-lg bg-pink-50 p-4 rounded-lg border border-pink-200 shadow-inner">{profile.summary}</p>

    <div className="mt-10">
        <SectionTitle icon={Code} title="Teknik Beceriler (Skills)" />
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {profile.skills.map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-pink-400 transition-all duration-300 hover:shadow-xl hover:border-l-8">
            <h4 className="text-sm sm:text-lg font-bold text-gray-900 mb-2">{skill.category}</h4>
            <div className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                <span key={i} className="bg-pink-200 text-pink-800 text-xs font-medium px-2 py-0.5 rounded-full border border-pink-400 transition hover:bg-pink-300 cursor-default">
                    {item}
                </span>
                ))}
            </div>
            </div>
        ))}
        </div>
    </div>
  </section>
);

// 3. PROJELER
const ProjectsSection = ({ projects }) => (
    <section className="animate-fade-in">
        <SectionTitle icon={LayoutGrid} title="Önemli Projeler (Portfolyo)" />
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    </section>
);

// 4. EĞİTİM VE DENEYİM
const EducationExperienceSection = ({ experience, education }) => (
    <section className="animate-fade-in">
        <SectionTitle icon={TrendingUp} title="Deneyim & Eğitim" />
        
        <div className="grid grid-cols-1 gap-8">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2 border-b pb-2 border-gray-200">
                <Briefcase className="w-5 h-5 text-pink-600" />
                <span>İş Deneyimi & Stajlar</span>
                </h3>
                {experience.map((exp, index) => (
                <div key={index} className="mb-6 border-l-4 border-pink-400 pl-4 bg-white p-3 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                    <p className="text-pink-700 text-sm">{exp.company} | {exp.years}</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 text-sm">
                    {exp.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2 border-b pb-2 border-gray-200">
                <BookOpen className="w-5 h-5 text-pink-600" />
                <span>Eğitim Bilgileri</span>
                </h3>
                {education.map((edu, index) => (
                <div key={index} className="mb-6 border-l-4 border-gray-400 pl-4 bg-white p-3 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600 text-sm">{edu.institution} | {edu.years}</p>
                    <p className="text-sm mt-1 text-gray-500">{edu.details}</p>
                </div>
                ))}
            </div>
        </div>
    </section>
);

// 5. İLETİŞİM
// Footer artık burada çağrılmıyor.
const ContactSection = ({ contact }) => (
    <section className="animate-fade-in text-center">
        <SectionTitle icon={Mail} title="İletişim Bilgileri" />
        <div className="mt-8 flex flex-wrap justify-center space-x-4 sm:space-x-8 text-lg">
            
            <a href={`mailto:${contact.email}`} className="text-gray-800 hover:text-pink-600 transition flex items-center space-x-2 mb-4 p-3 bg-pink-100 rounded-lg shadow-sm">
                <Mail className="w-5 h-5 text-pink-600" />
                <span className="font-medium">{contact.email}</span>
            </a>
            
            <div className="text-gray-800 flex items-center space-x-2 mb-4 p-3 bg-pink-100 rounded-lg shadow-sm">
                <MapPin className="w-5 h-5 text-pink-600" />
                <span className="font-medium">{contact.location}</span>
            </div>
            
            <a href={`${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-pink-600 transition flex items-center space-x-2 mb-4 p-3 bg-pink-100 rounded-lg shadow-sm">
                <Linkedin className="w-5 h-5 text-pink-600" />
                <span className="font-medium">LinkedIn Profilim</span>
            </a>
            
            <a href={`${contact.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-pink-600 transition flex items-center space-x-2 mb-4 p-3 bg-pink-100 rounded-lg shadow-sm">
                <Github className="w-5 h-5 text-pink-600" />
                <span className="font-medium">GitHub Profilim</span>
            </a>
        </div>
    </section>
);


// --- ANA UYGULAMA BİLEŞENİ ---
const App = () => {
  // Varsayılan olarak Ana Sayfa ile başla
  const [currentSection, setCurrentSection] = useState('anasayfa');

  // Geçerli bölümü koşullu olarak render eden fonksiyon
  const renderSection = () => {
    switch (currentSection) {
      case 'anasayfa':
        return <HomePage profile={userProfile} />;
      case 'hakkinda':
        return <AboutSection profile={userProfile} />;
      case 'projeler':
        return <ProjectsSection projects={userProfile.projects} />;
      case 'egitim':
        return <EducationExperienceSection 
                  experience={userProfile.experience} 
                  education={userProfile.education} 
                />;
      case 'iletisim':
        return <ContactSection contact={userProfile.contact} />; // Footer kaldırıldı
      default:
        return <HomePage profile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      {/* 1. Navbar */}
      <Navbar 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-b-xl min-h-[calc(100vh-64px)]">
        <main>
          {/* 2. Koşullu İçerik Render Etme */}
          {renderSection()}
          
        </main>
        {/* Footer (JS etkileşimi) artık tüm sayfalarda görünecek şekilde buraya taşındı. */}
        <Footer name={userProfile.name} /> 
      </div>
    </div>
  );
};

export default App;
