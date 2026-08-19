"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Code,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Moon,
  Sun,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const missing = [];
      if (!serviceId) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
      if (!templateId) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
      if (!publicKey) missing.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
      setErrorMessage(`Email service misconfigured. Missing environment variables: ${missing.join(", ")}. Please configure them in your .env.local file.`);
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage("Failed to send message: Received non-200 status from EmailJS.");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form via EmailJS:", error);
      setErrorMessage("Failed to send message. Please check network connection or try again later.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About me", icon: <User size={18} /> },
    { id: "experience", label: "Work Experience", icon: <Briefcase size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  const skillCategories = [
    {
      category: "Frontend",
      items: [
        "Angular (v15+ / Signals)",
        "Ionic",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3 / SCSS",
        "Angular Material",
        "RxJS",
        "NgRx",
        "Tailwind CSS",
        "Bootstrap",
        "React",
        "Next.js",
        "WebSocket",
        "SSR",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "MongoDB"],
    },
    {
      category: "State Management & Performance",
      items: ["RxJS", "Signals", "Lazy Loading", "Reactive Forms", "NgRx"],
    },
    {
      category: "Tools & Others",
      items: [
        "Git",
        "Bitbucket",
        "Jira",
        "Postman",
        "Agile/Scrum",
        "VS Code",
      ],
    },
    {
      category: "Languages",
      items: ["English", "Hindi", "Urdu"],
    },
  ];

  const experiences = [
    {
      role: "Frontend Developer",
      company: "Brainbots Digital PVT LTD.",
      period: "01/2025 – Present | Mumbai",
      project: "NexChat – AI Conversational CRM Platform",
      demo: "https://thenexchat.com/",
      github: "https://github.com/abdulhashim786",
      image: "/image.png?height=200&width=350",
      environment: ["Angular", "TypeScript", "HTML", "Material", "Signals", "RxJS"],
      description:
        "Developed an AI-powered omnichannel CRM platform that helps businesses automate customer conversations across WhatsApp and Instagram. The platform captures, qualifies, and manages leads, automates follow-ups, and enables sales teams to track and convert leads through a centralized dashboard.",
      responsibilities: [
        "Developed responsive and reusable UI components using Angular, TypeScript, SCSS, and Angular Material, improving development speed and consistency across the platform.",
        "Built real-time chat, unified inbox, and CRM dashboards for WhatsApp & Instagram, enabling sales teams to manage multi-channel conversations from a single interface.",
        "Implemented Reactive Forms, RxJS operators, Signals, and lazy loading, resulting in smoother performance and reduced initial load time.",
        "Developed AI chat templates, campaign, and automated follow-up modules that helped businesses qualify and convert leads more efficiently.",
        "Collaborated in Agile (Scrum) environment using Git, Bitbucket, and Jira, contributing to consistent sprint deliveries.",
      ],
      highlights: [
        "Unified Multi-Channel Inbox (WhatsApp + Instagram)",
        "Real-time WebSocket Chat & AI Qualification",
        "Automated Follow-ups & Lead Management Dashboard",
      ]
    },
    {
      role: "Frontend Developer",
      company: "Brainbots Digital PVT LTD.",
      period: "10/2022 – 01/2025 | Mumbai",
      project: "Shopyglam – Social E-commerce Platform",
      demo: "https://myshopyglam.com/",
      github: "https://github.com/abdulhashim786",
      image: "/unnamed.webp?height=100&width=350",
      environment: ["Angular", "Ionic", "TypeScript", "Signals", "RxJS", "React", "Next.js", "Tailwind CSS"],
      description:
        "Shopyglam is a social e-commerce platform that enables sellers and influencers to create online stores, manage product catalogs, process customer orders, and promote products through social media. The platform provides a seamless shopping experience across web and mobile applications with secure authentication, payment integration, and responsive user interfaces.",
      responsibilities: [
        "Developed responsive web & mobile applications using Angular, Ionic, and TypeScript, implementing routing, lazy loading, Reactive Forms, form validation, and RxJS to improve application performance.",
        "Built core modules (Shop Setup, Product Catalog, Orders, Influencer Dashboard) with reusable components & Tailwind CSS.",
        "Integrated REST APIs for auth, payments, products & image uploads.",
        "Contributed to migration from Angular + Ionic to React + Next.js.",
      ],
      highlights: [
        "Cross-platform Web & Ionic Mobile Applications",
        "Shop Setup, Product Catalog & Influencer Dashboards",
        "Secure Payment Gateways & REST API Integration",
      ]
    },
    {
      role: "Full Stack Developer (Project)",
      company: "Personal / Academic Project",
      period: "02/2022 – 2022 | Mumbai",
      project: "Furniture Shop E-commerce Application",
      demo: "#",
      github: "https://github.com/abdulhashim786",
      image: "/placeholder.svg?height=200&width=350",
      environment: ["Node.js", "Express.js", "MongoDB", "REST APIs", "HTML Parser"],
      description:
        "Developed a Furniture Shop E-commerce application allowing users to browse furniture products, search items, manage shopping carts, and place orders. Implemented RESTful APIs for product and user management and used HTML Parser for product data extraction and processing.",
      responsibilities: [
        "Designed and implemented RESTful API endpoints for user authentication, product catalogs, and order placement.",
        "Built interactive cart management, product filtering, and search engine functionality.",
        "Integrated HTML Parser module for processing and extracting web data.",
      ],
      highlights: [
        "RESTful API Architecture for Products & User Auth",
        "Cart Management & Checkout Pipeline",
        "HTML Parsing & Product Data Processing",
      ]
    },
  ];

  const education = [
    {
      period: "2022",
      title: "BSC IT (Bachelor of Science in Information Technology)",
      institution: "Shailendra Education Society, Mumbai University",
      description:
        "Graduated with a degree in Information Technology.",
    },
    {
      period: "02/2019",
      title: "HSC (Commerce)",
      institution: "Maharashtra State Board of Mumbai",
      description: "Higher Secondary Certificate in Commerce.",
    },
    {
      period: "03/2017",
      title: "SSC",
      institution: "Maharashtra State Board of Mumbai",
      description: "Secondary School Certificate.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold">
              AH
            </div>
            <span className="font-bold text-xl hidden sm:block">
              Abdul Hashim
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-md transition-colors ${activeSection === item.id
                  ? "bg-gray-100 dark:bg-gray-800 text-teal-500 dark:text-teal-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            <Button
              className="hidden md:flex bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView()
              }
            >
              Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#0f172a] pt-16"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="order-2 md:order-1 relative z-20"
              >
                <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                  Frontend Developer
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Hello, I'm{" "}
                  <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                    Abdul Hashim
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Frontend Developer with 4 years of experience building scalable web and mobile applications using Angular, Ionic, TypeScript, and RxJS. Specialized in AI-powered CRM platforms and social e-commerce solutions.
                </p>
                <div className="flex flex-wrap gap-4 relative z-30">
                  <Button
                    className="cursor-pointer bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
                    onClick={() =>
                      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View Experience <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <a href="/abdulhashim_resume.pdf" download="Abdul_Hashim_Resume.pdf">
                    <Button
                      variant="outline"
                      className="cursor-pointer border-teal-500 text-teal-500 hover:bg-teal-500/10 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400/10"
                    >
                      Download CV
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    className="cursor-pointer border-gray-300 dark:border-gray-700"
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Contact Me
                  </Button>
                </div>

                <div className="mt-12 flex gap-4 relative z-30">
                  <a
                    href="https://github.com/abdulhashim786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abdul-hashim-104286219"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:abdulhashimchoudhary67@gmail.com"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-1 md:order-2 flex justify-center"
              >
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 blur-3xl opacity-20 absolute -inset-4 pointer-events-none"></div>
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-gray-200 dark:border-gray-800 overflow-hidden relative z-10">
                    <img
                      src="/Gemini_Generated_Image_7oz2zq7oz2zq7oz21.png?height=400&width=400"
                      alt="Abdul Hashim"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                About me
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Get to know me better</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Professional Summary</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Frontend Developer with 4 years of experience building scalable web and mobile applications using Angular, Ionic, TypeScript, and RxJS. Specialized in AI-powered CRM platforms and social e-commerce solutions. Strong in creating reusable component libraries, integrating REST APIs, and delivering responsive, high-performance UIs in Agile environments. Hands-on with React and full-stack fundamentals (Node.js, Express, MongoDB).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="text-3xl font-bold text-teal-500 dark:text-teal-400 mb-1">
                    4 Years
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Frontend Experience
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="text-3xl font-bold text-indigo-500 dark:text-indigo-400 mb-1">
                    4+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Production Platforms
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">
                    Mumbai
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Location (India)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Work Experience
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Professional Work Experience</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Detailed history of my engineering contributions, project impact, and key responsibilities.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                          <p className="text-lg font-medium text-teal-600 dark:text-teal-400">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="w-fit border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 text-xs">
                          {exp.period}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700/50">
                        <div>
                          <span className="text-xs uppercase font-semibold tracking-wider text-gray-500 dark:text-gray-400 block mb-1">Project Name</span>
                          <span className="text-base font-bold text-gray-900 dark:text-gray-100">{exp.project}</span>
                        </div>
                        <div className="flex gap-2">
                          {exp.github && (
                            <a
                              href={exp.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 transition-colors text-xs font-medium flex items-center gap-1.5"
                            >
                              <Github size={14} /> Code
                            </a>
                          )}
                          {exp.demo && exp.demo !== "#" && (
                            <a
                              href={exp.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors text-xs font-medium flex items-center gap-1.5"
                            >
                              <ExternalLink size={14} /> Live Demo
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.highlights && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Key Product Highlights:</h4>
                          <div className="grid sm:grid-cols-3 gap-2">
                            {exp.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30 text-xs text-teal-800 dark:text-teal-300 font-medium">
                                ✓ {h}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Roles & Responsibilities:</h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm">
                              <span className="text-teal-500 dark:text-teal-400 mt-0.5">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-2">Environment & Tools:</span>
                        {exp.environment.map((tech) => (
                          <Badge key={tech} className="bg-gray-100 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 border-0 text-xs font-normal">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="py-20 bg-gray-100 dark:bg-gray-900/50"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Education
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                My academic background
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                My educational journey and professional training.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 mb-12 last:mb-0"
                >
                  <div className="hidden sm:block pt-1">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                    </div>
                    {index !== education.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 ml-6 mt-2"></div>
                    )}
                  </div>

                  <Card className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
                        {item.period}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {item.institution}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Contact
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Let's talk</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Interested in working together or have any questions?
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 bg-gradient-to-br from-teal-500 to-indigo-500 p-8 text-white">
                    <h3 className="text-2xl font-semibold mb-6">
                      Contact information
                    </h3>
                    <p className="mb-8 opacity-90">
                      Fill out the form and I'll get back to you as soon as
                      possible.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/20">
                          <Mail size={20} />
                        </div>
                        <span>abdulhashimchoudhary67@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/20">
                          <Github size={20} />
                        </div>
                        <span>https://github.com/abdulhashim786</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/20">
                          <Linkedin size={20} />
                        </div>
                        <span>https://www.linkedin.com/in/abdul-hashim-104286219</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/20">
                          <Briefcase size={20} />
                        </div>
                        <span>+91-7028-6950-46</span>
                      </div>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 opacity-10">
                      <Code size={180} />
                    </div>
                  </div>

                  <div className="md:col-span-3 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0 transition-all transform active:scale-95"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={18} />
                            Sending...
                          </span>
                        ) : (
                          "Send message"
                        )}
                      </Button>

                      {submitStatus === "success" && (
                        <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center gap-3">
                          <CheckCircle size={20} />
                          <span>Message sent successfully! I'll get back to you soon.</span>
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-3">
                          <AlertCircle size={20} className="flex-shrink-0" />
                          <span>{errorMessage || "Failed to send message. Please try again later."}</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                AH
              </div>
              <span className="font-bold">Abdul Hashim</span>
            </div>

            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Abdul Hashim. All rights reserved.
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/abdulhashim786"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/abdul-hashim-104286219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:abdulhashimchoudhary67@gmail.com"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
