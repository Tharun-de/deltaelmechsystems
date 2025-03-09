import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

// Form validation schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  project_type: z.enum(['it_building', 'house', 'school', 'commercial', 'other']),
  site_address: z.string().min(1, 'Site address is required'),
  site_city: z.string().min(1, 'City is required'),
  site_state: z.string().min(1, 'State is required'),
  site_postal_code: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid PIN code'),
  plot_area: z.number().min(0, 'Plot area must be positive'),
  built_up_area: z.number().min(0, 'Built-up area must be positive'),
  number_of_floors: z.number().int().min(1, 'Number of floors must be at least 1'),
  estimated_cost: z.number().min(0, 'Estimated cost must be positive'),
  start_date: z.string().min(1, 'Start date is required'),
  estimated_duration: z.number().int().min(1, 'Duration must be at least 1 day'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
          <div className="flex space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full ${
                  s === step ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                {...register('title')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <select
                {...register('project_type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select project type</option>
                <option value="it_building">IT Building</option>
                <option value="house">House</option>
                <option value="school">School</option>
                <option value="commercial">Commercial</option>
                <option value="other">Other</option>
              </select>
              {errors.project_type && (
                <p className="mt-1 text-sm text-red-600">{errors.project_type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Address</label>
              <input
                type="text"
                {...register('site_address')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.site_address && (
                <p className="mt-1 text-sm text-red-600">{errors.site_address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  {...register('site_city')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.site_city && (
                  <p className="mt-1 text-sm text-red-600">{errors.site_city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  {...register('site_state')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.site_state && (
                  <p className="mt-1 text-sm text-red-600">{errors.site_state.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">PIN Code</label>
              <input
                type="text"
                {...register('site_postal_code')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.site_postal_code && (
                <p className="mt-1 text-sm text-red-600">{errors.site_postal_code.message}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plot Area (sq ft)</label>
                <input
                  type="number"
                  {...register('plot_area', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.plot_area && (
                  <p className="mt-1 text-sm text-red-600">{errors.plot_area.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Built-up Area (sq ft)</label>
                <input
                  type="number"
                  {...register('built_up_area', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.built_up_area && (
                  <p className="mt-1 text-sm text-red-600">{errors.built_up_area.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Floors</label>
                <input
                  type="number"
                  {...register('number_of_floors', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.number_of_floors && (
                  <p className="mt-1 text-sm text-red-600">{errors.number_of_floors.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Cost (₹)</label>
                <input
                  type="number"
                  {...register('estimated_cost', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.estimated_cost && (
                  <p className="mt-1 text-sm text-red-600">{errors.estimated_cost.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...register('start_date')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.start_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Duration (days)</label>
                <input
                  type="number"
                  {...register('estimated_duration', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.estimated_duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.estimated_duration.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Project...' : 'Create Project'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </form>
  );
};

export default ProjectForm; 