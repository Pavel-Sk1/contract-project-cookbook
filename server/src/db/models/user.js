'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Recipe, {
        through: models.Favorite, 
        as: 'FavoriteRecipes', 
        foreignKey: "userId"
      });
    }
  }

  // Выносим методы валидации outside класса чтобы избежать конфликта с Sequelize
  const validateEmail = (email) => {
    const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
    const isValidLength = password.length >= 8;

    if (
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumbers.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false;
    }
    return true;
  };

  User.validateSignInData = ({ email, password }) => {
    if (
      !email ||
      typeof email !== 'string' ||
      email.trim().length === 0 ||
      !validateEmail(email)
    ) {
      return {
        isValid: false,
        error: 'Email не должен быть пустым и должен быть валидным',
      };
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length === 0 ||
      !validatePassword(password)
    ) {
      return {
        isValid: false,
        error: 'Пароль не должен быть пустым, должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву, один специальный символ и быть не менее 8 символов',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  };

  User.validateSignUpData = ({ username, email, password }) => {
    if (
      !username ||
      typeof username !== 'string' ||
      username.trim().length === 0
    ) {
      return {
        isValid: false,
        error: 'Поле username не должно быть пустым',
      };
    }

    if (
      !email ||
      typeof email !== 'string' ||
      email.trim().length === 0 ||
      !validateEmail(email)
    ) {
      return {
        isValid: false,
        error: 'Email должен быть валидным',
      };
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length === 0 ||
      !validatePassword(password)
    ) {
      return {
        isValid: false,
        error: 'Пароль не должен быть пустым, должен содержать одну большую букву, одну маленькую, один специальный символ, и не должен быть короче 8 символов',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  };

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 30]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 100]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        user.email = user.email.trim().toLowerCase();
        user.username = user.username.trim().toLowerCase();
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
        if (user.changed('email')) {
          user.email = user.email.trim().toLowerCase();
        }
        if (user.changed('username')) {
          user.username = user.username.trim().toLowerCase();
        }
      }
    }
  });

  return User;
};