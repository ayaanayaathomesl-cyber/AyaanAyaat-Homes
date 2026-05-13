import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db, storage, handleFirestoreError, OperationType } from '../src/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Settings, LogOut, Upload, Plus, Trash2, Save, Image as ImageIcon, FileVideo, Home, ArrowLeft, Edit, X } from 'lucide-react';
import { ViewState } from '../types';

let resolvePrompt: ((value: {cloudName: string, uploadPreset: string} | null) => void) | null = null;

export const requestCloudinaryConfig = (): Promise<{cloudName: string, uploadPreset: string} | null> => {
  return new Promise((resolve) => {
    resolvePrompt = resolve;
    window.dispatchEvent(new CustomEvent('open-cloudinary-config'));
  });
};

let resolveConfirm: ((value: boolean) => void) | null = null;
export const requestConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    resolveConfirm = resolve;
    window.dispatchEvent(new CustomEvent('open-confirm', { detail: { message } }));
  });
};

function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const onOpen = (e: Event) => {
      setMessage((e as CustomEvent).detail.message);
      setIsOpen(true);
    };
    window.addEventListener('open-confirm', onOpen);
    return () => window.removeEventListener('open-confirm', onOpen);
  }, []);

  const handleAction = (result: boolean) => {
    setIsOpen(false);
    if (resolveConfirm) resolveConfirm(result);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => handleAction(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
          <button onClick={() => handleAction(true)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors">Confirm</button>
        </div>
      </div>
    </div>
  );
}

function CloudinaryConfigModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cloudName, setCloudName] = useState('');
  const [uploadPreset, setUploadPreset] = useState('');

  useEffect(() => {
    const onOpen = () => {
      setCloudName(localStorage.getItem('cloudinary_cloud_name') || '');
      setUploadPreset(localStorage.getItem('cloudinary_upload_preset') || '');
      setIsOpen(true);
    };
    window.addEventListener('open-cloudinary-config', onOpen);
    return () => window.removeEventListener('open-cloudinary-config', onOpen);
  }, []);

  const handleSave = () => {
    if (cloudName && uploadPreset) {
      localStorage.setItem('cloudinary_cloud_name', cloudName);
      localStorage.setItem('cloudinary_upload_preset', uploadPreset);
      setIsOpen(false);
      if (resolvePrompt) resolvePrompt({cloudName, uploadPreset});
    } else {
      alert('Please fill out both fields');
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolvePrompt) resolvePrompt(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Cloudinary Configuration</h2>
        <p className="text-gray-600 mb-4 text-sm">To upload images/videos, configure your free Cloudinary account.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cloud Name</label>
            <input 
              type="text" 
              value={cloudName} 
              onChange={e => setCloudName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
              placeholder="e.g. dxkypqn..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Preset (Unsigned)</label>
            <input 
              type="text" 
              value={uploadPreset} 
              onChange={e => setUploadPreset(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
              placeholder="e.g. my_preset"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#D4AF37] hover:bg-[#c4a133] text-white rounded-lg font-bold transition-colors">Save & Continue</button>
        </div>
      </div>
    </div>
  );
}

interface AdminProps {
  onNavigate?: (view: ViewState) => void;
}

export default function Admin({ onNavigate }: AdminProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'bachelor' | 'queens'>('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  const handleGoogleLogin = async () => {
    setLoginError('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error: any) {
      console.error(error);
      setLoginError(error.message || 'Login failed');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
      setLoginError('Invalid email or password');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setLoginError('Please enter your email address to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setLoginError('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      console.error(error);
      setLoginError(error.message || 'Failed to send reset email');
    }
  };

  const handleLogout = () => signOut(auth);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center relative border border-gray-100">
          {onNavigate && (
            <button 
              onClick={() => onNavigate({ type: 'home' })}
              className="absolute top-4 left-4 text-gray-400 hover:text-[#002147] transition-colors p-2 flex items-center gap-1 font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </button>
          )}
          <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg mt-4">
            <Settings className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-[#002147] mb-2">Admin Portal</h1>
          <p className="text-gray-500 mb-6 font-medium">Please sign in to manage content</p>
          
          {loginError && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${loginError.includes('sent') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-[#002147] hover:text-[#D4AF37] font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#002147] hover:bg-[#003366] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-medium">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-xl border border-gray-200 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col md:flex-row z-[100] overflow-hidden">
      <CloudinaryConfigModal />
      <ConfirmModal />
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#002147] text-white flex-shrink-0 flex flex-col relative h-auto md:h-full z-[70] shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between md:block">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="font-black text-xl tracking-tight">Admin</h1>
          </div>
          <div className="md:hidden flex gap-2">
            {onNavigate && (
              <button 
                onClick={() => onNavigate({ type: 'home' })} 
                className="p-2 text-white/70 hover:text-white rounded-lg bg-white/5"
              >
                <Home className="w-5 h-5" />
              </button>
            )}
            <button onClick={handleLogout} className="p-2 text-white/70 hover:text-white rounded-lg bg-white/5">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6 flex space-x-2 md:space-x-0 md:flex-col md:space-y-2 overflow-x-auto md:overflow-x-visible">
          {[
            { id: 'home', label: 'Home Page' },
            { id: 'bachelor', label: 'Bachelor Point' },
            { id: 'queens', label: 'Queens Point' },
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-left px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-[#D4AF37] font-bold shadow-lg text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10 hidden md:flex flex-col gap-2">
           {onNavigate && (
             <button
              onClick={() => onNavigate({ type: 'home' })}
              className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c4a133] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg"
            >
              <Home className="w-5 h-5" />
              Return to Website
            </button>
           )}
           <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0">
        <div className="max-w-6xl mx-auto space-y-8">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             {activeTab === 'home' && <HomeSettings />}
             {activeTab === 'bachelor' && <BranchSettings branch="bachelor" prefix="bachelorpoint" />}
             {activeTab === 'queens' && <BranchSettings branch="queens" prefix="queenspoint" />}
           </div>
        </div>
      </div>
    </div>
  );
}

function HomeSettings() {
  const [philosophyImages, setPhilosophyImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'philosophy'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.images && Array.isArray(data.images) && data.images.length > 0) {
          setPhilosophyImages(data.images);
        } else if (data.imageUrl) {
          setPhilosophyImages([data.imageUrl]);
        } else {
          setPhilosophyImages([]);
        }
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'settings/philosophy'));
    return unsub;
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 32 * 1024 * 1024) {
      alert("File is too large. Please keep it under 32MB.");
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || localStorage.getItem('cloudinary_cloud_name');
      let uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || localStorage.getItem('cloudinary_upload_preset');
      
      if (!cloudName || !uploadPreset) {
        const config = await requestCloudinaryConfig();
        if (!config) { setUploading(false); e.target.value = ''; return; }
        cloudName = config.cloudName;
        uploadPreset = config.uploadPreset;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        await setDoc(doc(db, 'settings', 'philosophy'), { 
          images: [...philosophyImages, data.secure_url],
          updatedAt: Date.now()
        }, { merge: true });
      } else {
        alert('Upload failed: ' + data.error?.message);
        if (data.error?.message?.includes('Upload preset')) {
             localStorage.removeItem('cloudinary_upload_preset');
        }
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert('Upload failed: ' + (error?.message || String(error)));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const deleteImage = async (urlStr: string) => {
    if (await requestConfirm('Are you sure you want to delete this image?')) {
       try {
         const { deleteField } = await import('firebase/firestore');
         const newImages = philosophyImages.filter(img => img !== urlStr);
         await updateDoc(doc(db, 'settings', 'philosophy'), { 
           images: newImages,
           imageUrl: deleteField() 
         });
       } catch (e) {
         handleFirestoreError(e, OperationType.UPDATE, 'settings/philosophy');
       }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[#002147]">Our Philosophy Images</h2>
      
      <div className="space-y-4">
        {philosophyImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
             {philosophyImages.map((img, i) => (
                <div key={i} className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-100 group">
                   <img src={img} className="w-full h-full object-cover" alt="Philosophy" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => deleteImage(img)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer">
                         <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             ))}
          </div>
        )}
        
        <label className="inline-flex items-center gap-2 cursor-pointer bg-[#002147] hover:bg-[#001530] text-white font-bold py-3 px-6 rounded-xl transition-colors mt-4">
          <Upload className="w-5 h-5" />
          <span>{uploading ? 'Uploading...' : 'Upload New Image'}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}

function BranchSettings({ branch, prefix }: { branch: string, prefix: string }) {
  const [activeSection, setActiveSection] = useState<'pricing' | 'menu' | 'gallery'>('pricing');

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-[#002147] capitalize">{branch} Point Settings</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setActiveSection('pricing')} 
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeSection === 'pricing' ? 'bg-[#002147] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Pricing Table
        </button>
        <button 
          onClick={() => setActiveSection('menu')} 
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeSection === 'menu' ? 'bg-[#002147] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Food Menu
        </button>
        <button 
          onClick={() => setActiveSection('gallery')} 
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeSection === 'gallery' ? 'bg-[#002147] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Gallery Media
        </button>
      </div>

      {activeSection === 'pricing' && <PricesSettings prefix={prefix} />}
      {activeSection === 'menu' && <MenuSettings prefix={prefix} />}
      {activeSection === 'gallery' && <GallerySettings prefix={prefix} />}
    </div>
  );
}

function PriceRow({ p, updateRow, delPrice }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...p });

  const handleSave = () => {
    updateRow(p.id, formData);
    setIsEditing(false);
  };

  const handleChange = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors h-16 border-b border-gray-100 last:border-0">
      {isEditing ? (
        <>
          <td className="p-3"><input className="border border-gray-200 rounded-lg p-2 text-sm w-full font-bold focus:ring-2 focus:ring-[#D4AF37] outline-none" value={formData.type} onChange={e=>handleChange('type', e.target.value)} /></td>
          <td className="p-3"><input placeholder="-" className="border border-gray-200 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none" value={formData.d1} onChange={e=>handleChange('d1', e.target.value)} /></td>
          <td className="p-3"><input placeholder="-" className="border border-gray-200 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none" value={formData.d3} onChange={e=>handleChange('d3', e.target.value)} /></td>
          <td className="p-3"><input placeholder="-" className="border border-gray-200 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none" value={formData.d7} onChange={e=>handleChange('d7', e.target.value)} /></td>
          <td className="p-3"><input placeholder="-" className="border border-gray-200 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none" value={formData.d15} onChange={e=>handleChange('d15', e.target.value)} /></td>
          <td className="p-3"><input placeholder="-" className="border border-gray-200 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none" value={formData.monthly} onChange={e=>handleChange('monthly', e.target.value)} /></td>
          <td className="p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <button onClick={handleSave} className="text-green-600 hover:text-white hover:bg-green-600 p-2 rounded-lg transition-colors" title="Save"><Save className="w-5 h-5"/></button>
              <button onClick={() => { setFormData({...p}); setIsEditing(false); }} className="text-gray-500 hover:text-white hover:bg-gray-500 p-2 rounded-lg transition-colors" title="Cancel"><X className="w-5 h-5"/></button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="p-3 font-semibold">{p.type}</td>
          <td className="p-3">{p.d1 || '-'}</td>
          <td className="p-3">{p.d3 || '-'}</td>
          <td className="p-3">{p.d7 || '-'}</td>
          <td className="p-3">{p.d15 || '-'}</td>
          <td className="p-3">{p.monthly || '-'}</td>
          <td className="p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-white hover:bg-blue-500 p-2 rounded-lg transition-colors" title="Edit"><Edit className="w-5 h-5"/></button>
              <button onClick={() => delPrice(p.id)} className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-colors" title="Delete"><Trash2 className="w-5 h-5"/></button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

function PricesSettings({ prefix }: { prefix: string }) {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, `${prefix}_prices`), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a: any, b: any) => a.order - b.order);
      setPrices(items);
    }, (error) => handleFirestoreError(error, OperationType.GET, `${prefix}_prices`));
    return unsub;
  }, [prefix]);

  const addPrice = async () => {
    try {
      const id = Date.now().toString();
      await setDoc(doc(db, `${prefix}_prices`, id), {
        type: 'New Package',
        d1: '', d3: '', d7: '', d15: '', monthly: '',
        order: prices.length,
        updatedAt: Date.now()
      });
    } catch (e) { handleFirestoreError(e, OperationType.CREATE, `${prefix}_prices`); }
  };

  const updateRow = async (id: string, data: any) => {
    try {
      const { id: _, ...rest } = data;
      await updateDoc(doc(db, `${prefix}_prices`, id), { ...rest, updatedAt: Date.now() });
    } catch (e) { handleFirestoreError(e, OperationType.UPDATE, `${prefix}_prices`); }
  };

  const delPrice = async (id: string) => {
    if(await requestConfirm('Are you sure you want to delete this pricing row?')) {
      try {
        await deleteDoc(doc(db, `${prefix}_prices`, id));
      } catch (e) { handleFirestoreError(e, OperationType.DELETE, `${prefix}_prices`); }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#002147]">Pricing Table</h3>
        <div className="flex gap-2">
          <button onClick={addPrice} className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm"><Plus className="w-4 h-4"/> Add Row</button>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 rounded-xl border border-gray-100 shadow-sm bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#002147]/5 text-[#002147] font-semibold">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">1 Day</th>
              <th className="p-4">3 Days</th>
              <th className="p-4">7 Days</th>
              <th className="p-4">15 Days</th>
              <th className="p-4">1 Month</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prices.map(p => (
              <PriceRow key={p.id} p={p} updateRow={updateRow} delPrice={delPrice} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MenuRow({ m, updateRow, delMenu }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...m });

  const handleSave = () => {
    updateRow(m.id, formData);
    setIsEditing(false);
  };

  const handleChange = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      {isEditing ? (
        <>
          <td className="p-3 align-top"><input className="border border-gray-200 rounded-lg p-2 text-sm w-full font-bold focus:ring-2 focus:ring-[#D4AF37] outline-none" value={formData.day} onChange={e=>handleChange('day', e.target.value)} /></td>
          <td className="p-3 align-top"><textarea className="border border-gray-200 rounded-lg p-2 w-full text-sm min-h-[80px] focus:ring-2 focus:ring-[#D4AF37] outline-none resize-y" value={formData.breakfast} onChange={e=>handleChange('breakfast', e.target.value)} /></td>
          <td className="p-3 align-top"><textarea className="border border-gray-200 rounded-lg p-2 w-full text-sm min-h-[80px] focus:ring-2 focus:ring-[#D4AF37] outline-none resize-y" value={formData.lunch} onChange={e=>handleChange('lunch', e.target.value)} /></td>
          <td className="p-3 align-top"><textarea className="border border-gray-200 rounded-lg p-2 w-full text-sm min-h-[80px] focus:ring-2 focus:ring-[#D4AF37] outline-none resize-y" value={formData.dinner} onChange={e=>handleChange('dinner', e.target.value)} /></td>
          <td className="p-3 text-center align-middle border-l border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <button onClick={handleSave} className="text-green-600 hover:text-white hover:bg-green-600 p-2 rounded-lg transition-colors" title="Save"><Save className="w-5 h-5"/></button>
              <button onClick={() => { setFormData({...m}); setIsEditing(false); }} className="text-gray-500 hover:text-white hover:bg-gray-500 p-2 rounded-lg transition-colors" title="Cancel"><X className="w-5 h-5"/></button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="p-3 font-semibold whitespace-nowrap align-top">{m.day}</td>
          <td className="p-3 align-top text-gray-600 whitespace-pre-wrap">{m.breakfast || '-'}</td>
          <td className="p-3 align-top text-gray-600 whitespace-pre-wrap">{m.lunch || '-'}</td>
          <td className="p-3 align-top text-gray-600 whitespace-pre-wrap">{m.dinner || '-'}</td>
          <td className="p-3 text-center align-middle border-l border-gray-100">
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-white hover:bg-blue-500 p-2 rounded-lg transition-colors" title="Edit"><Edit className="w-5 h-5"/></button>
              <button onClick={() => delMenu(m.id)} className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-colors" title="Delete"><Trash2 className="w-5 h-5"/></button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

function MenuSettings({ prefix }: { prefix: string }) {
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, `${prefix}_menu`), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a: any, b: any) => a.order - b.order);
      setMenus(items);
    }, (error) => handleFirestoreError(error, OperationType.GET, `${prefix}_menu`));
    return unsub;
  }, [prefix]);

  const addMenu = async () => {
    try {
      const id = Date.now().toString();
      await setDoc(doc(db, `${prefix}_menu`, id), {
        day: 'New Day', breakfast: '', lunch: '', dinner: '',
        order: menus.length,
        updatedAt: Date.now()
      });
    } catch (e) { handleFirestoreError(e, OperationType.CREATE, `${prefix}_menu`); }
  };

  const updateRow = async (id: string, data: any) => {
    try {
      const { id: _, ...rest } = data;
      await updateDoc(doc(db, `${prefix}_menu`, id), { ...rest, updatedAt: Date.now() });
    } catch (e) { handleFirestoreError(e, OperationType.UPDATE, `${prefix}_menu`); }
  };

  const delMenu = async (id: string) => {
    if(await requestConfirm('Are you sure you want to delete this menu row?')) {
      try {
        await deleteDoc(doc(db, `${prefix}_menu`, id));
      } catch (e) { handleFirestoreError(e, OperationType.DELETE, `${prefix}_menu`); }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#002147]">Food Menu</h3>
        <div className="flex gap-2">
          <button onClick={addMenu} className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm"><Plus className="w-4 h-4"/> Add Row</button>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 rounded-xl border border-gray-100 shadow-sm bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#002147]/5 text-[#002147] font-semibold">
            <tr>
              <th className="p-4 w-[15%]">Day</th>
              <th className="p-4 w-[25%]">Breakfast</th>
              <th className="p-4 w-[25%]">Lunch</th>
              <th className="p-4 w-[25%]">Dinner</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {menus.map(m => (
              <MenuRow key={m.id} m={m} updateRow={updateRow} delMenu={delMenu} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GallerySettings({ prefix }: { prefix: string }) {
  const [gallery, setGallery] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, `${prefix}_gallery`), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a: any, b: any) => b.createdAt - a.createdAt);
      setGallery(items);
    }, (error) => handleFirestoreError(error, OperationType.GET, `${prefix}_gallery`));
    return unsub;
  }, [prefix]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if image or video
    const isVideo = file.type.startsWith('video/');
    const type = isVideo ? 'video' : 'image';

    if (file.size > 100 * 1024 * 1024) {
      alert("File is too large. Please keep it under 100MB.");
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || localStorage.getItem('cloudinary_cloud_name');
      let uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || localStorage.getItem('cloudinary_upload_preset');
      
      if (!cloudName || !uploadPreset) {
        const config = await requestCloudinaryConfig();
        if (!config) { setUploading(false); e.target.value = ''; return; }
        cloudName = config.cloudName;
        uploadPreset = config.uploadPreset;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const endpoint = isVideo ? 'video/upload' : 'image/upload';
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        await setDoc(doc(db, `${prefix}_gallery`, Date.now().toString()), { 
          url: data.secure_url,
          type,
          storagePath: '',
          createdAt: Date.now()
        });
      } else {
        alert('Upload failed: ' + data.error?.message);
        if (data.error?.message?.includes('Upload preset')) {
             localStorage.removeItem('cloudinary_upload_preset');
        }
      }
    } catch (error: any) {
      console.error(error);
      alert('Upload failed: ' + (error?.message || String(error)));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const delItem = async (p: any) => {
    if(await requestConfirm('Delete this media?')) {
      try {
        await deleteDoc(doc(db, `${prefix}_gallery`, p.id));
        if (p.storagePath) {
          try {
            await deleteObject(ref(storage, p.storagePath));
          } catch(e) {
            console.error("Failed to delete from storage", e);
          }
        }
      } catch (e) { handleFirestoreError(e, OperationType.DELETE, `${prefix}_gallery`); }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#002147]">Gallery Media</h3>
        <label className="cursor-pointer bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
           <Upload className="w-4 h-4"/>
           <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
           <input type="file" accept="image/*,video/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {gallery.map(item => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-[4/5] border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            {item.type === 'video' ? (
              <video src={item.url} className="w-full h-full object-cover" controls muted />
            ) : (
              <img src={item.url} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt="" />
            )}
            
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                  onClick={() => delItem(item)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg transform transition hover:scale-110"
               >
                 <Trash2 className="w-4 h-4" />
               </button>
            </div>
            
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-md font-medium flex items-center shadow-lg">
               {item.type === 'video' ? <FileVideo className="w-3.5 h-3.5 mr-1.5"/> : <ImageIcon className="w-3.5 h-3.5 mr-1.5"/>}
               <span className="capitalize">{item.type}</span>
            </div>
          </div>
        ))}
        {gallery.length === 0 && !uploading && (
           <div className="col-span-full py-16 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
             <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
             <p className="font-medium text-lg">No media uploaded yet.</p>
             <p className="text-sm">Upload images or videos to see them here.</p>
           </div>
        )}
      </div>
    </div>
  );
}
