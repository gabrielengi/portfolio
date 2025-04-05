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
      console.log(document.documentElement.clientWidth);
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
    <div className="app-container" style={{ minWidth: '100vw', backgroundColor: '#F0DFC3'}}> 
      <NavigationMenu 
        currentPage={currentPage} 
        scrollToHome={scrollToHome} 
        scrollToProjects={scrollToProjects}
        scrollToContact={scrollToContact}
        isMobile={isMobile}
      />
      <section 
        ref={homeRef} 
        className="page-section"
        style={{ height: `${dimensions.height}px`, width: '100%' }}
      >
        <ColorGrid />
      </section>
      <section 
        ref={projectsRef} 
        className="page-section"
        style={{ minHeight: `${dimensions.height}px`, width: '100%' }}
      >
        <Projects  />
      </section>
      <section 
        ref={contactRef} 
        className="page-section"
        style={{ minHeight: `${dimensions.height}px`, width: '100%' }}
      >
        <Contact  />
      </section>
    </div>
  );
};

const NavigationMenu = ({ currentPage, scrollToHome, scrollToProjects, scrollToContact, isMobile }) => {
  return (
    <nav style={{
      position: 'fixed',
      top: '0',
      width: '100%',
      padding: '12px 0',
      backgroundColor: '#F0DFC3',
      borderBottom: '0px solid #eaeaea',
      zIndex: 1000,
      textAlign: 'center'
    }}>
      <button 
        onClick={scrollToHome} 
        style={{
          border: 'none',
          background: 'none',
          fontSize: '16px',
       //  fontWeight: currentPage === "home" ? 'bold' : 'normal',
          color: currentPage === "home" ? '#007bff' : '#333',
          cursor: 'pointer',
          margin: '0 15px',
          padding: '5px 0',
          outline: 'none',
        }}
      >
        Home
      </button>
      <button 
        onClick={scrollToProjects} 
        style={{
          border: 'none',
          background: 'none',
          fontSize: '16px',
     //     fontWeight: currentPage === "projects" ? 'bold' : 'normal',
          color: currentPage === "projects" ? '#007bff' : '#333',
          cursor: 'pointer',
          margin: '0 15px',
          padding: '5px 0',
          outline: 'none',
        }}
      >
        Projects
      </button>
      <button 
        onClick={scrollToContact} 
        style={{
          border: 'none',
          background: 'none',
          fontSize: '16px',
      //    fontWeight: currentPage === "contact" ? 'bold' : 'normal',
          color: currentPage === "contact" ? '#007bff' : '#333',
          cursor: 'pointer',
          margin: '0 15px',
          padding: '5px 0',
          outline: 'none',
        }}
      >
        Contact
      </button>
    </nav>
  );
};

const Projects = ({ isMobile }) => {
  const projects = [
    {
      title: "Needleman-Wunsch-Demo",
      link: "https://gabehouse.github.io/Needleman-Wunsch-Demo/",
      description: "Dynamic programming algorithm demo that computes the optimal alignment of two strings.",
      technologies: ["React", "Javascript"]
    },
    {
      title: "Animalia",
      link: "http://ani-env.eba-t9edz5sk.us-east-2.elasticbeanstalk.com/",
      description: "Online player vs. player game. Java server deployed with Terraform and Elastic Beanstalk to an EC2 server.",
      technologies: ["AWS", "Terraform", "Jetty WebSockets", "Java", "Javascript", "Raphael.js"]
    },
    {
      title: "Old personal website",
      link: "https://gabehouse.github.io/",
      description: "Cursor-interactable bouncy ball demo written in vanilla javacript.",
      technologies: ["Javascript"]
    }
  ];

  return (
    <div style={{
      padding: '60px 5%',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        marginBottom: '30px',
        color: '#333',
        borderBottom: '0px solid #ddd',
        paddingBottom: '10px'
      }}>
        My Projects
      </h1>
      
      <div style={{ marginTop: '20px', width: '100%' }}>
        {projects.map((project, index) => (
          <div key={index} style={{ 
            marginBottom: '30px',
            borderBottom: index < projects.length - 1 ? '0px solid #eee' : 'none',
            paddingBottom: '20px',
            width: '100%'
          }}>
            <h2 style={{ margin: '0 0 5px' }}>{project.title}</h2>
            {project.link && (
              <a href={project.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ 
                   display: 'inline-block',
                   marginBottom: '10px',
                   color: '#007bff',
                   textDecoration: 'none'
                 }}>
                {project.link}
              </a>
            )}
            <p style={{ marginTop: '5px' }}>{project.description}</p>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontWeight: '500' }}>Technologies: </span>
              {project.technologies.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = ({ isMobile }) => {
  const contacts = [
    {
      title: "Email",
      value: "gabriel.jsh@gmail.com",
      action: "mailto:gabriel.jsh@gmail.com"
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/gabriel-house",
      action: "https://linkedin.com/in/gabriel-house"
    },
    {
      title: "GitHub",
      value: "github.com/gabehouse",
      action: "https://github.com/gabehouse"
    }
  ];

  return (
    <div style={{
      padding: '60px 5%',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        marginBottom: '30px',
        color: '#333',
        borderBottom: '0px solid #ddd',
        paddingBottom: '10px'
      }}>
        Contact Me
      </h1>
      
      <div style={{ marginTop: '20px', width: '100%' }}>
        {contacts.map((contact, index) => (
          <div key={index} style={{ 
            marginBottom: '20px',
            borderBottom: index < contacts.length - 1 ? '0px solid #eee' : 'none',
            paddingBottom: '15px',
            width: '100%'
          }}>
            <h2 style={{ margin: '0 0 5px' }}>{contact.title}</h2>
            <a href={contact.action}
               target="_blank" 
               rel="noopener noreferrer"
               style={{ 
                 color: '#007bff',
                 textDecoration: 'none'
               }}>
              {contact.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;