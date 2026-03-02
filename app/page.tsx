'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Custom Cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Preloader
    const loaderLine = document.getElementById('loader-line') as HTMLDivElement | null;
    const preloader = document.getElementById('preloader') as HTMLDivElement | null;
    const heroSpans = document.querySelectorAll('.word-wrapper span');
    const heroImg = document.querySelector('.hero-img-container img') as HTMLImageElement | null;

    if (loaderLine) loaderLine.style.width = '100%';

    const preloaderTimer = setTimeout(() => {
      if (preloader) preloader.style.transform = 'translateY(-100%)';
      
      setTimeout(() => {
        heroSpans.forEach((span, idx) => {
          setTimeout(() => {
            (span as HTMLElement).style.transform = 'translateY(0)';
          }, idx * 200);
        });
        
        if (heroImg) {
          heroImg.style.clipPath = 'inset(0 0 0 0)';
        }
      }, 500);
    }, 1000);

    // Scroll Reveal
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.project-item, .service-item, .about-text');
    revealElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(50px)';
      htmlEl.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
      observerRef.current?.observe(htmlEl);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(preloaderTimer);
      observerRef.current?.disconnect();
    };
  }, []);

  const openLightbox = (src: string) => {
    setLightboxSrc(src);
  };

  return (
    <>
      {/* Custom Cursor */}
      <div
        className={`cursor ${isHovered ? 'hovered' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div className="noise" />

      {/* Preloader */}
      <div className="preloader" id="preloader">
        <div className="preloader-text">
          <span>LOADING...</span>
        </div>
        <div className="loader-line" id="loader-line" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full px-[1cm] py-8 flex justify-between items-center z-[100] mix-blend-difference">
        <a 
          href="#" 
          className="logo"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          G-DEV
        </a>
        <a 
          href="#contact" 
          className="menu-btn"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          Start a Project
        </a>
      </nav>

      {/* Hero */}
      <section className="hero container">
        <div className="hero-content">
          <span className="hero-subtitle">INDONESIA BASED &mdash; 2025</span>
          <div className="display-text">
            <div className="word-wrapper">
              <span>CREATIVE</span>
            </div>
            <br />
            <div className="word-wrapper">
              <span>DEVELOPER</span>
            </div>
          </div>
        </div>
        <div className="hero-img-container">
          <Image 
            src="/IMG/foto_kamu-removebg-preview.png" 
            alt="Gustiawan Profile" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-inner">
          <span>Frontend &bull; UI/UX Design &bull; Web Animations &bull; Creative Coding &bull; Frontend &bull; UI/UX Design &bull; Web Animations &bull; Creative Coding &bull;</span>
        </div>
      </div>

      {/* About */}
      <section className="section-padding container" id="about">
        <div className="section-header">
          <h2 className="section-title">Who I Am</h2>
          <span className="section-number">(001)</span>
        </div>
        <div className="about-text">
          Seorang pengembang yang tidak hanya menulis kode, tapi menciptakan <strong style={{ color: 'var(--accent-color)' }}>pengalaman digital</strong>. Menggabungkan estetika desain premium dengan performa teknis untuk menciptakan website yang memorable.
        </div>
      </section>

      {/* Services */}
      <section className="section-padding container">
        <div className="section-header">
          <h2 className="section-title">Services</h2>
          <span className="section-number">(002)</span>
        </div>
        <div className="service-list">
          {[
            { name: 'Development', desc: 'React, HTML5, CSS3, JavaScript, Clean Code & Performance.' },
            { name: 'Design', desc: 'Figma, UI/UX, Prototyping, Design Systems.' },
            { name: 'Interaction', desc: 'GSAP, WebGL, Micro-interactions, 3D Elements.' }
          ].map((service, i) => (
            <div 
              key={i} 
              className="service-item"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="service-name">{service.name}</span>
              <span className="service-desc">{service.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding container" id="projects">
        <div className="section-header">
          <h2 className="section-title">Selected Works</h2>
          <span className="section-number">(003)</span>
        </div>
        {[
          { title: 'Fintech Corp', cat: 'Web Design / Development', img: '/IMG/contoh_project1.jpg' },
          { title: 'Neon Studio', cat: 'Branding / UI', img: '/IMG/contoh_project1.jpg' }
        ].map((project, i) => (
          <div 
            key={i} 
            className="project-item"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            <a href="#" className="project-wrapper">
              <div className="project-img-holder">
                <Image 
                  src={project.img} 
                  alt={project.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-cat">{project.cat}</span>
              </div>
            </a>
          </div>
        ))}
      </section>

      {/* Certificates */}
      <section className="section-padding container">
        <div className="section-header">
          <h2 className="section-title">Awards</h2>
          <span className="section-number">(004)</span>
        </div>
        <div className="cert-grid">
          {[
            { img: '/IMG/sertivikat1.jpg', title: 'AWS Certified' },
            { img: '/IMG/sertivikat2.jpg', title: 'Google UX Design' }
          ].map((cert, i) => (
            <div 
              key={i} 
              className="cert-card"
              onClick={() => openLightbox(cert.img)}
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image 
                src={cert.img} 
                alt={cert.title} 
                width={400} 
                height={300}
                className="w-full h-auto"
              />
              <p style={{ marginTop: '10px', fontWeight: 700 }}>{cert.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer id="contact">
        <div className="container">
          <span className="hero-subtitle">HAVE AN IDEA?</span>
          <a 
            href="mailto:email@example.com" 
            className="footer-cta"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            Let&apos;s Talk
          </a>
          <div className="footer-bottom">
            <span>&copy; 2025 G-DEV</span>
            <div className="socials">
              <a 
                href="#" 
                style={{ marginLeft: '20px' }}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                INSTAGRAM
              </a>
              <a 
                href="#" 
                style={{ marginLeft: '20px' }}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="lightbox" onClick={() => setLightboxSrc(null)}>
          <Image 
            src={lightboxSrc} 
            alt="Zoomed Certificate" 
            width={1200} 
            height={900}
            className="max-h-[90vh] max-w-[90vw] w-auto h-auto"
          />
        </div>
      )}
    </>
  );
}
