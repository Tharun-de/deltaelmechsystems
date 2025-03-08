// backend/models/Project.js
import { supabase } from '../config/db.js';

class Project {
  /**
   * Fetch all projects from the 'projects' table.
   */
  static async getAll() {
    const { data, error } = await supabase
      .from('projects') // Ensure your table name is correct
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * Create a new project with the provided projectData.
   * @param {Object} projectData - The data for the new project.
   */
  static async create(projectData) {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  // You can add more methods here as needed (e.g., update, delete, findOne, etc.)
}

export default Project;
