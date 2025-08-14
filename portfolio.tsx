"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Code,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 300

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ]

  const skills = [
    { name: "Angular", level: 85 },
    { name: "Ionic", level: 80 },
    { name: "TypeScript", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "HTML5", level: 90 },
    { name: "CSS/SCSS", level: 85 },
    { name: "React", level: 70 },
    { name: "Next.js", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "MongoDB", level: 65 },
    { name: "Git", level: 80 },
  ]

  const projects = [
    {
      title: "Shopyglam",
      description: "A social e-commerce platform connecting sellers and influencers for seamless online marketing on social media like WhatsApp. Offers shop setup, secure transactions, and fashion product access.",
      technologies: ["Angular", "Ionic", "TypeScript", "Angular Material", "SCSS"],
      image: "/placeholder.svg?height=200&width=350",
      github: "#",
      demo: "#",
    },
    {
      title: "Shopyglam (Next.js Version)",
      description: "The same social e-commerce platform rebuilt with Next.js for improved performance and SEO.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Ionic"],
      image: "/placeholder.svg?height=200&width=350",
      github: "#",
      demo: "#",
    }
  ]

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 font-sans">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#121212]/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Abdul Hashim
          </span>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-4"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeSection === item.id ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-8 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-50">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center gap-2 p-2 rounded-full transition-all ${
              activeSection === item.id
                ? "bg-gray-800 text-blue-400 shadow-lg shadow-blue-500/20"
                : "hover:bg-gray-800/50"
            }`}
            title={item.label}
          >
            {item.icon}
            <span
              className={`${
                activeSection === item.id ? "opacity-100 w-auto" : "opacity-0 w-0"
              } overflow-hidden transition-all duration-300`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 md:pt-0">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                Angular Developer
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Abdul Hashim
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Angular developer with 3 years of experience in software analysis, design, and development using Angular, Ionic, React, TypeScript, JavaScript, HTML, SCSS, Tailwind CSS, and Material UI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('projects')?.scrollIntoView()}>
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
                  Contact Me
                </Button>
              </div>
            </motion.div>

            <div className="mt-12 flex gap-4">
              <a href="https://github.com/abdulhashim786" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/abdul-hashim-104286219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <User size={24} className="text-blue-400" />
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 mb-6">
                 I am an Angular Developer with over three years of professional experience in software analysis, design, and development, specializing in Angular, Ionic, and front-end technologies. My expertise includes building scalable, responsive, and user-friendly web and mobile applications using Angular, TypeScript, HTML, CSS, Tailwind, and Material UI, along with backend knowledge in Node.js, Express, and MongoDB. I have worked extensively with RESTful API integrations, third-party services, and secure payment gateways, ensuring seamless functionality and performance optimization. I am well-versed in Agile methodologies, Git, and Bitbucket, with a strong focus on delivering high-quality, maintainable code through peer code reviews and collaboration with cross-functional teams.
                </p>
                <p className="text-gray-300 mb-6">
                 Currently working at Brainbots Digital PVT LTD on the Shopyglam project, I have been responsible for client communication, feature design in coordination with the architect, creating project flows, and developing complex interfaces for e-commerce and social commerce platforms. My role involves mapping business requirements into technical solutions, implementing dynamic and reactive pages, integrating API-driven functionalities, and ensuring application performance across devices. I also have experience mentoring interns, improving development efficiency, and contributing to innovative product features that enhance user engagement and business growth.
                </p>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Download CV
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">My Skills</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Briefcase size={24} className="text-blue-400" />
              My Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover border-b border-gray-800"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="text-sm flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Github size={16} /> Code
                      </a>
                      <a
                        href={project.demo}
                        className="text-sm flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink size={16} /> Demo
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap size={24} className="text-blue-400" />
              Education
            </h2>

            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-gray-800 pb-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="mb-1 text-blue-400">2022</div>
                <h3 className="text-xl font-semibold">Bachelor of Science in Information Technology</h3>
                <p className="text-gray-400">Shailendra Education Society, Mumbai University</p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800 pb-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
                <div className="mb-1 text-purple-400">2019</div>
                <h3 className="text-xl font-semibold">Higher Secondary Certificate (HSC)</h3>
                <p className="text-gray-400">Maharashtra State Board of Mumbai (Commerce)</p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500" />
                <div className="mb-1 text-green-400">2017</div>
                <h3 className="text-xl font-semibold">Secondary School Certificate (SSC)</h3>
                <p className="text-gray-400">Maharashtra State Board of Mumbai</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Mail size={24} className="text-blue-400" />
              Contact
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 mb-6">
                  Interested in working together or have any questions? Feel free to contact me through the form or via my social media.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-400" />
                    <span>abdulhashimchoudhary@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="text-blue-400" />
                    <a href="https://github.com/abdulhashim786" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    https://github.com/abdulhashim786
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="text-blue-400" />
                    <a href="https://www.linkedin.com/in/abdul-hashim-104286219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    https://www.linkedin.com/in/abdul-hashim-104286219
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="text-blue-400" />
                    <span>+91-7028-6950-46</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="text-blue-400" />
                    <span>Vasai, Mumbai 400102</span>
                  </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Abdul Hashim. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}