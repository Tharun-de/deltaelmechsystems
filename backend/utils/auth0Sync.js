import supabase from '../config/db.js';

export const syncAuth0UserWithSupabase = async (auth0User) => {
  try {
    console.log('Starting sync for:', auth0User.sub);

    // Basic user data with all possible fields
    const userData = {
      auth0_id: auth0User.sub,
      email: auth0User.email,
      name: auth0User.name || auth0User.email.split('@')[0],
      contact_person_name: auth0User.name || auth0User.email.split('@')[0],
      company_name: `${auth0User.name || auth0User.email.split('@')[0]}'s Company`,
      avatar_url: auth0User.picture,
      role: 'client',
      country: 'India',
      is_active: true,
      updated_at: new Date().toISOString()
    };

    // First check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('auth0_id', auth0User.sub)
      .single();

    console.log('Existing user check:', { existingUser, fetchError });

    if (existingUser) {
      // Update existing user
      const { data: updatedUser, error: updateError } = await supabase
        .from('business_profiles')
        .update({
          ...userData,
          // Preserve existing values if they exist
          phone: existingUser.phone || null,
          alternate_phone: existingUser.alternate_phone || null,
          address: existingUser.address || null,
          city: existingUser.city || null,
          state: existingUser.state || null,
          postal_code: existingUser.postal_code || null,
          company_registration_number: existingUser.company_registration_number || null,
          gst_number: existingUser.gst_number || null
        })
        .eq('id', existingUser.id)
        .select()
        .single();

      if (updateError) {
        console.error('Update error:', updateError);
        return existingUser;
      }

      console.log('User updated successfully:', updatedUser);
      return updatedUser;
    }

    // Create new user if doesn't exist
    const { data: newUser, error: insertError } = await supabase
      .from('business_profiles')
      .insert([{
        ...userData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return null;
    }

    console.log('New user created successfully:', newUser);
    return newUser;

  } catch (error) {
    console.error('Sync error:', error);
    return null;
  }
};