// Email functionality should be handled by the backend API
export const sendEmail = async (options: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  try {
    const response = await fetch('http://localhost:5000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};