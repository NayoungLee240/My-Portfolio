import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github: string | null;
  demo: string | null;
  period: string;
  featured: boolean;
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.id} className={`card ${styles.card}`}>
              <div className={styles.header}>
                <h3 className={styles.title}>{project.title}</h3>
                <span className={styles.period}>{project.period}</span>
              </div>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.techStack}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.links}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
