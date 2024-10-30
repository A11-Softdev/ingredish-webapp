"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Phone, Plus, X, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { shopApi } from '../api/shop';
import { uploadShopImage } from '@/utils/uploadImage';
import { compressImage } from '@/utils/uploadImage';

interface FormErrors {
    name?: string;
    phone?: string;
    contact?: string;
    address?: string;
}

export default function ShopCreationForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        name: '',
        image_url: '',
        contact: [''],
        address: '',
        phone: '',
        product: [] as string[]
    });

    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Shop name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.contact[0]?.trim()) {
            newErrors.contact = 'At least one contact method is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);

                const compressedFile = await compressImage(file);
                setImageFile(compressedFile);
            } catch (error) {
                toast.error('Error preparing image for upload');
                console.error('Image preparation error:', error);
            }
        }
    };

    const handleContactAdd = () => {
        setFormData(prev => ({
            ...prev,
            contact: [...prev.contact, '']
        }));
    };

    const handleContactRemove = (index: number) => {
        setFormData(prev => ({
            ...prev,
            contact: prev.contact.filter((_, i) => i !== index)
        }));
    };

    const handleContactChange = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            contact: prev.contact.map((c, i) => i === index ? value : c)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsLoading(true);

        try {
            let imageUrl = '';
            if (imageFile) {
                setIsUploading(true);
                imageUrl = await uploadShopImage(imageFile, (progress) => {
                    setUploadProgress(progress);
                });
                setIsUploading(false);
            }

            const shopData = {
                ...formData,
                image_url: imageUrl || formData.image_url,
                contact: formData.contact.filter(c => c.trim()),
            };

            await shopApi.createShop(shopData);

            toast.success('Shop created successfully!');
            router.push('/feedHome');
        } catch (error) {
            let errorMessage = 'Failed to create shop';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            console.error('Shop creation error:', error);
        } finally {
            setIsLoading(false);
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center mb-10">Create Your Shop</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        <div className="relative w-64 h-64">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-full rounded-2xl overflow-hidden bg-[#80AA50] hover:bg-[#6d9343] transition-colors duration-200 flex flex-col items-center justify-center relative"
                                disabled={isUploading}
                            >
                                {imagePreview ? (
                                    <>
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                                <p className="text-white mt-2">{Math.round(uploadProgress)}%</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-white flex flex-col items-center">
                                        <Upload className="h-12 w-12" />
                                        <span className="mt-2">Upload Shop Image</span>
                                    </div>
                                )}
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isUploading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Shop Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter shop name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter phone number"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Contact Methods <span className="text-red-500">*</span>
                        </label>
                        {formData.contact.map((contact, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={contact}
                                    onChange={(e) => handleContactChange(index, e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${index === 0 && errors.contact ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter contact method (e.g., LINE, Facebook)"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleContactRemove(index)}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <X />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleContactAdd}
                            className="flex items-center gap-2 text-[#80AA50] hover:text-[#6d9343]"
                        >
                            <Plus />
                            Add Contact Method
                        </button>
                        {errors.contact && (
                            <p className="text-red-500 text-sm">{errors.contact}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={3}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter shop address"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address}</p>
                        )}
                    </div>

                    <div className="flex justify-center gap-4 pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-dark-yellow text-black px-8 py-3 rounded-lg hover:bg-[#6d9343] transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                    Creating...
                                </>
                            ) : (
                                'Create Shop'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}