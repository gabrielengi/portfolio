import React, { useRef, useState, useEffect } from 'react';
import ColorGrid from './ColorGrid';

const App = () => {
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [dimensions, setDimensions] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll observer to update current page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === homeRef.current) setCurrentPage("home");
            else if (entry.target === projectsRef.current) setCurrentPage("projects");
            else if (entry.target === contactRef.current) setCurrentPage("contact");
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (homeRef.current) observer.observe(homeRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    
    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  const scrollToHome = () => homeRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToProjects = () => projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' });

  const isMobile = dimensions.width < 768;

  return (
    <div className="app-container"> 
      <NavigationMenu 
        currentPage={currentPage} 
        scrollToHome={scrollToHome} 
        scrollToProjects={scrollToProjects}
        scrollToContact={scrollToContact}
        isMobile={isMobile}
      />
      <section 
        ref={homeRef} 
        className="page-section full-height"
        style={{ height: `${dimensions.height}px` }}
      >
        <ColorGrid />
      </section>
      <section 
        ref={projectsRef} 
        className="page-section full-height flex-center"
        style={{ minHeight: `${dimensions.height}px` }}
      >
        <div className="content-container">
          <Projects isMobile={isMobile} />
        </div>
      </section>
      <section 
        ref={contactRef} 
        className="page-section full-height flex-center"
        style={{ minHeight: `${dimensions.height}px` }}
      >
        <div className="content-container">
          <Contact isMobile={isMobile} />
        </div>
      </section>
    </div>
  );
};

const NavigationMenu = ({ currentPage, scrollToHome, scrollToProjects, scrollToContact, isMobile }) => {
  return (
    <div className="nav-menu" style={{
      position: 'fixed',
      top: isMobile ? '10px' : '20px',
      marginTop: '1px',
      right: isMobile ? '10px' : '20px',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: isMobile ? '5px 10px' : '8px 16px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      gap: isMobile ? '10px' : '15px',
      
    }}>
      <button 
        onClick={scrollToHome} 
        style={{
          border: 'none',
          background: 'none',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: currentPage === "home" ? 'bold' : 'normal',
          color: currentPage === "home" ? '#007bff' : '#333',
          cursor: 'pointer',
          padding: isMobile ? '5px' : '8px',
          outline: '0px'
        }}
      >
        Home
      </button>
      <button 
        onClick={scrollToProjects} 
        style={{
          border: 'none',
          background: 'none',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: currentPage === "projects" ? 'bold' : 'normal',
          color: currentPage === "projects" ? '#007bff' : '#333',
          cursor: 'pointer',
          padding: isMobile ? '5px' : '8px',
          outline: '0px'
        }}
      >
        Projects
      </button>
      <button 
        onClick={scrollToContact} 
        style={{
          border: 'none',
          background: 'none',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: currentPage === "contact" ? 'bold' : 'normal',
          color: currentPage === "contact" ? '#007bff' : '#333',
          cursor: 'pointer',
          padding: isMobile ? '5px' : '8px',
          outline: '0px'
        }}
      >
        Contact
      </button>
    </div>
  );
};


const Projects = ({ isMobile }) => {
  return (
    <div className="content-area projects-content" style={{
      padding: isMobile ? '20px 10px' : '40px 20px',
      backgroundColor: '#f5f5f5',
    }}>
      <h1 className="text-center" style={{
        marginBottom: isMobile ? '20px' : '40px',
        color: '#333',
        fontSize: isMobile ? '24px' : '32px'
      }}>
        My Projects
      </h1>
      
      <div className="cards-container">
        <ProjectCard 
          title="Interactive Color Grid" 
          description="A dynamic grid where users can click on cells to change their color and view location data. Built with React and AWS Amplify for real-time database updates."
          technologies={["React", "AWS Amplify", "CSS Grid", "Geolocation API"]}
          isMobile={isMobile}
        />
        
        <ProjectCard 
          title="Data Visualization Dashboard" 
          description="A comprehensive dashboard for visualizing complex datasets with interactive charts and filtering capabilities. Designed for both desktop and mobile viewing."
          technologies={["React", "D3.js", "Responsive Design", "REST API"]}
          isMobile={isMobile}
        />
        
        <ProjectCard 
          title="AI-Powered Task Manager" 
          description="A smart task management application that uses machine learning to prioritize and categorize tasks. Features include natural language processing for task entry and smart scheduling."
          technologies={["React", "TensorFlow.js", "LocalStorage", "Progressive Web App"]}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

const Contact = ({ isMobile }) => {
  return (
    <div className="content-area contact-content" style={{
      padding: isMobile ? '20px 10px' : '40px 20px',
      backgroundColor: '#e8f4fc',
    }}>
      <h1 className="text-center" style={{
        marginBottom: isMobile ? '20px' : '40px',
        color: '#333',
        fontSize: isMobile ? '24px' : '32px'
      }}>
        Contact Me
      </h1>
      
      <div className="cards-container">
        <ContactCard 
          title="Email" 
          value="contact@example.com"
          icon="📧"
          action="mailto:contact@example.com"
          isMobile={isMobile}
        />
        
        <ContactCard 
          title="LinkedIn" 
          value="linkedin.com/in/yourprofile"
          icon="💼"
          action="https://linkedin.com/in/yourprofile"
          isMobile={isMobile}
        />
        
        <ContactCard 
          title="GitHub" 
          value="github.com/yourusername"
          icon="💻"
          action="https://github.com/yourusername"
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

const ContactCard = ({ title, value, icon, action, isMobile }) => {
  return (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: isMobile ? '15px' : '25px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={() => window.open(action, '_blank')}
    >
      <div style={{
        fontSize: isMobile ? '24px' : '36px',
        marginRight: isMobile ? '10px' : '20px'
      }}>
        {icon}
      </div>
      <div>
        <h2 style={{ 
          marginTop: 0, 
          color: '#222', 
          marginBottom: '5px',
          fontSize: isMobile ? '18px' : '22px'
        }}>
          {title}
        </h2>
        <p style={{ 
          color: '#555', 
          fontSize: isMobile ? '14px' : '18px',
          wordBreak: 'break-word'
        }}>
          {value}
        </p>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, technologies, isMobile }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      width: '100%',
      padding: isMobile ? '15px' : '25px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out'
    }}>
      <h2 style={{ 
        marginTop: 0, 
        color: '#222',
        fontSize: isMobile ? '20px' : '24px'
      }}>
        {title}
      </h2>
      <p style={{ 
        color: '#555', 
        lineHeight: '1.6',
        fontSize: isMobile ? '14px' : '16px'
      }}>
        {description}
      </p>
      
      <div style={{ marginTop: '15px' }}>
        <h3 style={{ 
          fontSize: isMobile ? '14px' : '16px', 
          marginBottom: '8px' 
        }}>
          Technologies:
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {technologies.map((tech, index) => (
            <span key={index} style={{
              backgroundColor: '#eaeaea',
              padding: isMobile ? '3px 8px' : '5px 10px',
              borderRadius: '15px',
              fontSize: isMobile ? '12px' : '14px'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;