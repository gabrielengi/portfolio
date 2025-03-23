import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ColorGrid from './ColorGrid.jsx'
import TodoList from './TodoList.tsx'

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const isScrolling = useRef(false);
  const loading = useRef(true);

  const onDoneLoading = () => {
    console.log('ondoneloading');
    loading.current = false;
  }
  
  const scrollToSection = (ref, page) => {
    if (isScrolling.current) return;
    
    isScrolling.current = true;
    setCurrentPage(page);
    
    ref.current.scrollIntoView({ behavior: 'smooth' });
    
    // Reset scrolling lock after animation completes
    setTimeout(() => {
      isScrolling.current = false;
    }, 200); // Match this with your transition duration
  };
  
  const scrollToProjects = () => scrollToSection(projectsRef, "projects");
  const scrollToHome = () => scrollToSection(homeRef, "home");
  const scrollToContact = () => scrollToSection(contactRef, "contact");

  // Handle snap scrolling and menu updates
  useEffect(() => {
    let lastScrollTop = 0;
    let scrollTimeout;
    
    const handleScroll = () => {
      if (isScrolling.current) return;
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const homeTop = homeRef.current.offsetTop;
        const projectsTop = projectsRef.current.offsetTop;
        const contactTop = contactRef.current.offsetTop;
        
        // Determine scroll direction
        const scrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop;
        
        // Find closest section based on scroll position
        const homeDistance = Math.abs(scrollTop - homeTop);
        const projectsDistance = Math.abs(scrollTop - projectsTop);
        const contactDistance = Math.abs(scrollTop - contactTop);
        
        // Determine current section
        let currentSection;
        if (homeDistance < projectsDistance && homeDistance < contactDistance) {
          currentSection = "home";
        } else if (projectsDistance < homeDistance && projectsDistance < contactDistance) {
          currentSection = "projects";
        } else {
          currentSection = "contact";
        }
        
        // If scrolling and passed a threshold, snap to next section
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
          if (scrollingDown) {
            if (currentSection === "home") {
              scrollToProjects();
            } else if (currentSection === "projects") {
              scrollToContact();
            }
          } else {
            if (currentSection === "contact") {
              scrollToProjects();
            } else if (currentSection === "projects") {
              scrollToHome();
            }
          }
        } else {
          // Update current page without scrolling
          setCurrentPage(currentSection);
        }
      }, 50); // Short debounce
    };
    
    // Add wheel event for more precise control
    const handleWheel = (e) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }
      
      const delta = e.deltaY;
      
      if (Math.abs(delta) > 10) {
        if (delta > 0) { // Scrolling down
          if (currentPage === "home") {
            e.preventDefault();
            scrollToProjects();
          } else if (currentPage === "projects") {
            e.preventDefault();
            scrollToContact();
          }
        } else { // Scrolling up
          if (currentPage === "contact") {
            e.preventDefault();
            scrollToProjects();
          } else if (currentPage === "projects") {
            e.preventDefault();
            scrollToHome();
          }
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Initial check on page load
    setTimeout(() => {
      const scrollTop = window.scrollY;
      const homeTop = homeRef.current.offsetTop;
      const projectsTop = projectsRef.current.offsetTop;
      const contactTop = contactRef.current.offsetTop;
      
      if (Math.abs(scrollTop - homeTop) < 100) {
     //   setCurrentPage("home");
      } else if (Math.abs(scrollTop - projectsTop) < 100) {
    //    setCurrentPage("projects");
      } else if (Math.abs(scrollTop - contactTop) < 100) {
    //    setCurrentPage("contact");
      }
    }, 100);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [currentPage]);

  // Apply CSS for snap scrolling
  useEffect(() => {
    // Add CSS to enable smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflowY = 'auto';
    document.body.style.scrollSnapType = 'y mandatory';
    
    // Get all section elements and apply snap alignment
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
      section.style.scrollSnapAlign = 'start';
      section.style.height = '100vh';
    });
    
    return () => {
      // Clean up styles when component unmounts
      document.documentElement.style.scrollBehavior = '';
      document.body.style.overflowY = '';
      document.body.style.scrollSnapType = '';
    };
  }, []);

  return (
    <div className="app-container"> 
      <NavigationMenu 
        currentPage={currentPage} 
        scrollToHome={scrollToHome} 
        scrollToProjects={scrollToProjects}
        scrollToContact={scrollToContact}
      />
      <section ref={homeRef} className="page-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ColorGrid/>
      </section>
      <section ref={projectsRef} className="page-section" style={{ minHeight: '100vh' }}>
        <Projects />
      </section>
      <section ref={contactRef} className="page-section" style={{ minHeight: '100vh' }}>
        <Contact />
      </section>
    </div>
  );
};

