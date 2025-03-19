"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, FileText, ClipboardList, Menu, X, ChevronDown } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar al cargar
    checkIfMobile()

    // Verificar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Función para scroll suave al título
  const scrollToTitle = () => {
    const titleSection = document.getElementById("title-section")
    if (titleSection) {
      titleSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Variantes para la animación de typewriter
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  }

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const text = "Corre por una causa solidaria."

  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* Barra de progreso */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#52B046] origin-left z-50" style={{ scaleX }} />

      {/* Top Section with Full Screen Height */}
      <div className="relative h-screen flex flex-col justify-between">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mountain background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Navigation */}
        <header className="relative z-20 flex justify-between items-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <h1 className="text-2xl font-bold tracking-wider text-white">
              <span className="block text-3xl">RUN</span>
              <span className="text-sm tracking-widest">ALTAS CUMBRES</span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <ul className="flex space-x-6 text-xs uppercase tracking-wider text-white">
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  Inscripción
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  La Carrera
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  Info Importante
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden z-30 relative text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>

          {/* Mobile Menu */}
          <motion.div
            className={`fixed inset-0 bg-black/95 z-20 flex items-center justify-center md:hidden ${isMenuOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0, y: "-100%" }}
            animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-8 text-center text-lg uppercase tracking-wider text-white">
              <li>
                <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition-colors">
                  Inscripción
                </Link>
              </li>
              <li>
                <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition-colors">
                  La Carrera
                </Link>
              </li>
              <li>
                <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition-colors">
                  Info Importante
                </Link>
              </li>
              <li>
                <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>
        </header>

        {/* Center Content - Typewriter Animation */}
        <div className="relative z-10 flex-grow flex items-center justify-center">
          <motion.h2
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-white text-3xl md:text-5xl font-light overflow-hidden"
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={`char-${index}`}
                variants={letter}
                className={char === " " ? "inline-block mr-2" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative z-10 pb-8 flex justify-center"
        >
          <button
            onClick={scrollToTitle}
            className="text-white flex flex-col items-center cursor-pointer hover:text-gray-300 transition-colors"
          >
            <span className="text-xs uppercase tracking-wider mb-2">Descubre más</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ChevronDown size={24} />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Black Section with Title */}
      <div id="title-section" className="bg-black py-12 md:py-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center px-4"
        >
          <h2 className="text-3xl md:text-6xl font-bold italic uppercase tracking-wide mb-4 text-white">
            La Carrera de los
            <br />
            Verdaderos Titanes
          </h2>

          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-xs mb-8 text-gray-300">
            RUN Altas Cumbres es la carrera de running de montaña que te propone superarte disfrutando de un recorrido
            único en Córdoba Argentina.
          </motion.p>
        </motion.div>

        {/* Video Embed */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-10 max-w-xl mx-auto aspect-video px-4 pb-8"
        >
          <div className="bg-black/50 absolute inset-0 mx-4 flex items-center justify-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute bg-red-600 w-14 h-10 rounded-md"></div>
              <div className="absolute text-white z-10 text-xl">▶</div>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=700"
            alt="Video thumbnail"
            width={700}
            height={400}
            className="w-full h-full object-cover mx-auto"
          />
          <div className="absolute bottom-10 left-6 bg-black/70 text-xs p-1 text-white">
            RUN ALTAS CUMBRES RESUMEN 2024
          </div>
        </motion.div>
      </div>

      {/* White Section with Logo and Text */}
      <div className="bg-white py-12 md:py-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between px-4 md:px-16 max-w-6xl mx-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-48 h-48 mb-8 md:mb-0 flex justify-center"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20negro-nFe7Pcq8rEGTkJLosR0zYEFp4kBnjN.png"
                alt="Rotaract Logo"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:ml-8 text-sm italic max-w-md text-center md:text-left"
            >
              <p className="mb-2">Una aventura de montaña.</p>
              <p className="mb-2">Pensada por runners para runners.</p>
              <p className="mb-2">Desde lo más profundo del corazón de la montaña RunAC llega para desafiarte.</p>
              <p className="mb-2">Una aventura única.</p>
              <p className="mb-2">
                Empieza mucho antes del conteo previo al largar. Empieza cuando lo imaginas, cuando entrenás para llegar
                a ella, cuando la pensás en tu mente.
              </p>
              <p className="mb-2">Cuando la visualizás en esa meta, una difícil pero no imposible.</p>
              <p>Corré Run Altas Cumbres, corré sin límites. La aventura recién empieza...</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="relative py-16 bg-gray-100">
        <Image src="/placeholder.svg?height=600&width=1200" alt="Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={`relative z-10 ${isMobile ? "flex flex-col items-center space-y-8" : "flex justify-center space-x-8 md:space-x-24"}`}
        >
          <motion.div variants={fadeInUp}>
            <Link href="#" className="flex flex-col items-center text-xs">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2 hover:bg-gray-100 transition-colors">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <span className="uppercase tracking-wider text-white font-semibold">Cronograma</span>
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link href="#" className="flex flex-col items-center text-xs">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2 hover:bg-gray-100 transition-colors">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <span className="uppercase tracking-wider text-white font-semibold">Inscripción</span>
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link href="#" className="flex flex-col items-center text-xs">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2 hover:bg-gray-100 transition-colors">
                <ClipboardList className="w-6 h-6 text-black" />
              </div>
              <span className="uppercase tracking-wider text-white font-semibold">Reglamento</span>
            </Link>
          </motion.div>
        </motion.section>
      </div>

      {/* Videos Categories Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Mobile: Titles stacked */}
          <div className="md:hidden">
            <h3 className="text-xl font-bold mb-6 text-center">RUN+VAC</h3>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative aspect-video mb-10"
            >
              <div className="bg-black/50 absolute inset-0 flex items-center justify-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute bg-red-600 w-10 h-8 rounded-md"></div>
                  <div className="absolute text-white z-10">▶</div>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Video thumbnail"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-xs p-1 text-white">
                Vuelta Altas Cumbres con VAC
              </div>
            </motion.div>

            <h3 className="text-xl font-bold mb-6 text-center">RUN+VAC+NADO</h3>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative aspect-video"
            >
              <div className="bg-black/50 absolute inset-0 flex items-center justify-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute bg-red-600 w-10 h-8 rounded-md"></div>
                  <div className="absolute text-white z-10">▶</div>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Video thumbnail"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-xs p-1 text-white">
                Experiencia Altas Cumbres - Nado 2023
              </div>
            </motion.div>
          </div>

          {/* Desktop: Side by side */}
          <div className="hidden md:block">
            <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
              <h3 className="text-xl font-bold">RUN+VAC</h3>
              <h3 className="text-xl font-bold">RUN+VAC+NADO</h3>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {/* Video 1 */}
              <motion.div variants={fadeInUp} className="relative aspect-video">
                <div className="bg-black/50 absolute inset-0 flex items-center justify-center">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute bg-red-600 w-10 h-8 rounded-md"></div>
                    <div className="absolute text-white z-10">▶</div>
                  </div>
                </div>
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Video thumbnail"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-xs p-1 text-white">
                  Vuelta Altas Cumbres con VAC
                </div>
              </motion.div>

              {/* Video 2 */}
              <motion.div variants={fadeInUp} className="relative aspect-video">
                <div className="bg-black/50 absolute inset-0 flex items-center justify-center">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute bg-red-600 w-10 h-8 rounded-md"></div>
                    <div className="absolute text-white z-10">▶</div>
                  </div>
                </div>
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Video thumbnail"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-xs p-1 text-white">
                  Experiencia Altas Cumbres - Nado 2023
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Ver todas las categorías */}
          <div className="text-center mt-12 md:mt-16">
            <h3 className="text-xl font-bold uppercase mb-6">Ver todas las categorías</h3>
            <button className="bg-black text-white px-4 py-2 text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Ver más
            </button>
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="bg-white py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold uppercase mb-10 text-center">Nos apoyan</h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center"
              >
                <Image
                  src={`/placeholder.svg?height=60&width=100&text=Sponsor${i}`}
                  alt={`Sponsor ${i}`}
                  width={100}
                  height={60}
                  className="w-full h-auto"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h1 className="text-2xl font-bold tracking-wider">
                <span className="block text-3xl">RUN</span>
                <span className="text-sm tracking-widest">ALTAS CUMBRES</span>
              </h1>
              <p className="text-xs mt-2">COPYRIGHT © 2025 RUN ALTAS CUMBRES. TODOS LOS DERECHOS RESERVADOS.</p>
            </div>

            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
              <div>
                <h4 className="text-sm font-bold uppercase mb-2 text-center md:text-left">Menú</h4>
                <ul className="text-xs space-y-1 text-center md:text-left">
                  <li>
                    <Link href="#" className="hover:text-gray-300 transition-colors">
                      Info Importante
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300 transition-colors">
                      Inscripción
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300 transition-colors">
                      Reglamento 2025
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300 transition-colors">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase mb-2 text-center md:text-left">Más info</h4>
                <ul className="text-xs space-y-1 text-center md:text-left">
                  <li>
                    <Link href="#" className="hover:text-gray-300 transition-colors">
                      Cómo inscribirse
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300 transition-colors">
                      Galería
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="fixed bottom-6 right-6 z-20 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </motion.div>
      </footer>
    </main>
  )
}

