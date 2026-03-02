'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);

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
      <div
        className={`cursor ${isHovered ? 'hovered' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div className="noise" />

      <div className="preloader" id="preloader">
        <div className="preloader-text">
          <span>BILLIE EILISH</span>
        </div>
        <div className="loader-line" id="loader-line" />
      </div>

      <nav className="fixed top-0 left-0 w-full px-[1cm] py-8 flex justify-between items-center z-[100] mix-blend-difference">
        <a 
          href="#" 
          className="logo"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          BILLIE
        </a>
        <a 
          href="#contact" 
          className="menu-btn"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          Connect
        </a>
      </nav>

      <section className="hero container">
        <div className="hero-content">
          <span className="hero-subtitle">GRAMMY WINNER &mdash; {new Date().getFullYear()}</span>
          <div className="display-text">
            <div className="word-wrapper">
              <span>BILLIE</span>
            </div>
            <br />
            <div className="word-wrapper">
              <span>EILISH</span>
            </div>
          </div>
        </div>
        <div className="hero-img-container">
          <Image 
            src="/img/trexx.jpeg" 
            alt="Billie Eilish" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-inner">
          <span>Music &bull; Art &bull; Fashion &bull; Icon &bull; Music &bull; Art &bull; Fashion &bull; Icon &bull;</span>
        </div>
      </div>

      <section className="section-padding container" id="about">
        <div className="section-header">
          <h2 className="section-title">About Billie</h2>
          <span className="section-number">(001)</span>
        </div>
        <div className="about-text">
          Billie Eilish Pirate Baird O&apos;Connell adalah penyanyi dan penulis lagu Amerika yang <strong style={{ color: 'var(--accent-color)' }}>merevolusi industri musik</strong> dengan suara unik dan gaya visualnya yang ikonik. Pemenang 9 Grammy Awards dan artis termuda yang memenangkan Album of the Year.
        </div>
      </section>

      <section className="section-padding container">
        <div className="section-header">
          <h2 className="section-title">Achievements</h2>
          <span className="section-number">(002)</span>
        </div>
        <div className="service-list">
          {[
            { name: 'Grammy Awards', desc: '9 Grammy Awards including Album, Record, Song of the Year.' },
            { name: 'Billboard', desc: 'Multiple #1 hits, billions of streams worldwide.' },
            { name: 'Cultural Icon', desc: 'Fashion icon, environmental activist, mental health advocate.' }
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

      <section className="section-padding container" id="projects">
        <div className="section-header">
          <h2 className="section-title">Discography</h2>
          <span className="section-number">(003)</span>
        </div>
        {[
          { title: 'Happier Than Ever', cat: 'Album / 2021', img: '/img/trexx.jpeg' },
          { title: 'When We All Fall Asleep', cat: 'Album / 2019', img: '/img/trexx.jpeg' }
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

      <section className="section-padding container">
        <div className="section-header">
          <h2 className="section-title">Gallery</h2>
          <span className="section-number">(004)</span>
        </div>
        <div className="cert-grid">
          {[
            { img: '/img/trexx.jpeg', title: 'Grammy Performance' },
            { img: '/img/trexx.jpeg', title: 'World Tour' }
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

      <footer id="contact">
        <div className="container">
          <span className="hero-subtitle">WANT TO CONNECT?</span>
          <a 
            href="https://www.billieeilish.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            Visit Official Site
          </a>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Billie Eilish Tribute</span>
            <div className="socials">
              <a 
                href="https://instagram.com/billieeilish" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '20px' }}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                INSTAGRAM
              </a>
              <a 
                href="https://twitter.com/billieeilish" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '20px' }}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                TWITTER
              </a>
            </div>
          </div>
        </div>
      </footer>

      {lightboxSrc && (
        <div className="lightbox" onClick={() => setLightboxSrc(null)}>
          <Image 
            src={lightboxSrc} 
            alt="Gallery Image" 
            width={1200} 
            height={900}
            className="max-h-[90vh] max-w-[90vw] w-auto h-auto"
          />
        </div>
      )}
    </>
  );
}
