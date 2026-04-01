const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // One profile per user
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true,
    defaultValue: null
  },
  date_of_birth: {
    type: DataTypes.DATEONLY, // Use DATEONLY if you don't need the timestamp (HH:MM:SS)
    allowNull: true,
    defaultValue: null
  },
  home_address: {
    type: DataTypes.TEXT, // Addresses can be long, TEXT is safer than STRING(255)
    allowNull: true,
    defaultValue: null
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  country: {
    type: DataTypes.STRING(100),
    defaultValue: 'Nigeria'
  },
  profile_picture: {
    type: DataTypes.STRING(500), // Longer for Cloudinary/S3 URLs
    allowNull: true,
    defaultValue: null
  },
  means_of_id_type: {
    type: DataTypes.ENUM('nin', 'passport', 'drivers_license', 'voters_card', 'other'),
    allowNull: true,
    defaultValue: null
  },
  means_of_id_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  selfie_image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  },
  social_media_link_1: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  },
  social_media_link_2: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  },
  social_media_link_3: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'profiles'
});

module.exports = Profile;