import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import FormBuilder from "../../pages/forms/FormBuilder";

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: { value: string; label: string }[];
  value?: string;
}

export interface FormData {
  name: string;
  fields: FormField[];
}

const FormBuilderContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<FormData>({ name: "", fields: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      if (!isEditMode) return;
      try {
        setLoading(true);
        const response = await api.get(`/forms/${id}`);
        setFormData(response.data);
      } catch {
        setError("Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<any>,
    fieldId: string,
    fieldType: string
  ) => {
    const value =
      fieldType === "select"
        ? (e.target as HTMLSelectElement).value
        : e.target.value;

    const updatedFields = formData.fields.map((field) =>
      field.id === fieldId ? { ...field, value } : field
    );

    setFormData({ ...formData, fields: updatedFields });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.patch(`/forms/${id}`, formData);
      } else {
        await api.post("/forms", formData);
      }
      navigate("/forms");
    } catch {
      setError("Failed to save form");
    }
  };

  const handleCancel = () => navigate("/forms");

  return (
    <FormBuilder
      isEditMode={isEditMode}
      loading={loading}
      error={error}
      formData={formData}
      onChange={handleChange}
      onNameChange={handleNameChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default FormBuilderContainer;
