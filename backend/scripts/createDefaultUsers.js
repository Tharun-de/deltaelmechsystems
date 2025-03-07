import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const createDefaultUsers = async () => {
  try {
    await connectDB();

    // Create admin user
    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };

    // Create developer user
    const developerData = {
      name: 'Developer User',
      email: 'dev@example.com',
      password: 'dev123',
      role: 'developer'
    };

    // Create client user
    const clientData = {
      name: 'Client User',
      email: 'client@example.com',
      password: 'client123',
      role: 'client'
    };

    // Check if users already exist
    const adminExists = await User.findOne({ email: adminData.email });
    const devExists = await User.findOne({ email: developerData.email });
    const clientExists = await User.findOne({ email: clientData.email });

    if (!adminExists) {
      await User.create(adminData);
      console.log('Admin user created');
    }

    if (!devExists) {
      await User.create(developerData);
      console.log('Developer user created');
    }

    if (!clientExists) {
      await User.create(clientData);
      console.log('Client user created');
    }

    console.log('Default users created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating default users:', error);
    process.exit(1);
  }
};

createDefaultUsers();