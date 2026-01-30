import { useState, useEffect } from "react";
import "@/App.css";
import { Toaster, toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Heart,
  Shield,
  Clock,
  Users,
  Activity,
  Stethoscope,
  Syringe,
  CircleDot,
  Instagram,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// Assets URLs
const ASSETS = {
  logo: "https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/ow5jeuzb_logo%204.png.png",
  heroDoctor: "https://customer-assets.emergentagent.com/job_0795af87-d9c0-4ec7-995f-6ecc755051f1/artifacts/f6s576fu_WhatsApp%20Image%202026-01-28%20at%2003.49.13.jpeg",
  teamSurgery: "https://customer-assets.emergentagent.com/job_0795af87-d9c0-4ec7-995f-6ecc755051f1/artifacts/e6y396fi_WhatsApp%20Image%202026-01-29%20at%2019.43.49.jpeg",
};

const WHATSAPP_NUMBER = "5215537171796";
const WHATSAPP_MESSAGE = "Hola Dr. Rodríguez Romo, me gustaría agendar una cita.";

const openWhatsApp = (message = WHATSAPP_MESSAGE) => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
};

const callPhone = () => {
  window.location.href = "tel:+525537171796";
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    {
      name: "Sobre mí",
      href: "#sobre-mi",
      dropdown: [
        { name: "Formación", href: "#formacion" },
        { name: "Experiencia", href: "#experiencia" },
        { name: "Filosofía médica", href: "#filosofia" },
      ],
    },
    {
      name: "Servicios",
      href: "#servicios",
      dropdown: [
        { name: "Colecistectomía laparoscópica", href: "#servicios" },
        { name: "Apendicectomía", href: "#servicios" },
        { name: "Hernioplastia inguinal", href: "#servicios" },
        { name: "Hernioplastia umbilical", href: "#servicios" },
        { name: "Cirugía de cuello", href: "#servicios" },
        { name: "Cirugía laparoscópica", href: "#servicios" },
      ],
    },
    {
      name: "Padecimientos",
      href: "#padecimientos",
      dropdown: [
        { name: "Vesícula biliar", href: "#padecimientos" },
        { name: "Apendicitis", href: "#padecimientos" },
        { name: "Hernias", href: "#padecimientos" },
        { name: "Patología quirúrgica de cuello", href: "#padecimientos" },
      ],
    },
    {
      name: "Pacientes",
      href: "#pacientes",
      dropdown: [
        { name: "Preparación preoperatoria", href: "#pacientes" },
        { name: "Cuidados postoperatorios", href: "#pacientes" },
        { name: "Preguntas frecuentes", href: "#faq" },
      ],
    },
    { name: "Contacto", href: "#contacto" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glassmorphism shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); scrollToSection("#inicio"); }}
            data-testid="logo-link"
            className="flex-shrink-0"
          >
            <img src={ASSETS.logo} alt="Dr. Luis Enrique Rodríguez Romo Merino" className="h-14 md:h-16 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="nav-dropdown">
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                  className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-[#005EB8] font-medium transition-colors"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                {item.dropdown && (
                  <div className="nav-dropdown-content">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(subItem.href); }}
                        className="nav-dropdown-item"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => openWhatsApp()}
              data-testid="nav-agendar-cita"
              className="btn-primary"
            >
              <MessageCircle className="w-5 h-5" />
              Agendar cita
            </button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                data-testid="mobile-menu-toggle"
                className="lg:hidden p-2 text-slate-700"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <img src={ASSETS.logo} alt="Logo" className="h-12" />
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item) => (
                    <div key={item.name} className="px-4">
                      <a
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                        className="block py-3 text-slate-700 font-medium border-b border-slate-100"
                      >
                        {item.name}
                      </a>
                      {item.dropdown && (
                        <div className="pl-4 pb-2">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => { e.preventDefault(); scrollToSection(subItem.href); }}
                              className="block py-2 text-slate-500 text-sm hover:text-[#005EB8]"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t">
                  <button
                    onClick={() => openWhatsApp()}
                    data-testid="mobile-agendar-cita"
                    className="btn-primary w-full justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Agendar cita
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="inicio" data-testid="hero-section" className="hero-section bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-24 lg:py-12 pt-28 lg:pt-24">
          {/* Content */}
          <div className="order-2 lg:order-1 z-10 animate-fade-in-up">
            <p className="text-sm uppercase tracking-widest text-[#005EB8] font-semibold mb-4">
              Especialista en Cirugía General
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Dr. Luis Enrique<br />
              <span className="text-[#005EB8]">Rodríguez Romo Merino</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-4">
              Médico Cirujano – Especialista en Cirugía General
            </p>
            <p className="text-xl md:text-2xl text-slate-700 font-medium mb-8">
              Atención quirúrgica profesional, humana y segura.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={callPhone}
                data-testid="hero-call-btn"
                className="btn-secondary"
              >
                <Phone className="w-5 h-5" />
                Llamar ahora
              </button>
              <button
                onClick={() => openWhatsApp()}
                data-testid="hero-whatsapp-btn"
                className="btn-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="hero-image-container relative h-[180px] lg:h-[320px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={ASSETS.heroDoctor}
                alt="Dr. Luis Enrique Rodríguez Romo Merino"
                className="w-full h-full object-cover"
                data-testid="hero-doctor-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl hidden lg:flex items-center gap-3">
              <div className="w-12 h-12 bg-[#005EB8] rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Hospital San Ángel Inn</p>
                <p className="text-sm text-slate-500">Satélite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="sobre-mi" data-testid="about-section" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={ASSETS.teamSurgery}
                alt="Equipo quirúrgico"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                data-testid="about-team-image"
              />
            </div>
          </div>
          
          {/* Content */}
          <div id="formacion">
            <p className="text-sm uppercase tracking-widest text-[#005EB8] font-semibold mb-4">
              Sobre mí
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Formación y Experiencia
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Soy el Dr. Luis Enrique Rodríguez Romo Merino, Médico Cirujano Especialista en Cirugía General, egresado de la <strong>Universidad del Ejército y Fuerza Aérea</strong>. Brindo atención quirúrgica integral con enfoque humano, mínimamente invasivo y basado en evidencia científica.
            </p>
            
            <div id="experiencia" className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E0F2FE] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#005EB8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Universidad del Ejército y Fuerza Aérea</h4>
                  <p className="text-slate-600">Formación médica y especialidad en Cirugía General</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E0F2FE] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#005EB8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Hospital San Ángel Inn Satélite</h4>
                  <p className="text-slate-600">Práctica quirúrgica en instalaciones de primer nivel</p>
                </div>
              </div>
            </div>
            
            <div id="filosofia" className="bg-slate-50 rounded-2xl p-6 border-l-4 border-[#005EB8]">
              <h4 className="font-semibold text-slate-900 mb-2">Filosofía médica</h4>
              <p className="text-slate-600 italic">
                "Mi compromiso es brindar una atención personalizada, utilizando técnicas mínimamente invasivas que permitan una recuperación más rápida y segura para mis pacientes."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: <img src="https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/czjx85ru_image.png" alt="Colecistectomía" className="w-full h-full object-contain" />,
      title: "Colecistectomía laparoscópica",
      description: "Extirpación de vesícula biliar mediante técnica mínimamente invasiva con recuperación rápida.",
    },
    {
      icon: <img src="https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/eim9vxye_image.png" alt="Apendicectomía" className="w-full h-full object-contain" />,
      title: "Apendicectomía",
      description: "Cirugía para extirpar el apéndice, ya sea de forma programada o de urgencia.",
    },
    {
      icon: <img src="https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/2loz7lad_image.png" alt="Hernioplastia inguinal" className="w-full h-full object-contain" />,
      title: "Hernioplastia inguinal",
      description: "Reparación quirúrgica de hernias inguinales con técnicas modernas y mallas de última generación.",
    },
    {
      icon: <img src="https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/2loz7lad_image.png" alt="Hernioplastia umbilical" className="w-full h-full object-contain" />,
      title: "Hernioplastia umbilical",
      description: "Corrección de hernias umbilicales con procedimientos seguros y eficaces.",
    },
    {
      icon: <img src="https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/u8j7ptdv_image.png" alt="Cirugía de cuello" className="w-full h-full object-contain" />,
      title: "Cirugía de cuello",
      description: "Procedimientos quirúrgicos especializados en patologías de la región cervical.",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Cirugía laparoscópica",
      description: "Intervenciones con incisiones mínimas, menor dolor postoperatorio y pronta recuperación.",
    },
  ];

  return (
    <section id="servicios" data-testid="services-section" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-[#005EB8] font-semibold mb-4">
            Servicios
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Procedimientos Quirúrgicos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ofrezco una amplia gama de servicios quirúrgicos con las técnicas más avanzadas y enfoque mínimamente invasivo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              data-testid={`service-card-${index}`}
              className="service-card bg-white p-8 rounded-2xl border border-slate-100"
            >
              <div className="w-16 h-16 bg-[#E0F2FE] rounded-2xl flex items-center justify-center text-[#005EB8] mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Conditions Section
const ConditionsSection = () => {
  const conditions = [
    {
      title: "Vesícula biliar",
      description: "Diagnóstico y tratamiento de cálculos biliares, colecistitis y otras patologías de la vesícula.",
      symptoms: ["Dolor abdominal", "Náuseas", "Intolerancia a grasas"],
    },
    {
      title: "Apendicitis",
      description: "Atención urgente y programada para la inflamación del apéndice con técnicas laparoscópicas.",
      symptoms: ["Dolor intenso", "Fiebre", "Náuseas y vómito"],
    },
    {
      title: "Hernias",
      description: "Tratamiento de hernias inguinales, umbilicales, incisionales y de pared abdominal.",
      symptoms: ["Bulto visible", "Molestia al esfuerzo", "Dolor localizado"],
    },
    {
      title: "Patología quirúrgica de cuello",
      description: "Evaluación y tratamiento de nódulos tiroideos, quistes y otras afecciones cervicales.",
      symptoms: ["Masa en cuello", "Dificultad para tragar", "Cambios en la voz"],
    },
  ];

  return (
    <section id="padecimientos" data-testid="conditions-section" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-[#005EB8] font-semibold mb-4">
            Padecimientos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Condiciones que Tratamos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Atención especializada para diversas patologías quirúrgicas con diagnóstico preciso y tratamiento efectivo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {conditions.map((condition, index) => (
            <div
              key={index}
              data-testid={`condition-card-${index}`}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-[#005EB8]/20 transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">{condition.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{condition.description}</p>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Síntomas comunes:</p>
                <div className="flex flex-wrap gap-2">
                  {condition.symptoms.map((symptom, sIndex) => (
                    <span
                      key={sIndex}
                      className="bg-white px-4 py-2 rounded-full text-sm text-slate-600 border border-slate-200"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Cirugía mínimamente invasiva",
      description: "Procedimientos con incisiones pequeñas para menor dolor y cicatrices.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Recuperación rápida",
      description: "Técnicas avanzadas que permiten una pronta reincorporación a sus actividades.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Atención personalizada",
      description: "Cada paciente recibe un plan de tratamiento individualizado.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Seguimiento postoperatorio",
      description: "Acompañamiento continuo durante todo su proceso de recuperación.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Hospital de primer nivel",
      description: "Procedimientos en Hospital San Ángel Inn con tecnología de punta.",
    },
  ];

  return (
    <section data-testid="benefits-section" className="py-20 md:py-32 bg-[#005EB8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-white/80 font-semibold mb-4">
            ¿Por qué elegirnos?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Beneficios de Nuestra Atención
          </h2>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-testid={`benefit-card-${index}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Patients Section with FAQ
const PatientsSection = () => {
  const patientInfo = [
    {
      title: "Preparación preoperatoria",
      items: [
        "Ayuno de 8 horas antes de la cirugía",
        "Suspender medicamentos según indicación médica",
        "Estudios preoperatorios completos",
        "Baño la noche anterior con jabón neutro",
        "Usar ropa cómoda el día de la cirugía",
      ],
    },
    {
      title: "Cuidados postoperatorios",
      items: [
        "Reposo relativo según el procedimiento",
        "Tomar medicamentos según prescripción",
        "Cuidado de heridas quirúrgicas",
        "Dieta progresiva según indicaciones",
        "Acudir a citas de seguimiento",
      ],
    },
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo dura la recuperación después de una cirugía laparoscópica?",
      answer: "La recuperación varía según el procedimiento, pero generalmente los pacientes pueden retomar actividades ligeras en 1-2 semanas y actividades normales en 2-4 semanas.",
    },
    {
      question: "¿Se requiere hospitalización?",
      answer: "La mayoría de las cirugías laparoscópicas son ambulatorias o requieren hospitalización de 24 horas. Esto depende del tipo de procedimiento y las condiciones del paciente.",
    },
    {
      question: "¿Qué tipo de anestesia se utiliza?",
      answer: "Generalmente se utiliza anestesia general para procedimientos laparoscópicos, aunque algunos procedimientos menores pueden realizarse con anestesia regional o local.",
    },
    {
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer: "Aceptamos pago en efectivo, tarjetas de crédito y débito. También trabajamos con diversas aseguradoras. Consulte disponibilidad de su seguro de gastos médicos.",
    },
    {
      question: "¿Cómo puedo agendar una cita?",
      answer: "Puede agendar su cita a través de WhatsApp al 5537171796, llamando directamente al mismo número o enviando un correo a dr.rodriguezromo@gmail.com",
    },
  ];

  return (
    <section id="pacientes" data-testid="patients-section" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-[#005EB8] font-semibold mb-4">
            Para Pacientes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Información Importante
          </h2>
        </div>
        
        {/* Patient Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {patientInfo.map((info, index) => (
            <div
              key={index}
              data-testid={`patient-info-${index}`}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-6">{info.title}</h3>
              <ul className="space-y-4">
                {info.items.map((item, iIndex) => (
                  <li key={iIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#005EB8] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
            Preguntas Frecuentes
          </h3>
          <Accordion type="single" collapsible className="faq-accordion space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                data-testid={`faq-item-${index}`}
                className="bg-white rounded-xl border border-slate-100 px-6 overflow-hidden"
              >
                <AccordionTrigger className="py-5 text-left font-medium text-slate-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

// Payment Methods Section
const PaymentSection = () => {
  return (
    <section data-testid="payment-section" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-[#005EB8] font-semibold mb-4">
            Métodos de Pago
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Aceptamos Todos los Métodos de Pago
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Para tu comodidad, trabajamos con múltiples formas de pago y las principales aseguradoras.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div data-testid="payment-transfer" className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-[#005EB8]/20 transition-all">
            <div className="w-14 h-14 bg-[#E0F2FE] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Transferencias Bancarias</h4>
          </div>
          <div data-testid="payment-credit" className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-[#005EB8]/20 transition-all">
            <div className="w-14 h-14 bg-[#E0F2FE] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Tarjetas de Crédito</h4>
          </div>
          <div data-testid="payment-debit" className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-[#005EB8]/20 transition-all">
            <div className="w-14 h-14 bg-[#E0F2FE] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Tarjetas de Débito</h4>
          </div>
          <div data-testid="payment-cash" className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-[#005EB8]/20 transition-all">
            <div className="w-14 h-14 bg-[#E0F2FE] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Pagos en Efectivo</h4>
          </div>
        </div>

        {/* Credit Card Logos */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-slate-900 text-center mb-8">Tarjetas Aceptadas</h3>
          <div className="flex justify-center items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/5ogepktd_image.png" 
              alt="Visa, Mastercard, American Express"
              className="max-w-md w-full h-auto"
              data-testid="card-logos"
            />
          </div>
        </div>

        {/* Insurance Companies */}
        <div>
          <h3 className="text-xl font-semibold text-slate-900 text-center mb-8">Aseguradoras con las que Trabajamos</h3>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <img 
              src="https://customer-assets.emergentagent.com/job_dr-rodriguez-romo/artifacts/xjfpgyte_image.png" 
              alt="Aseguradoras: AXA, MetLife, Inbursa, Bupa, Seguros Atlas, Allianz, GNP, Banorte, Mapfre, Zurich, Multiva, Plan Seguro, Seguros Monterrey"
              className="w-full h-auto max-w-4xl mx-auto"
              data-testid="insurance-logos"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section data-testid="cta-section" className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Agenda tu consulta hoy mismo
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Estoy aquí para ayudarte. Contáctame para una valoración personalizada y resolver todas tus dudas.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openWhatsApp()}
            data-testid="cta-whatsapp-btn"
            className="btn-whatsapp text-lg px-10"
          >
            <MessageCircle className="w-6 h-6" />
            WhatsApp
          </button>
          <button
            onClick={callPhone}
            data-testid="cta-call-btn"
            className="btn-primary text-lg px-10"
          >
            <Phone className="w-6 h-6" />
            Llamar ahora
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hola Dr. Rodríguez Romo, mi nombre es ${formData.name}.\n\n${formData.message}\n\nMi correo: ${formData.email}\nMi teléfono: ${formData.phone}`;
    openWhatsApp(message);
    toast.success("Redirigiendo a WhatsApp...");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" data-testid="contact-section" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-[#005EB8] font-semibold mb-4">
            Contacto
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Estoy para Ayudarte
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Envíame un mensaje</h3>
            <form onSubmit={handleSubmit} className="contact-form space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="contact-name-input"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    data-testid="contact-phone-input"
                    placeholder="Tu teléfono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="contact-email-input"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  data-testid="contact-message-input"
                  placeholder="¿En qué puedo ayudarte?"
                />
              </div>
              <button
                type="submit"
                data-testid="contact-submit-btn"
                className="btn-primary w-full justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar por WhatsApp
              </button>
            </form>
          </div>
          
          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="space-y-5">
                <a
                  href="https://maps.google.com/?q=Hospital+San+Angel+Inn+Satelite"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-location"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#005EB8] transition-colors">
                    <MapPin className="w-6 h-6 text-[#005EB8] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Hospital San Ángel Inn Satélite</p>
                    <p className="text-slate-600 text-sm">Cd. Satélite, Naucalpan de Juárez, Estado de México</p>
                  </div>
                </a>
                
                <a
                  href="tel:+525537171796"
                  data-testid="contact-phone"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#005EB8] transition-colors">
                    <Phone className="w-6 h-6 text-[#005EB8] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Teléfono / WhatsApp</p>
                    <p className="text-slate-600">55 3717 1796</p>
                  </div>
                </a>
                
                <a
                  href="mailto:dr.rodriguezromo@gmail.com"
                  data-testid="contact-email"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#005EB8] transition-colors">
                    <Mail className="w-6 h-6 text-[#005EB8] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Correo electrónico</p>
                    <p className="text-slate-600">dr.rodriguezromo@gmail.com</p>
                  </div>
                </a>
                
                <a
                  href="https://www.instagram.com/dr.rodriguezromo"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-instagram"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#005EB8] transition-colors">
                    <Instagram className="w-6 h-6 text-[#005EB8] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Instagram</p>
                    <p className="text-slate-600">@dr.rodriguezromo</p>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="map-container h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.5504747947!2d-99.23166768509469!3d19.50937398681989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21de51ac7c0ab%3A0x8e2973c4d4e4c19!2sHospital%20San%20%C3%81ngel%20Inn%20Sat%C3%A9lite!5e0!3m2!1ses-419!2smx!4v1706562000000!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Hospital San Ángel Inn Satélite"
                data-testid="google-map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Info */}
          <div>
            <img src={ASSETS.logo} alt="Logo" className="h-14 mb-4 brightness-0 invert" />
            <p className="text-slate-400 leading-relaxed">
              Dr. Luis Enrique Rodríguez Romo Merino<br />
              Especialista en Cirugía General<br />
              Hospital San Ángel Inn Satélite
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-slate-400 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#sobre-mi" className="text-slate-400 hover:text-white transition-colors">Sobre mí</a></li>
              <li><a href="#servicios" className="text-slate-400 hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#contacto" className="text-slate-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                55 3717 1796
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                dr.rodriguezromo@gmail.com
              </p>
              <a
                href="https://www.instagram.com/dr.rodriguezromo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @dr.rodriguezromo
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Dr. Luis Enrique Rodríguez Romo Merino. Todos los derechos reservados.
          </p>
          <a
            href="#"
            data-testid="privacy-policy-link"
            className="text-slate-500 text-sm hover:text-white transition-colors"
          >
            Aviso de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Floating Button
const WhatsAppFloat = () => {
  return (
    <button
      onClick={() => openWhatsApp()}
      data-testid="whatsapp-float-btn"
      className="whatsapp-float animate-pulse-glow"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </button>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ConditionsSection />
        <BenefitsSection />
        <PatientsSection />
        <PaymentSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
