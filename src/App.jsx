import { useState, useRef } from 'react'
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
  const loading = useRef(true);

  const onDoneLoading = () => {
    console.log('ondoneloading');
    loading.current = false;
  }
  
  const scrollToProjects = () => {
    projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    setCurrentPage("projects");
  };
  
  const scrollToHome = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
    setCurrentPage("home");
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
    setCurrentPage("contact");
  };

  return (
    <div className="app-container"> 
      <NavigationMenu 
        currentPage={currentPage} 
        scrollToHome={scrollToHome} 
        scrollToProjects={scrollToProjects}
        scrollToContact={scrollToContact}
      />
      <section ref={homeRef} className="page-section" style={{height:"100vh"}}>
        <ColorGrid/>
      </section>
      <section ref={projectsRef} className="page-section" style={{height:"100vh"}}>
        <Projects />
      </section>
      <section ref={contactRef} className="page-section" style={{height:"100vh"}}>
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
          fontSize: '16px',
          fontWeight: currentPage === "home" ? 'bold' : 'normal',
          color: currentPage === "home" ? '#007bff' : '#333',
          cursor: 'pointer'
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
          fontWeight: currentPage === "projects" ? 'bold' : 'normal',
          color: currentPage === "projects" ? '#007bff' : '#333',
          cursor: 'pointer'
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
          fontWeight: currentPage === "contact" ? 'bold' : 'normal',
          color: currentPage === "contact" ? '#007bff' : '#333',
          cursor: 'pointer'
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
      backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: '#333'
      }}>
        <p>My Projects</p>
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
      minHeight: '80vh'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: '#333'
      }}>
        <p>Contact Me</p>
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
        transition: 'transform 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={() => window.open(action, '_blank')}
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
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out'
    }}>
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