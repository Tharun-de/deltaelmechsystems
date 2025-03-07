// backend/models/ContactForm.js
import supabase from '../config/db.js';

class ContactForm {
  /**
   * Retrieve all contact form submissions.
   */
  static async getAll() {
    const { data, error } = await supabase
      .from('contact_forms') // Make sure your Supabase table is named 'contact_forms'
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * Create a new contact form submission.
   * @param {Object} formData - The data from the contact form.
   */
  static async create(formData) {
    const { data, error } = await supabase
      .from('contact_forms')
      .insert(formData)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export default ContactForm;
