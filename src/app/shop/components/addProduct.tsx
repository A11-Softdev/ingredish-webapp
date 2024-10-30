import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { compressImage, uploadProductImage } from '@/utils/uploadImage';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { shopApi } from '../api/shop';

interface FormErrors {
    amount?: string;
    name?: string;
    price?: string;
    description?: string;
}

export const AddProduct = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        amount: 0,
        price: 0,
        image_url: '',
    });

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!productForm.name.trim()) {
            newErrors.name = 'กรุณากรอกชื่อสินค้า';
        }

        if (!productForm.description.trim()) {
            newErrors.description = 'กรุณากรอกรายละเอียดสินค้า';
        }

        if (!productForm.amount || productForm.amount <= 0) {
            newErrors.amount = 'กรุณากรอกจำนวนสินค้าที่ถูกต้อง';
        }

        if (!productForm.price || productForm.price <= 0) {
            newErrors.price = 'กรุณากรอกราคาที่ถูกต้อง';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductForm(prev => ({
            ...prev,
            [name]: value
        }));
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

    const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProductForm({
            name: '',
            description: '',
            amount: 0,
            price: 0,
            image_url: '',
        });
        setImagePreview('');
        setErrors({
            name: '',
            description: '',
            amount: '',
            price: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            let imageUrl = '';
            if (imageFile) {
                setIsUploading(true);
                imageUrl = await uploadProductImage(imageFile, (process) => {
                    setUploadProgress(process);
                });
                setIsUploading(false);
            }

            const productData = {
                ...productForm,
                image_url: imageUrl,
            }

            await shopApi.createProduct(productData);
        } catch (error) {
            console.log("Error : ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[81vh] mx-auto bg-background flex-col p-10">
            <p className="flex justify-center text-4xl font-black mb-6">เพิ่มสินค้า</p>
            <form
                onSubmit={handleSubmit}
                className="gap-6 w-full justify-center"
            >
                <div className="flex justify-center">
                    <div className="relative w-64 h-64">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-full rounded-2xl overflow-hidden bg-gray-400 hover:bg-gray-600 transition-colors duration-200 flex flex-col items-center justify-center relative"
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

                <div className="mt-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label>ชื่อสินค้า</label>
                        <input
                            type="text"
                            name="name"
                            value={productForm.name}
                            onChange={handleInputChange}
                            className={`border p-2 rounded-md ${errors.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && (
                            <span className="text-red-500 mt-1">{errors.name}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>รายละเอียดสินค้า</label>
                        <input
                            type="text"
                            name="description"
                            value={productForm.description}
                            onChange={handleInputChange}
                            className={`border p-2 rounded-md ${errors.description ? "border-red-500" : ""}`}
                        />
                        {errors.description && (
                            <span className="text-red-500 mt-1">{errors.description}</span>
                        )}
                    </div>

                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-1">
                            <label>จำนวนสินค้า</label>
                            <input
                                type="number"
                                name="amount"
                                value={productForm.amount}
                                onChange={handleInputChange}
                                className={`border p-2 rounded-md ${errors.amount ? "border-red-500" : ""}`}
                            />
                            {errors.amount && (
                                <span className="text-red-500 mt-1">{errors.amount}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>ราคา</label>
                            <input
                                type="number"
                                name="price"
                                value={productForm.price}
                                onChange={handleInputChange}
                                className={`border p-2 rounded-md ${errors.price ? "border-red-500" : ""}`}
                            />
                            {errors.price && (
                                <span className="text-red-500 mt-1">{errors.price}</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-12 mb-6">
                        <button
                            type="submit"
                            className="bg-success hover:bg-[#94c45d] text-white font-bold py-4 px-6 rounded"
                        >
                            เพิ่ม
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-300 text-white font-bold py-4 px-6 rounded"
                            onClick={(e) => {
                                resetForm(e);
                            }}
                        >
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;