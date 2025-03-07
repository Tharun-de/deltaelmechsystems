// backend/models/JobApplication.js
import supabase from '../config/db.js';

class JobApplication {
  /**
   * Fetch all job applications from the 'job_applications' table.
   */
  static async getAll() {
    const { data, error } = await supabase
      .from('job_applications') // Ensure your Supabase table is named 'job_applications'
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * Create a new job application with the provided data.
   * @param {Object} applicationData - The data for the new job application.
   */
  static async create(applicationData) {
    const { data, error } = await supabase
      .from('job_applications')
      .insert(applicationData)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  // You can add more methods here as needed, such as update or delete.
}

export default JobApplication;
