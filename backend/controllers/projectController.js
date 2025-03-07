import supabase from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    console.log('Fetching projects...');

    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:client_id(name, email),
        project_manager:project_manager_id(name),
        site_supervisor:site_supervisor_id(name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Projects fetched:', projects?.length);

    res.json({
      success: true,
      count: projects?.length || 0,
      data: projects
    });
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch projects'
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      project_type,
      status,
      current_phase,
      site_address,
      site_city,
      site_state,
      site_postal_code,
      plot_area,
      built_up_area,
      number_of_floors,
      start_date,
      estimated_end_date,
      estimated_budget
    } = req.body;

    const { data: project, error } = await supabase
      .from('projects')
      .insert([{
        title,
        description,
        project_type,
        status,
        current_phase,
        client_id: req.supabaseUser.id,
        site_address,
        site_city,
        site_state,
        site_postal_code,
        plot_area,
        built_up_area,
        number_of_floors,
        completion_percentage: 0,
        start_date,
        estimated_end_date,
        estimated_budget,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create project'
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:client_id(name, email),
        project_manager:project_manager_id(name),
        site_supervisor:site_supervisor_id(name)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch project'
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    delete updates.id;
    delete updates.created_at;
    delete updates.client_id;

    const { data: project, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update project'
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete project'
    });
  }
};