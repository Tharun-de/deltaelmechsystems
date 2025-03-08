import { supabase } from '../config/db.js';

// @desc    Send an email
// @route   POST /api/email/send
// @access  Private
export const sendEmail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    // Store email in history
    const { data, error } = await supabase
      .from('email_history')
      .insert([{
        to,
        subject,
        body,
        sent_by: req.user.id,
        sent_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;

    // TODO: Implement actual email sending logic
    // For now, just return success
    res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

// @desc    Get email history
// @route   GET /api/email/history
// @access  Private
export const getEmailHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('email_history')
      .select('*')
      .order('sent_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching email history:', error);
    res.status(500).json({ error: 'Failed to fetch email history' });
  }
};

// @desc    Get email template
// @route   GET /api/email/templates/:id
// @access  Private
export const getEmailTemplate = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching email template:', error);
    res.status(500).json({ error: 'Failed to fetch email template' });
  }
};

// @desc    Update email template
// @route   PUT /api/email/templates/:id
// @access  Private
export const updateEmailTemplate = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('email_templates')
      .update(req.body)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(data[0]);
  } catch (error) {
    console.error('Error updating email template:', error);
    res.status(500).json({ error: 'Failed to update email template' });
  }
}; 