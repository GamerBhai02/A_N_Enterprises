import { Db } from './connect';

// Define TypeScript interfaces for our data models
export interface User {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'customer' | 'admin';
  createdAt: Date;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  tags: string[];
  inStock: boolean;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
}

export interface Order {
  _id?: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
}

export interface DesignRequest {
  _id?: string;
  userId: string;
  textPrompt: string;
  imageUrls: string[];
  selectedImageUrl: string;
  status: 'new' | 'generating' | 'generated' | '3d_converting' | '3d_ready';
  threeDModelUrl?: string;
  createdAt: Date;
}

// Create collections for each model
export async function createUserCollection(db: Db) {
  const database = db.client.db('an-furnish');
  return database.collection<User>('users');
}

export async function createProductCollection(db: Db) {
  const database = db.client.db('an-furnish');
  return database.collection<Product>('products');
}

export async function createCartCollection(db: Db) {
  const database = db.client.db('an-furnish');
  return database.collection<Cart>('carts');
}

export async function createOrderCollection(db: Db) {
  const database = db.client.db('an-furnish');
  return database.collection<Order>('orders');
}

export async function createDesignRequestCollection(db: Db) {
  const database = db.client.db('an-furnish');
  return database.collection<DesignRequest>('design-requests');
}