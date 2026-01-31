/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'male-hostel' }
  | { type: 'female-hostel' }
  | { type: 'contact' };

export interface Package {
  name: string;
  price: string;
  features: string[];
}

/** Fix: Defining Product interface for design and store components */
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  longDescription?: string;
  features: string[];
}

/** Fix: Defining JournalArticle interface for editorial components */
export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}
