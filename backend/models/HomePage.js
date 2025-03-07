// backend/models/HomePage.js
import supabase from '../config/db.js';

class HomePage {
  // Example method to fetch homepage content from a Supabase table called 'homepage'
  static async getContent() {
    const { data, error } = await supabase
      .from('homepage')  // Adjust table name if needed
      .select('*')
      .limit(1);
    
    if (error) {
      console.error("Error fetching homepage content:", error);
      return null;
    }
    return data;
  }
}

export default HomePage;
