const bcrypt = require("bcrypt");

const userSchema = require("../models/UserSchema");
const productSchema = require("../models/ProductSchema");

class MongoData {
  static INSTANCE;

  constructor() {}

  static getInstance() {
    if (!MongoData.INSTANCE) {
      MongoData.INSTANCE = new MongoData();
    }

    return MongoData.INSTANCE;
  }

  /**
   * @param {string} username 
   * @param {string} password 
   */
  async createUser(username, password) {
    let newUser;
    const saltRounds = 10;
    
    try {
      const hashedPassword = await Promise.resolve(bcrypt.hash(password, saltRounds));
  
      newUser = await userSchema.create(
        {
          username,
          password: hashedPassword
        }
      )
    } catch (error) {
      throw new Error(error);
    }

    return newUser;
  }

  /**
   * 
   * @param {string} username 
   * @param {string} password 
   */
  async authenticateUser(username, password) {
    try {
      const user = await userSchema.findOne({
        username
      }).exec();

      if (!user) {
        throw new Error("User does not exist!");
      }

      if (user.username === username) {
        const isPasswordCorrect = await Promise.resolve(bcrypt.compare(password, user.password));
        
        if (isPasswordCorrect) {
          return user;
        } else {
          throw new Error("Password is incorrect");
        } 
      } else {
        throw new Error("User not found!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  async listProducts() {
    let results;

    try {
      results = await productSchema.find().exec();
    } catch (error) {
      throw new Error(error);
    }

    return results;
  }

  /**
   * @param {string} title
   * @param {number} price
   * @param {number} quantity
   */
  async createProduct(title, price, quantity) {
    let createdProduct;

    try {
      createdProduct = await productSchema.create({
        title,
        price,
        quantity,
      });
    } catch (error) {
      throw new Error(error);
    }

    return createdProduct;
  }

  /** 
   * @param {string} id 
   */
  async deleteProduct(id) {
    let deletedProduct;

    try {
      deletedProduct = await productSchema.findOneAndDelete({
        _id: id
      }).exec();
    } catch (error) {
      throw new Error(error);
    }
    
    return deletedProduct;
  }
}

module.exports = { MongoData }
