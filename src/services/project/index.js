// Mock data
import projects from "data/projects";

export const getProjects = (limit = 6) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        projects: projects.slice(0, limit),
        projectsTotal: projects.length
      });
    }, 700);
  });
};
