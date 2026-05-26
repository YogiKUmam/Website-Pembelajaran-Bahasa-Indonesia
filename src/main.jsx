import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Landmark,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mic,
  PenLine,
  Plane,
  Play,
  Printer,
  RotateCcw,
  Save,
  ShieldPlus,
  Sparkles,
  UserRound,
  UsersRound,
  Volume2,
  X
} from "lucide-react";
import "./styles.css";

const storage = {
  read(key, fallback) {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const modules = [
  {
    id: "bandara",
    icon: Plane,
    title: "Di Bandara",
    level: "Pemula",
    duration: "22 menit",
    focus: "Imigrasi, formulir, arah, bagasi",
    description: "Belajar menyapa petugas, mengisi formulir, bertanya arah, dan menjawab pertanyaan imigrasi.",
    phrases: ["Selamat pagi, Pak.", "Di mana loket imigrasi?", "Saya datang untuk bertugas di kedutaan."],
    vocabulary: [
      { word: "loket", meaning: "counter atau tempat pelayanan", example: "Loket imigrasi ada di sebelah kanan." },
      { word: "bagasi", meaning: "barang bawaan di pesawat", example: "Bagasi saya belum keluar." },
      { word: "kedatangan", meaning: "arrival", example: "Area kedatangan ada di lantai satu." }
    ],
    writingPrompt: "Tulis dua kalimat untuk menjelaskan tujuan kedatangan Anda di Indonesia."
  },
  {
    id: "kedutaan",
    icon: BriefcaseBusiness,
    title: "Di Kantor Kedutaan",
    level: "Formal",
    duration: "34 menit",
    focus: "Tamu, telepon, janji, email",
    description: "Latihan percakapan formal: menerima tamu, membuat janji, menjawab telepon, memperkenalkan pejabat, dan menulis email singkat.",
    phrases: ["Ada janji dengan siapa?", "Mohon tunggu sebentar.", "Saya akan menghubungi bagian protokol."],
    vocabulary: [
      { word: "janji", meaning: "appointment", example: "Saya sudah membuat janji pukul sepuluh." },
      { word: "protokol", meaning: "bagian tata acara resmi", example: "Bagian protokol akan mendampingi tamu." },
      { word: "pejabat", meaning: "official", example: "Pejabat kedutaan akan hadir sore ini." }
    ],
    writingPrompt: "Tulis email singkat untuk mengonfirmasi jadwal pertemuan dengan tamu kedutaan."
  },
  {
    id: "diplomatik",
    icon: Landmark,
    title: "Acara Diplomatik",
    level: "Menengah",
    duration: "28 menit",
    focus: "Small talk, sambutan, etiket",
    description: "Simulasi menyapa tamu, small talk, memperkenalkan negara, mengucapkan terima kasih, dan berbicara sopan.",
    phrases: ["Senang bertemu dengan Anda.", "Terima kasih atas kehadirannya.", "Izinkan saya memperkenalkan Duta Besar."],
    vocabulary: [
      { word: "kehadiran", meaning: "attendance", example: "Terima kasih atas kehadiran Bapak dan Ibu." },
      { word: "perkenalkan", meaning: "let me introduce", example: "Perkenalkan, ini kolega saya." },
      { word: "sambutan", meaning: "formal remarks", example: "Sambutan akan dimulai setelah makan malam." }
    ],
    writingPrompt: "Tulis ucapan terima kasih singkat untuk tamu acara diplomatik."
  },
  {
    id: "harian",
    icon: Compass,
    title: "Kehidupan Sehari-hari",
    level: "Praktis",
    duration: "41 menit",
    focus: "Belanja, transportasi, restoran",
    description: "Berlatih belanja, naik transportasi, memesan makanan, bertanya harga, meminta bantuan, dan memahami ekspresi lokal.",
    phrases: ["Berapa harganya?", "Saya mau pesan nasi goreng.", "Tolong antarkan ke alamat ini."],
    vocabulary: [
      { word: "harga", meaning: "price", example: "Berapa harga satu botol air?" },
      { word: "pesan", meaning: "order", example: "Saya mau pesan teh hangat." },
      { word: "alamat", meaning: "address", example: "Alamat saya dekat kantor kedutaan." }
    ],
    writingPrompt: "Tulis pesan singkat untuk memesan makanan dan memberi alamat pengantaran."
  },
  {
    id: "budaya",
    icon: HeartHandshake,
    title: "Budaya dan Etiket Indonesia",
    level: "Konteks",
    duration: "25 menit",
    focus: "Bapak/Ibu, basa-basi, norma sosial",
    description: "Memahami kapan memakai Bapak/Ibu, cara menolak dengan sopan, bahasa tubuh, basa-basi, dan norma sosial.",
    phrases: ["Maaf, sepertinya belum bisa.", "Silakan mampir kapan-kapan.", "Terima kasih, Bu."],
    vocabulary: [
      { word: "mampir", meaning: "stop by", example: "Silakan mampir ke rumah kami." },
      { word: "sopan", meaning: "polite", example: "Kalimat itu terdengar lebih sopan." },
      { word: "basa-basi", meaning: "social small talk", example: "Basa-basi membantu membuka percakapan." }
    ],
    writingPrompt: "Tulis kalimat untuk menolak undangan dengan sopan."
  },
  {
    id: "keluarga",
    icon: UsersRound,
    title: "Family Learning Mode",
    level: "Ramah keluarga",
    duration: "18 menit",
    focus: "Rumah, sekolah, hobi, kuis",
    description: "Materi ringan untuk pasangan dan anak melalui kosakata rumah, sekolah, makanan, permainan kata, gambar, dan kuis sederhana.",
    phrases: ["Saya suka membaca.", "Ini ruang keluarga.", "Besok ada kegiatan sekolah."],
    vocabulary: [
      { word: "sekolah", meaning: "school", example: "Anak saya pergi ke sekolah pagi ini." },
      { word: "kegiatan", meaning: "activity", example: "Besok ada kegiatan kelas." },
      { word: "keluarga", meaning: "family", example: "Kami tinggal bersama keluarga." }
    ],
    writingPrompt: "Tulis tiga kalimat tentang anggota keluarga atau kegiatan sekolah."
  },
  {
    id: "darurat",
    icon: ShieldPlus,
    title: "Emergency & Public Services",
    level: "Penting",
    duration: "20 menit",
    focus: "Dokter, keamanan, alamat, bantuan",
    description: "Bahasa Indonesia praktis untuk meminta bantuan, menghubungi dokter, menjelaskan alamat, melapor kehilangan, dan mencari layanan publik.",
    phrases: ["Saya butuh bantuan.", "Alamat saya di Jalan Diponegoro.", "Saya kehilangan tas."],
    vocabulary: [
      { word: "bantuan", meaning: "help", example: "Saya butuh bantuan sekarang." },
      { word: "kehilangan", meaning: "lost something", example: "Saya kehilangan dompet." },
      { word: "dokter", meaning: "doctor", example: "Saya perlu bertemu dokter." }
    ],
    writingPrompt: "Tulis pesan darurat singkat yang menjelaskan lokasi dan bantuan yang dibutuhkan."
  }
];

const tracks = [
  { id: "pegawai", title: "Pegawai Kedutaan", goal: "Komunikasi formal, resepsi, acara resmi.", modules: ["kedutaan", "diplomatik", "budaya"] },
  { id: "keluarga", title: "Keluarga Pendamping", goal: "Aktivitas harian, sekolah, layanan publik.", modules: ["harian", "keluarga", "darurat"] },
  { id: "arrival", title: "New Arrival", goal: "Minggu pertama tiba di Indonesia.", modules: ["bandara", "harian", "budaya"] }
];

const quizQuestions = [
  {
    type: "mcq",
    category: "Di Bandara",
    prompt: "Sapaan paling sopan kepada petugas imigrasi adalah...",
    options: ["Hai kamu", "Selamat pagi, Pak/Bu", "Bro, cepat ya", "Apa kabar, teman?"],
    answer: "Selamat pagi, Pak/Bu"
  },
  {
    type: "fill",
    category: "Di Bandara",
    prompt: "Lengkapi kalimat: Di mana ____ imigrasi?",
    answer: "loket",
    hint: "Tempat pelayanan atau counter."
  },
  {
    type: "audio",
    category: "Di Bandara",
    prompt: "Dengarkan frasa, lalu pilih arti yang paling tepat.",
    audioText: "Saya datang untuk bertugas di kedutaan.",
    options: ["Saya sedang berlibur", "Saya bekerja untuk kedutaan", "Saya mencari restoran", "Saya kehilangan bagasi"],
    answer: "Saya bekerja untuk kedutaan"
  },
  {
    type: "mcq",
    category: "Di Kantor Kedutaan",
    prompt: "Kalimat yang tepat untuk menerima tamu secara formal adalah...",
    options: ["Mau apa?", "Ada janji dengan siapa?", "Tunggu di luar", "Saya tidak tahu"],
    answer: "Ada janji dengan siapa?"
  },
  {
    type: "fill",
    category: "Di Kantor Kedutaan",
    prompt: "Lengkapi kalimat: Mohon ____ sebentar.",
    answer: "tunggu",
    hint: "Kata kerja yang dipakai saat meminta seseorang menanti."
  },
  {
    type: "audio",
    category: "Di Kantor Kedutaan",
    prompt: "Dengarkan frasa, lalu pilih konteks penggunaannya.",
    audioText: "Saya akan menghubungi bagian protokol.",
    options: ["Menerima tamu resmi", "Membeli tiket", "Memesan makanan", "Mencari dokter"],
    answer: "Menerima tamu resmi"
  },
  {
    type: "mcq",
    category: "Acara Diplomatik",
    prompt: "Ungkapan sopan saat bertemu tamu acara resmi adalah...",
    options: ["Senang bertemu dengan Anda.", "Kamu siapa?", "Ayo cepat.", "Jangan lama-lama."],
    answer: "Senang bertemu dengan Anda."
  },
  {
    type: "fill",
    category: "Acara Diplomatik",
    prompt: "Lengkapi kalimat: Terima kasih atas ____ Bapak dan Ibu.",
    answer: "kehadiran",
    hint: "Attendance."
  },
  {
    type: "audio",
    category: "Acara Diplomatik",
    prompt: "Dengarkan frasa dan pilih fungsi kalimatnya.",
    audioText: "Izinkan saya memperkenalkan Duta Besar.",
    options: ["Memperkenalkan pejabat", "Menolak undangan", "Memesan makanan", "Bertanya harga"],
    answer: "Memperkenalkan pejabat"
  },
  {
    type: "mcq",
    category: "Kehidupan Sehari-hari",
    prompt: "Kalimat untuk bertanya harga adalah...",
    options: ["Di mana loket?", "Berapa harganya?", "Saya bertugas di sini", "Terima kasih atas kehadirannya"],
    answer: "Berapa harganya?"
  },
  {
    type: "fill",
    category: "Kehidupan Sehari-hari",
    prompt: "Lengkapi kalimat: Saya mau ____ nasi goreng.",
    answer: "pesan",
    hint: "Order."
  },
  {
    type: "audio",
    category: "Kehidupan Sehari-hari",
    prompt: "Dengarkan frasa, lalu pilih maksudnya.",
    audioText: "Tolong antarkan ke alamat ini.",
    options: ["Minta pengantaran ke lokasi", "Minta formulir", "Memperkenalkan pejabat", "Mengucapkan selamat pagi"],
    answer: "Minta pengantaran ke lokasi"
  },
  {
    type: "mcq",
    category: "Budaya dan Etiket",
    prompt: "Cara menolak undangan dengan sopan adalah...",
    options: ["Tidak mau.", "Maaf, sepertinya belum bisa.", "Jangan ajak saya.", "Saya tidak peduli."],
    answer: "Maaf, sepertinya belum bisa."
  },
  {
    type: "fill",
    category: "Budaya dan Etiket",
    prompt: "Sapaan sopan untuk orang dewasa yang belum dikenal adalah Bapak atau ____.",
    answer: "Ibu",
    hint: "Sapaan formal untuk perempuan dewasa."
  },
  {
    type: "audio",
    category: "Emergency & Public Services",
    prompt: "Dengarkan frasa, lalu pilih situasi yang sesuai.",
    audioText: "Saya kehilangan tas.",
    options: ["Melapor barang hilang", "Menyambut tamu", "Membuat janji", "Menghadiri acara resmi"],
    answer: "Melapor barang hilang"
  }
];

const navItems = [
  { page: "home", label: "Home", icon: LayoutDashboard },
  { page: "courses", label: "Courses", icon: BookOpenText },
  { page: "learn", label: "Learn", icon: Play },
  { page: "quiz", label: "Quiz", icon: ClipboardCheck },
  { page: "certificate", label: "Certificate", icon: Award }
];

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

function normalizeAnswer(value) {
  return String(value || "").trim().toLowerCase();
}

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace("#", "") || "home");
  const [user, setUser] = useState(() => storage.read("nla.user", null));
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(() => storage.read("nla.selectedModule", "kedutaan"));
  const [completed, setCompleted] = useState(() => storage.read("nla.completed", ["bandara", "harian"]));
  const [plannerDone, setPlannerDone] = useState(() => storage.read("nla.planner", ["Hari 1"]));
  const [masteredVocab, setMasteredVocab] = useState(() => storage.read("nla.vocabulary", []));
  const [writingDrafts, setWritingDrafts] = useState(() => storage.read("nla.writing", {}));
  const [quizState, setQuizState] = useState(() => storage.read("nla.quizState", { index: 0, answers: {}, submitted: false }));
  const [toast, setToast] = useState("");

  useEffect(() => {
    const onHash = () => setPage(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => storage.write("nla.user", user), [user]);
  useEffect(() => storage.write("nla.selectedModule", selectedModuleId), [selectedModuleId]);
  useEffect(() => storage.write("nla.completed", completed), [completed]);
  useEffect(() => storage.write("nla.planner", plannerDone), [plannerDone]);
  useEffect(() => storage.write("nla.vocabulary", masteredVocab), [masteredVocab]);
  useEffect(() => storage.write("nla.writing", writingDrafts), [writingDrafts]);
  useEffect(() => storage.write("nla.quizState", quizState), [quizState]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selectedModule = modules.find((item) => item.id === selectedModuleId) || modules[0];
  const progress = Math.round((completed.length / modules.length) * 100);
  const quizScore = calculateQuizScore(quizState.answers);
  const answeredCount = Object.keys(quizState.answers).filter((key) => quizState.answers[key]).length;
  const adminUsers = storage.read("nla.adminUsers", [
    { name: "Amina Laurent", role: "Pegawai Kedutaan", progress: 72, quiz: 12 },
    { name: "Daniela Moretti", role: "Keluarga Pendamping", progress: 58, quiz: 9 },
    { name: "Kenji Arata", role: "New Arrival", progress: 41, quiz: 7 }
  ]);

  function go(nextPage) {
    window.location.hash = nextPage;
    setPage(nextPage);
  }

  function toggleComplete(id) {
    setCompleted((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  function showToast(message) {
    setToast(message);
  }

  function resetAll() {
    setCompleted([]);
    setPlannerDone([]);
    setMasteredVocab([]);
    setWritingDrafts({});
    setQuizState({ index: 0, answers: {}, submitted: false });
    showToast("Semua progress latihan direset.");
  }

  return (
    <main className={page === "quiz" ? "quiz-app" : "app-shell"}>
      {page !== "quiz" && (
        <Header
          page={page}
          user={user}
          onGo={go}
          onLogin={() => setLoginOpen(true)}
          onLogout={() => {
            setUser(null);
            showToast("Anda sudah keluar.");
          }}
        />
      )}

      {page === "home" && <HomePage onGo={go} progress={progress} quizScore={quizScore} />}
      {page === "courses" && (
        <CoursesPage
          selectedModuleId={selectedModuleId}
          completed={completed}
          onSelect={(id) => {
            setSelectedModuleId(id);
            go("learn");
          }}
          onToggle={toggleComplete}
        />
      )}
      {page === "learn" && (
        <LearnPage
          module={selectedModule}
          completed={completed}
          masteredVocab={masteredVocab}
          writingDrafts={writingDrafts}
          onSelectModule={setSelectedModuleId}
          onToggleComplete={toggleComplete}
          onMasterVocab={setMasteredVocab}
          onSaveWriting={(id, value) => {
            setWritingDrafts((drafts) => ({ ...drafts, [id]: value }));
            showToast("Draft latihan menulis tersimpan.");
          }}
        />
      )}
      {page === "quiz" && (
        <QuizPage
          state={quizState}
          setState={setQuizState}
          onExit={() => go("home")}
          onGo={go}
          onToast={showToast}
        />
      )}
      {page === "admin" && (
        <AdminPage
          user={user}
          users={adminUsers}
          progress={progress}
          quizScore={quizScore}
          answeredCount={answeredCount}
          onLogin={() => setLoginOpen(true)}
        />
      )}
      {page === "certificate" && (
        <CertificatePage user={user} progress={progress} quizScore={quizScore} plannerDone={plannerDone} onReset={resetAll} />
      )}

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onLogin={(profile) => {
            setUser(profile);
            setLoginOpen(false);
            showToast(`Masuk sebagai ${profile.name}.`);
            if (profile.role === "Admin Kedutaan") {
              go("admin");
            }
          }}
        />
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}

function Header({ page, user, onGo, onLogin, onLogout }) {
  return (
    <header className="site-header">
      <button className="brand-button" onClick={() => onGo("home")}>
        <span className="brand-mark">N</span>
        <span>
          <strong>Nusantara</strong>
          <small>Language Academy</small>
        </span>
      </button>
      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button className={page === item.page ? "active" : ""} key={item.page} onClick={() => onGo(item.page)}>
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
      {user ? (
        <button className="user-pill" onClick={onLogout}>
          <UserRound size={16} />
          {user.name}
          <LogOut size={15} />
        </button>
      ) : (
        <button className="primary-button small" onClick={onLogin}>
          <LogIn size={16} />
          Login
        </button>
      )}
    </header>
  );
}

function HomePage({ onGo, progress, quizScore }) {
  const audiences = [
    { title: "Embassy Staff", text: "Bahasa formal untuk resepsi, janji temu, telepon, dan acara resmi." },
    { title: "Diplomatic Families", text: "Percakapan harian untuk sekolah, restoran, transportasi, dan layanan publik." },
    { title: "New Arrivals", text: "Frasa praktis untuk bandara, alamat, bantuan, dan adaptasi minggu pertama." }
  ];

  const workflow = [
    "Choose a learning path",
    "Practice real conversations",
    "Take mixed quizzes",
    "Track progress and certificate"
  ];

  const scenarios = ["At the airport", "Embassy office", "Diplomatic events", "Daily Indonesia", "Culture and etiquette"];
  const trustSignals = ["BIPA-inspired path", "Scenario-based practice", "Culture included", "For staff and families"];

  return (
    <>
      <section className="hero-page">
        <div>
          <h1>Nusantara Language Academy</h1>
          <p>
            Learn Indonesian for embassy life, family routines, and everyday Indonesia through practical
            conversations and cultural context.
          </p>
          <div className="action-row">
            <button className="primary-button" onClick={() => onGo("courses")}>
              <BookOpenText size={18} />
              Start Learning
            </button>
            <button className="secondary-button" onClick={() => onGo("quiz")}>
              <ClipboardCheck size={18} />
              Take Placement Quiz
            </button>
          </div>
          <div className="trust-row" aria-label="Learning highlights">
            {trustSignals.map((signal) => (
              <span key={signal}>
                <Check size={14} />
                {signal}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-dashboard">
          <div className="home-preview-top">
            <div>
              <span>Current practice</span>
              <strong>Embassy Reception</strong>
            </div>
            <small>{progress}% progress</small>
          </div>
          <div className="hero-dialogue">
            <p className="speaker">Petugas</p>
            <p>Selamat pagi. Ada yang bisa saya bantu?</p>
            <p className="speaker user">Anda</p>
            <p>Saya ingin membuat janji dengan bagian konsuler.</p>
          </div>
          <div className="home-preview-meta">
            <span><Headphones size={16} /> Listening</span>
            <span><Mic size={16} /> Speaking</span>
            <span><ClipboardCheck size={16} /> Quiz {quizScore}/15</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <span>Who it is for</span>
          <h2>Built for the whole embassy community.</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((item) => (
            <article key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section split">
        <div className="home-section-heading">
          <span>How learning works</span>
          <h2>A quiet structure for practical confidence.</h2>
          <p>
            The academy moves from guided paths into real conversations, then checks understanding
            through quiz types that mirror everyday use.
          </p>
        </div>
        <div className="workflow-list">
          {workflow.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section scenarios">
        <div className="home-section-heading">
          <span>Real situations</span>
          <h2>Practice the moments that actually happen.</h2>
        </div>
        <div className="scenario-rail">
          {scenarios.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="home-section quiz-teaser">
        <div>
          <span>Quiz preview</span>
          <h2>15 questions, three ways to practice.</h2>
          <p>Multiple choice checks meaning, audio checks listening, and fill-in-the-blank strengthens recall.</p>
          <button className="secondary-button" onClick={() => onGo("quiz")}>
            Open Quiz
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="quiz-preview-card">
          <small>Fill-in-the-blank</small>
          <strong>Di mana ____ imigrasi?</strong>
          <p>Hint: tempat pelayanan atau counter.</p>
        </div>
      </section>

      <section className="home-section culture-note">
        <div>
          <HeartHandshake size={24} />
          <h2>More than vocabulary.</h2>
        </div>
        <p>
          Learn when to use Bapak/Ibu, how to decline politely, and how Indonesian small talk
          helps conversations feel respectful and natural.
        </p>
        <button className="primary-button" onClick={() => onGo("learn")}>
          Continue to Learn
          <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <article>
      <Icon size={24} />
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function CoursesPage({ selectedModuleId, completed, onSelect, onToggle }) {
  return (
    <section className="page-section">
      <div className="page-heading">
        <span>Courses</span>
        <h1>Kurikulum Bahasa Indonesia Kedutaan</h1>
        <p>Pilih modul, tandai penyelesaian, lalu masuk ke halaman Learn untuk latihan frasa, kosakata, dan writing.</p>
      </div>
      <div className="course-grid">
        {modules.map((module) => {
          const Icon = module.icon;
          const done = completed.includes(module.id);
          return (
            <article className={selectedModuleId === module.id ? "course-card selected" : "course-card"} key={module.id}>
              <div className="course-top">
                <span className="module-icon"><Icon size={20} /></span>
                <small>{module.level}</small>
              </div>
              <h2>{module.title}</h2>
              <p>{module.description}</p>
              <div className="course-actions">
                <button className="secondary-button" onClick={() => onToggle(module.id)}>
                  <Check size={16} />
                  {done ? "Selesai" : "Tandai"}
                </button>
                <button className="primary-button" onClick={() => onSelect(module.id)}>
                  Belajar
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function LearnPage({ module, completed, masteredVocab, writingDrafts, onSelectModule, onToggleComplete, onMasterVocab, onSaveWriting }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [voiceScore, setVoiceScore] = useState(null);
  const [draft, setDraft] = useState(writingDrafts[module.id] || "");
  const vocab = module.vocabulary[vocabIndex];
  const vocabKey = `${module.id}:${vocab.word}`;
  const mastered = masteredVocab.includes(vocabKey);

  useEffect(() => {
    setPhraseIndex(0);
    setVocabIndex(0);
    setVoiceScore(null);
    setDraft(writingDrafts[module.id] || "");
  }, [module.id, writingDrafts]);

  return (
    <section className="learn-layout">
      <aside className="learn-sidebar">
        <strong>Modul</strong>
        {modules.map((item) => (
          <button className={item.id === module.id ? "active" : ""} key={item.id} onClick={() => onSelectModule(item.id)}>
            {item.title}
          </button>
        ))}
      </aside>
      <div className="learn-main">
        <div className="page-heading compact-heading">
          <span>Learn</span>
          <h1>{module.title}</h1>
          <p>{module.description}</p>
        </div>
        <div className="learning-grid">
          <article className="practice-card wide">
            <div className="card-head">
              <span><Sparkles size={18} /> Roleplay</span>
              <small>{module.duration}</small>
            </div>
            <div className="phrase-list">
              {module.phrases.map((phrase, index) => (
                <button className={phraseIndex === index ? "active" : ""} key={phrase} onClick={() => setPhraseIndex(index)}>
                  {phrase}
                  {phraseIndex === index && <Check size={16} />}
                </button>
              ))}
            </div>
            <div className="audio-actions">
              <button className="secondary-button" onClick={() => speak(module.phrases[phraseIndex])}>
                <Volume2 size={16} />
                Dengarkan
              </button>
              <button className="secondary-button" onClick={() => setVoiceScore(Math.min(98, 70 + phraseIndex * 8 + module.title.length % 11))}>
                <Mic size={16} />
                Cek Suara
              </button>
              {voiceScore && <strong className="voice-badge">{voiceScore}% jelas</strong>}
            </div>
          </article>
          <article className="practice-card">
            <div className="card-head">
              <span><BookOpenText size={18} /> Vocabulary</span>
              <small>{vocabIndex + 1}/{module.vocabulary.length}</small>
            </div>
            <h2>{vocab.word}</h2>
            <p>{vocab.meaning}</p>
            <blockquote>{vocab.example}</blockquote>
            <div className="card-actions">
              <button className="secondary-button" onClick={() => setVocabIndex((index) => (index + 1) % module.vocabulary.length)}>
                Berikutnya
              </button>
              <button
                className="primary-button"
                onClick={() =>
                  onMasterVocab((items) => (items.includes(vocabKey) ? items.filter((item) => item !== vocabKey) : [...items, vocabKey]))
                }
              >
                {mastered ? "Sudah Hafal" : "Tandai Hafal"}
              </button>
            </div>
          </article>
          <article className="practice-card">
            <div className="card-head">
              <span><PenLine size={18} /> Writing</span>
              <small>{draft.length} karakter</small>
            </div>
            <p>{module.writingPrompt}</p>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Tulis latihan di sini..." />
            <button className="primary-button full" onClick={() => onSaveWriting(module.id, draft)}>
              <Save size={16} />
              Simpan Draft
            </button>
          </article>
        </div>
        <button className="primary-button" onClick={() => onToggleComplete(module.id)}>
          <Check size={16} />
          {completed.includes(module.id) ? "Modul Sudah Selesai" : "Tandai Modul Selesai"}
        </button>
      </div>
    </section>
  );
}

function QuizPage({ state, setState, onExit, onGo, onToast }) {
  const [secondsLeft, setSecondsLeft] = useState(() => storage.read("nla.quizSeconds", 60 * 60));
  const current = quizQuestions[state.index] || quizQuestions[0];
  const currentAnswer = state.answers[state.index] || "";
  const score = calculateQuizScore(state.answers);
  const reviewItems = quizQuestions.map((question, index) => {
    const userAnswer = state.answers[index] || "";
    return {
      ...question,
      index,
      userAnswer,
      correct: Boolean(userAnswer) && isCorrectAnswer(index, userAnswer)
    };
  });
  const needsReview = reviewItems.filter((item) => !item.correct);
  const recommendedModules = [...new Set(needsReview.map((item) => item.category))];

  useEffect(() => {
    if (state.submitted) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        const next = Math.max(0, seconds - 1);
        storage.write("nla.quizSeconds", next);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [state.submitted]);

  function setAnswer(value) {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [prev.index]: value } }));
  }

  function jump(index) {
    setState((prev) => ({ ...prev, index }));
  }

  function next() {
    if (state.index === quizQuestions.length - 1) {
      setState((prev) => ({ ...prev, submitted: true }));
      onToast("Quiz selesai. Hasil tersimpan.");
      return;
    }
    jump(state.index + 1);
  }

  function reset() {
    setState({ index: 0, answers: {}, submitted: false });
    setSecondsLeft(60 * 60);
    storage.write("nla.quizSeconds", 60 * 60);
  }

  return (
    <section className="exam-shell">
      <aside className="exam-sidebar">
        <button className="back-button" onClick={onExit}>
          <ArrowLeft size={16} />
          Keluar
        </button>
        <h2>Soal kategori: Bahasa Indonesia Kedutaan</h2>
        <p>{current.category}</p>
        <div className="question-grid" aria-label="Nomor soal">
          {quizQuestions.map((question, index) => (
            <button
              className={[
                index === state.index ? "current" : "",
                state.answers[index] ? "answered" : "",
                state.submitted && isCorrectAnswer(index, state.answers[index]) ? "correct" : "",
                state.submitted && state.answers[index] && !isCorrectAnswer(index, state.answers[index]) ? "wrong" : ""
              ].join(" ")}
              key={`${question.category}-${index}`}
              onClick={() => jump(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </aside>
      <div className="exam-main">
        <div className="exam-topbar">
          <span>{current.type === "mcq" ? "Pilihan Ganda" : current.type === "audio" ? "Audio" : "Fill in the blank"}</span>
          <time>{formatTime(secondsLeft)}</time>
        </div>
        {state.submitted ? (
          <div className="result-panel">
            <Award size={46} />
            <h1>Hasil Quiz</h1>
            <strong>{score}/15 benar</strong>
            <p>{score >= 12 ? "Sangat baik. Anda siap memakai Bahasa Indonesia dalam banyak situasi kedutaan." : "Bagus. Ulangi beberapa modul untuk memperkuat kosakata dan etiket."}</p>
            <div className="result-stats" aria-label="Ringkasan hasil quiz">
              <article>
                <span>Benar</span>
                <strong>{score}</strong>
              </article>
              <article>
                <span>Perlu review</span>
                <strong>{needsReview.length}</strong>
              </article>
              <article>
                <span>Terjawab</span>
                <strong>{reviewItems.filter((item) => item.userAnswer).length}</strong>
              </article>
            </div>
            <div className="recommendation-panel">
              <span>Recommended next practice</span>
              {recommendedModules.length ? (
                <div className="recommendation-list">
                  {recommendedModules.map((category) => (
                    <button key={category} onClick={() => onGo("learn")}>
                      {category}
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              ) : (
                <p>Semua topik kuat. Lanjutkan latihan percakapan untuk menjaga kelancaran.</p>
              )}
            </div>
            <div className="review-panel">
              <h2>Review Mistakes</h2>
              {needsReview.length ? (
                <div className="review-list">
                  {needsReview.map((item) => (
                    <article key={`${item.category}-${item.index}`}>
                      <small>Soal {item.index + 1} · {item.category}</small>
                      <p>{item.prompt}</p>
                      <div>
                        <span>Jawaban Anda: <strong>{item.userAnswer || "Belum dijawab"}</strong></span>
                        <span>Jawaban benar: <strong>{item.answer}</strong></span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p>Tidak ada kesalahan. Hasil ini sudah sangat solid.</p>
              )}
            </div>
            <div className="action-row">
              <button className="primary-button" onClick={() => onGo("learn")}>
                Continue Learning
                <ArrowRight size={16} />
              </button>
              <button className="primary-button" onClick={reset}>
                <RotateCcw size={16} />
                Ulangi Quiz
              </button>
              <button className="secondary-button" onClick={onExit}>
                Kembali ke Home
              </button>
            </div>
          </div>
        ) : (
          <article className="question-panel">
            <p className="question-text">{current.prompt}</p>
            {current.type === "audio" && (
              <button className="audio-button" onClick={() => speak(current.audioText)}>
                <Headphones size={18} />
                Putar Audio
              </button>
            )}
            {current.type === "fill" ? (
              <div className="fill-area">
                <input
                  value={currentAnswer}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder="Ketik jawaban..."
                />
                <small>{current.hint}</small>
              </div>
            ) : (
              <div className="exam-options">
                {current.options.map((option) => (
                  <button className={currentAnswer === option ? "selected" : ""} key={option} onClick={() => setAnswer(option)}>
                    <span />
                    {option}
                  </button>
                ))}
              </div>
            )}
            <div className="exam-footer">
              <button className="secondary-button" disabled={state.index === 0} onClick={() => jump(state.index - 1)}>
                Sebelumnya
              </button>
              <button className="next-button" onClick={next}>
                {state.index === quizQuestions.length - 1 ? "Selesai" : "Selanjutnya"}
                <ArrowRight size={18} />
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

function AdminPage({ user, users, progress, quizScore, answeredCount, onLogin }) {
  if (!user) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <BarChart3 size={44} />
          <h1>Admin Dashboard</h1>
          <p>Masuk terlebih dahulu untuk melihat simulasi dashboard admin kedutaan.</p>
          <button className="primary-button" onClick={onLogin}>
            <LogIn size={16} />
            Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <span>Admin</span>
        <h1>Dashboard Komunitas Kedutaan</h1>
        <p>Prototype admin berbasis data lokal untuk memantau progress, quiz, dan sertifikat.</p>
      </div>
      <div className="admin-metrics">
        <Metric title="Progress Anda" value={`${progress}%`} />
        <Metric title="Quiz Benar" value={`${quizScore}/15`} />
        <Metric title="Soal Terjawab" value={answeredCount} />
        <Metric title="User Simulasi" value={users.length + 1} />
      </div>
      <div className="admin-table">
        <div className="table-row head">
          <span>Nama</span>
          <span>Role</span>
          <span>Progress</span>
          <span>Quiz</span>
        </div>
        <div className="table-row">
          <span>{user.name}</span>
          <span>{user.role}</span>
          <span>{progress}%</span>
          <span>{quizScore}/15</span>
        </div>
        {users.map((item) => (
          <div className="table-row" key={item.name}>
            <span>{item.name}</span>
            <span>{item.role}</span>
            <span>{item.progress}%</span>
            <span>{item.quiz}/15</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ title, value }) {
  return (
    <article>
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  );
}

function CertificatePage({ user, progress, quizScore, plannerDone, onReset }) {
  return (
    <section className="certificate-page">
      <div className="certificate-paper">
        <span className="certificate-mark">NLA</span>
        <p className="speaker">Certificate Preview</p>
        <h1>Nusantara Weekly Practice</h1>
        <p>
          Diberikan kepada {user?.name || "anggota komunitas kedutaan"} atas partisipasi dalam latihan Bahasa Indonesia
          untuk konteks kedutaan dan kehidupan sehari-hari.
        </p>
        <div className="certificate-metrics">
          <span><strong>{progress}%</strong> modul</span>
          <span><strong>{plannerDone.length}/5</strong> planner</span>
          <span><strong>{quizScore}/15</strong> quiz</span>
        </div>
        <div className="action-row">
          <button className="primary-button" onClick={() => window.print()}>
            <Printer size={16} />
            Print / Simpan PDF
          </button>
          <button className="secondary-button" onClick={onReset}>
            <RotateCcw size={16} />
            Reset Progress
          </button>
        </div>
      </div>
    </section>
  );
}

function LoginModal({ onClose, onLogin }) {
  const [name, setName] = useState("Yogi Embassy Learner");
  const [role, setRole] = useState("Pegawai Kedutaan");

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="login-modal">
        <button className="modal-close" onClick={onClose} aria-label="Tutup login">
          <X size={18} />
        </button>
        <h2 id="login-title">Login Prototype</h2>
        <p>Data login disimpan lokal untuk demo multi-user dan dashboard admin.</p>
        <label>
          Nama
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Role
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option>Pegawai Kedutaan</option>
            <option>Keluarga Pendamping</option>
            <option>Admin Kedutaan</option>
            <option>New Arrival</option>
          </select>
        </label>
        <button className="primary-button full" onClick={() => onLogin({ name, role })}>
          <LogIn size={16} />
          Masuk
        </button>
        <button
          className="admin-login-link"
          onClick={() => onLogin({ name: "Admin Kedutaan", role: "Admin Kedutaan" })}
        >
          Masuk sebagai admin
        </button>
      </div>
    </div>
  );
}

function calculateQuizScore(answers) {
  return quizQuestions.reduce((score, question, index) => (isCorrectAnswer(index, answers[index]) ? score + 1 : score), 0);
}

function isCorrectAnswer(index, value) {
  const question = quizQuestions[index];
  if (!question) return false;
  return normalizeAnswer(value) === normalizeAnswer(question.answer);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}m:${String(rest).padStart(2, "0")}s`;
}

createRoot(document.getElementById("root")).render(<App />);
