/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Product, JournalArticle } from './types';

export const BRAND_NAME = 'AyaanAyaat Homes';
export const NAVY_BLUE = '#002147';
export const METALLIC_GOLD = '#D4AF37';

export const MALE_PACKAGES = [
  {
    name: 'Standard Shared',
    price: '৳ ৫,৫০০ / মাস',
    features: ['৪ জন শেয়ারিং', 'কমন ওয়াশরুম', 'হাই-স্পিড ওয়াইফাই', '৩ বেলা খাবার']
  },
  {
    name: 'Executive Shared',
    price: '৳ ৭,৫০০ / মাস',
    features: ['২ জন শেয়ারিং', 'অ্যাটাচড ওয়াশরুম', 'এসি সুবিধা (ঐচ্ছিক)', 'জিম এক্সেস']
  },
  {
    name: 'Premium Solo',
    price: '৳ ১২,০০০ / মাস',
    features: ['সিঙ্গেল রুম', 'অ্যাটাচড ওয়াশরুম', 'ফুল ফার্নিশড', 'ভিআইপি ডাইনিং']
  }
];

export const FEMALE_PACKAGES = [
  {
    name: 'Comfort Shared',
    price: '৳ ৬,০০০ / মাস',
    features: ['৪ জন শেয়ারিং', '২৪/৭ সিসিটিভি', 'মহিলা গার্ড', '৩ বেলা ঘরোয়া খাবার']
  },
  {
    name: 'Elite Shared',
    price: '৳ ৮,৫০০ / মাস',
    features: ['২ জন শেয়ারিং', 'অ্যাটাচড ওয়াশরুম', 'লন্ড্রি সুবিধা', '২৪/৭ পাওয়ার ব্যাকআপ']
  },
  {
    name: 'Royal Solo',
    price: '৳ ১৪,০০০ / মাস',
    features: ['সিঙ্গেল লাক্সারি রুম', 'ব্যক্তিগত বারান্দা', 'উন্নত সিকিউরিটি', 'স্পেশাল মিল']
  }
];

/** Fix: Exporting mock PRODUCTS data for the Aura Design collection */
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aura Speaker',
    price: 299,
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=800',
    description: 'Minimalist audio.',
    longDescription: 'A seamless blend of sound and stone. The Aura speaker provides high-fidelity audio in a package that looks like a natural object.',
    features: ['Natural Sandstone', '30h Battery', 'Bluetooth 5.2']
  },
  {
    id: 'p2',
    name: 'Linen Wearable',
    price: 150,
    category: 'Wearable',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    description: 'Calm technology.',
    longDescription: 'Wearable technology that respects your skin and your peace of mind. Made from premium organic linen.',
    features: ['Organic Linen', 'Breathable', 'Calm Alerts']
  },
  {
    id: 'p3',
    name: 'Aluminum Slate',
    price: 850,
    category: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    description: 'Raw metal finish.',
    longDescription: 'An unpolished aluminum tablet that gains character as you use it. Powerful yet understated.',
    features: ['Recycled Aluminum', 'Patina Finish', 'High Resolution']
  }
];

/** Fix: Exporting mock JOURNAL_ARTICLES data for the editorial section */
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j1',
    title: 'The Art of Materiality',
    date: 'March 10, 2025',
    excerpt: 'Why we choose sandstone, aluminum, and linen.',
    content: 'We believe that the materials you surround yourself with should have a physical presence. They should feel cold in the morning and warm in the evening...',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'j2',
    title: 'Finding Silence',
    date: 'Feb 15, 2025',
    excerpt: 'Designing products that don\'t demand your attention.',
    content: 'In an age of infinite distraction, we design objects that respect your silence. We use materials that age gracefully...',
    image: 'https://images.pexels.com/photos/6801917/pexels-photo-6801917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];
