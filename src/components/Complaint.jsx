import React, { useState } from "react";

export default function AddComplaint() {

  const [formData, setFormData] = useState({
    patientId: "",
    contactNumber: "",
    priority: "",
    description: "",
    datetime: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.patientId.trim())
      newErrors.patientId = "Patient ID is required";

    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    else if (!/^[0-9]{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Enter valid 10-digit number";

    if (!formData.priority)
      newErrors.priority = "Priority is required";

    if (!formData.description.trim())
      newErrors.description = "Complaint description is required";

    if (!formData.datetime)
      newErrors.datetime = "Date & Time required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Submitted Data:", formData);  // Show in console

      setFormData({   // Reset form
        patientId: "",
        contactNumber: "",
        priority: "",
        description: "",
        datetime: ""
      });

      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl p-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Add New Complaint
          </h1>
          <p className="text-gray-500 mt-1">
            Enter complaint details to create a new record
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complaint ID
              </label>
              <input
                type="text"
                disabled
                placeholder="Auto-generated"
                className="w-full rounded-lg border bg-gray-100 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID *
              </label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.patientId && (
                <p className="text-red-500 text-sm">{errors.patientId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                placeholder="Auto-filled"
                disabled
                className="w-full rounded-lg border bg-gray-100 px-4 py-2"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">{errors.contactNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              {errors.priority && (
                <p className="text-red-500 text-sm">{errors.priority}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Description *
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachment (Optional)
              </label>
              <input
                type="file"
                className="w-full border rounded-lg px-4 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complaint Date & Time *
              </label>
              <input
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.datetime && (
                <p className="text-red-500 text-sm">{errors.datetime}</p>
              )}
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