const NavigationMenu = ({ currentPage, scrollToHome, scrollToProjects, scrollToContact }) => {
  return (
    <div className="nav-menu" style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      
      padding: '8px 16px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      gap: '15px'
    }}>
      <button 
        onClick={scrollToHome} 
        style={{
          border: 'none',
          background: 'none',
          outline: '0px',
          fontSize: '16px',
          fontWeight: currentPage === "home" ? 'bold' : 'normal',
          color: currentPage === "home" ? '#007bff' : '#333',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        Home
      </button>
      <button 
        onClick={scrollToProjects} 
        style={{
          border: 'none',
          outline: '0px',
          background: 'none',
          fontSize: '16px',
          fontWeight: currentPage === "projects" ? 'bold' : 'normal',
          color: currentPage === "projects" ? '#007bff' : '#333',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        Projects
      </button>
      <button 
        onClick={scrollToContact} 
        style={{
          border: 'none',
          outline: '0px',
          background: 'none',
          fontSize: '16px',
          fontWeight: currentPage === "contact" ? 'bold' : 'normal',
          color: currentPage === "contact" ? '#007bff' : '#333',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        Contact
      </button>
    </div>
  );
};

const Projects = () => {
  return (
    <div style={{
      width: '100%',
      padding: '40px 20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: '#333',
        paddingTop: '60px'
      }}>
        My Projects
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <ProjectCard 
          title="Interactive Color Grid" 
          description="A dynamic grid where users can click on cells to change their color and view location data. Built with React and AWS Amplify for real-time database updates."
          technologies={["React", "AWS Amplify", "CSS Grid", "Geolocation API"]}
        />
        
        <ProjectCard 
          title="Data Visualization Dashboard" 
          description="A comprehensive dashboard for visualizing complex datasets with interactive charts and filtering capabilities. Designed for both desktop and mobile viewing."
          technologies={["React", "D3.js", "Responsive Design", "REST API"]}
        />
        
        <ProjectCard 
          title="AI-Powered Task Manager" 
          description="A smart task management application that uses machine learning to prioritize and categorize tasks. Features include natural language processing for task entry and smart scheduling."
          technologies={["React", "TensorFlow.js", "LocalStorage", "Progressive Web App"]}
        />
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div style={{
      width: '100%',
      padding: '40px 20px',
      backgroundColor: '#e8f4fc',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: '#333',
        paddingTop: '60px'
      }}>
        Contact Me
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <ContactCard 
          title="Email" 
          value="contact@example.com"
          icon="📧"
          action="mailto:contact@example.com"
        />
        
        <ContactCard 
          title="LinkedIn" 
          value="linkedin.com/in/yourprofile"
          icon="💼"
          action="https://linkedin.com/in/yourprofile"
        />
        
        <ContactCard 
          title="GitHub" 
          value="github.com/yourusername"
          icon="💻"
          action="https://github.com/yourusername"
        />
      </div>
    </div>
  );
};

const ContactCard = ({ title, value, icon, action }) => {
  return (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={() => window.open(action, '_blank')}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{
        fontSize: '36px',
        marginRight: '20px'
      }}>
        {icon}
      </div>
      <div>
        <h2 style={{ marginTop: 0, color: '#222', marginBottom: '5px' }}>{title}</h2>
        <p style={{ color: '#555', fontSize: '18px' }}>{value}</p>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, technologies }) => {
  return (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <h2 style={{ marginTop: 0, color: '#222' }}>{title}</h2>
      <p style={{ color: '#555', lineHeight: '1.6' }}>{description}</p>
      
      <div style={{ marginTop: '15px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Technologies:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {technologies.map((tech, index) => (
            <span key={index} style={{
              backgroundColor: '#eaeaea',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '14px'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App