import supabase from '../config/db.js';

class User {
  static async findOne(query) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .match(query)
      .single();

    if (error) {
      console.error('Error finding user:', error);
      return null;
    }
    return data;
  }

  static async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export default User;
