// userService.js
import supabase from '../config/db.js';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * syncUserWithAuth0: Checks if a local user record exists in Supabase for the given Auth0 user.
 * If not, it creates a new record in the 'users' table. If yes, it returns the existing record.
 * 
 * @param {Object} auth0User - The user object from Auth0 (e.g., req.oidc.user)
 * @returns {Object} - The local user record from Supabase
 */
export async function syncUserWithAuth0(auth0User) {
  // Extract the main fields from the Auth0 user object
  const auth0Id = auth0User.sub;         // e.g. "auth0|123456"
  const email = auth0User.email;
  const name = auth0User.name || null;
  const avatar_url = auth0User.picture || null;   // If Auth0 provides a 'picture' field
  // phone_number and address might not come from Auth0 by default, so set them to null or use your own logic
  const phone_number = null;  
  const address = null;

  // 1. Check if user already exists in Supabase by auth0_id
  const { data: existingUsers, error: existingError } = await supabase
    .from('users')
    .select('*')
    .eq('auth0_id', auth0Id)
    .limit(1);

  if (existingError) {
    throw new ErrorResponse(`Error checking for existing user: ${existingError.message}`, 500);
  }

  if (existingUsers && existingUsers.length > 0) {
    // User already exists; return the first matching record
    return existingUsers[0];
  }

  // 2. If the user doesn't exist, create a new record in Supabase
  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert({
      auth0_id: auth0Id,
      email,
      name,
      role: 'client',        // Default role, adjust as needed
      avatar_url,
      phone_number,
      address
    })
    .select('*')
    .single(); // Expect a single row in response

  if (insertError) {
    throw new ErrorResponse(`Error creating new user: ${insertError.message}`, 500);
  }

  return newUser;
}
