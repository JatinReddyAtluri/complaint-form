import React, { useState } from "react";

export default function AddComplaint() {
  
  const [formData, setFormData] = useState({
    patient_id: "",
    contact_number: "",
    priority: "",
    complaint_description: "",
    complaint_datetime: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // The [e.target.name] matches the keys in formData
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.patient_id.trim())
      newErrors.patient_id = "Patient ID is required";

    if (!formData.contact_number.trim())
      newErrors.contact_number = "Contact number is required";
    else if (!/^[0-9]{10}$/.test(formData.contact_number))
      newErrors.contact_number = "Enter valid 10-digit number";

    if (!formData.priority)
      newErrors.priority = "Priority is required";

    if (!formData.complaint_description.trim())
      newErrors.complaint_description = "Complaint description is required";

    if (!formData.complaint_datetime)
      newErrors.complaint_datetime = "Date & Time required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // This object can now be sent directly to your Node.js/Postgres backend!
      console.log("Data ready for Database:", formData);

      setFormData({
        patient_id: "",
        contact_number: "",
        priority: "",
        complaint_description: "",
        complaint_datetime: ""
      });

      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl p-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add New Complaint</h1>
          <p className="text-gray-500 mt-1">Enter complaint details to create a new record</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complaint ID</label>
              <input
                type="text"
                disabled
                placeholder="Auto-generated (DB Side)"
                className="w-full rounded-lg border bg-gray-100 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID *</label>
              <input
                type="text"
                name="patient_id" 
                value={formData.patient_id}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.patient_id && <p className="text-red-500 text-sm">{errors.patient_id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                placeholder="Auto-filled from DB"
                disabled
                className="w-full rounded-lg border bg-gray-100 px-4 py-2"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.contact_number && <p className="text-red-500 text-sm">{errors.contact_number}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Description *</label>
            <textarea
              rows="4"
              name="complaint_description"
              value={formData.complaint_description}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            {errors.complaint_description && <p className="text-red-500 text-sm">{errors.complaint_description}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (Optional)</label>
              <input
                type="file"
                name="attachment_path"
                className="w-full border rounded-lg px-4 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Date & Time *</label>
              <input
                type="datetime-local"
                name="complaint_datetime"
                value={formData.complaint_datetime}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.complaint_datetime && <p className="text-red-500 text-sm">{errors.complaint_datetime}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}