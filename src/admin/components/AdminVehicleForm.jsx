// src/admin/components/AdminVehicleForm.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../components/atoms/Button';
import { useUploadVehicleImageMutation } from '../../../store/api'; // <-- Import the new hook

// Utility to generate a simple unique ID (for mock data)
const generateUniqueId = () => `v${Date.now()}`;

const AdminVehicleForm = ({ vehicle, onSubmit, onCancel }) => {
    // Initialize form state with existing vehicle data or empty values for new vehicle
    const [formData, setFormData] = useState({
        id: vehicle ? vehicle.id : generateUniqueId(),
        make: vehicle ? vehicle.make : '',
        model: vehicle ? vehicle.model : '',
        year: vehicle ? vehicle.year : '',
        price: vehicle ? vehicle.price : '',
        mileage: vehicle ? vehicle.mileage : '',
        exteriorColor: vehicle ? vehicle.exteriorColor : '',
        interiorColor: vehicle ? vehicle.interiorColor : '',
        engine: vehicle ? vehicle.engine : '',
        transmission: vehicle ? vehicle.transmission : '',
        fuelType: vehicle ? vehicle.fuelType : '',
        // Initialize imageUrls as an empty array or from existing vehicle data
        imageUrls: vehicle ? vehicle.image_urls || [] : [],
        features: vehicle ? vehicle.features.join(', ') : '', // Convert array to comma-separated string
        description: vehicle ? vehicle.description : '',
        status: vehicle ? vehicle.status : 'available',
        isFeatured: vehicle ? vehicle.isFeatured : false,
        lastUpdated: vehicle ? vehicle.lastUpdated : new Date().toISOString(),
    });

    // RTK Query mutation hook for image upload
    const [uploadVehicleImage, { isLoading: uploading }] = useUploadVehicleImageMutation();

    // Update form data if the `vehicle` prop changes (e.g., when switching from add to edit mode)
    useEffect(() => {
        if (vehicle) {
            setFormData({
                id: vehicle.id,
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year,
                price: vehicle.price,
                mileage: vehicle.mileage,
                exteriorColor: vehicle.exteriorColor,
                interiorColor: vehicle.interiorColor,
                engine: vehicle.engine,
                transmission: vehicle.transmission,
                fuelType: vehicle.fuelType,
                imageUrls: vehicle.image_urls || [], // Use the new imageUrls field
                features: vehicle.features.join(', '),
                description: vehicle.description,
                status: vehicle.status,
                isFeatured: vehicle.isFeatured,
                lastUpdated: vehicle.lastUpdated,
            });
        } else {
            // Reset form for a new vehicle if `vehicle` prop is null
            setFormData({
                id: generateUniqueId(),
                make: '',
                model: '',
                year: '',
                price: '',
                mileage: '',
                exteriorColor: '',
                interiorColor: '',
                engine: '',
                transmission: '',
                fuelType: '',
                imageUrls: [], // Reset image URLs for a new vehicle
                features: '',
                description: '',
                status: 'available',
                isFeatured: false,
                lastUpdated: new Date().toISOString(),
            });
        }
    }, [vehicle]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handler when user picks files
    const handleFilesChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        // build FormData for the upload mutation
        const fd = new FormData();
        files.forEach((f) => fd.append('files', f));

        try {
            // Call the upload mutation and unwrap the result
            const { urls } = await uploadVehicleImage(fd).unwrap();
            
            // Merge the new URLs into the form state
            setFormData((f) => ({
                ...f,
                imageUrls: [...f.imageUrls, ...urls], // Merge with existing URLs
            }));
        } catch (err) {
            console.error('Image upload failed', err);
            // TODO: show a user-friendly error toast
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare data for submission: convert features string back to array
        const dataToSubmit = {
            ...formData,
            features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
            // Ensure numeric fields are numbers
            year: parseInt(formData.year, 10),
            price: parseFloat(formData.price),
            // mileage needs careful parsing as it has "miles", leaving as string for now
            lastUpdated: new Date().toISOString(), // Update timestamp on save
            // Pass the image_urls in the payload
            image_urls: formData.imageUrls,
        };
        onSubmit(dataToSubmit);
    };

    return (
        <form onSubmit={handleSubmit} className="admin-vehicle-form">
            <div className="form-group">
                <label htmlFor="make">Make</label>
                <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="model">Model</label>
                <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="year">Year</label>
                <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required min="1900" max={new Date().getFullYear() + 1} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price (₦)</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="1000" />
            </div>
            <div className="form-group">
                <label htmlFor="mileage">Mileage (e.g., "5,000 miles")</label>
                <input type="text" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="exteriorColor">Exterior Color</label>
                <input type="text" id="exteriorColor" name="exteriorColor" value={formData.exteriorColor} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="interiorColor">Interior Color</label>
                <input type="text" id="interiorColor" name="interiorColor" value={formData.interiorColor} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="engine">Engine</label>
                <input type="text" id="engine" name="engine" value={formData.engine} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="transmission">Transmission</label>
                <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required>
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="PDK">PDK</option>
                    <option value="Dual-Clutch">Dual-Clutch</option>
                    <option value="7-speed S tronic">7-speed S tronic</option>
                    <option value="8-speed M Steptronic">8-speed M Steptronic</option>
                    <option value="8-speed Dual-Clutch">8-speed Dual-Clutch</option>
                    <option value="7-speed Seamless Shift Gearbox">7-speed Seamless Shift Gearbox</option>
                    <option value="9-speed Automatic">9-speed Automatic</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="fuelType">Fuel Type</label>
                <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                    <option value="">Select Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>
            
            {/* New! File input for image upload */}
            <div className="form-group">
                <label htmlFor="images">Upload Images</label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleFilesChange}
                    multiple // if you allow multiple
                    disabled={uploading}
                    accept="image/*" // Restrict to image files
                />
                {uploading && <p>Uploading…</p>}
            </div>

            {/* preview thumbnails */}
            {formData.imageUrls?.map((url, index) => (
                <img key={index} src={url} alt={`Vehicle image ${index + 1}`} style={{ width: 80, height: 60, marginRight: 8, objectFit: 'cover', borderRadius: '4px' }} />
            ))}

            <div className="form-group">
                <label htmlFor="features">Features (comma-separated)</label>
                <textarea id="features" name="features" value={formData.features} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                    <option value="available">Available</option>
                    <option value="auctioning">Auctioning</option>
                    <option value="sold">Sold</option>
                    <option value="pending_inspection">Pending Inspection</option>
                </select>
            </div>
            <div className="form-group checkbox-group">
                <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                <label htmlFor="isFeatured">Featured on Homepage</label>
            </div>

            <div className="form-actions">
                <Button type="button" className="secondary-button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" className="primary-button" disabled={uploading}>
                    {uploading ? 'Uploading & Saving...' : (vehicle ? 'Save Changes' : 'Add Vehicle')}
                </Button>
            </div>
        </form>
    );
};

export default AdminVehicleForm;