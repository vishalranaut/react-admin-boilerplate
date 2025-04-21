import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormsList from "../../pages/forms/FormsList";
import api from "../../services/api";

interface FormData {
  id: number;
  name: string;
  email: string;
  message: string;
}

const FormsListContainer = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formToDelete, setFormToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const response = await api.get("/forms");
      setForms(response.data);
    } catch (err) {
      setError("Failed to load forms");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (formId: number) => {
    setFormToDelete(formId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!formToDelete) return;

    try {
      await api.delete(`/forms/${formToDelete}`);
      setForms(forms.filter((form) => form.id !== formToDelete));
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete form");
    }
  };

  const handleAddForm = () => {
    navigate("/forms/add");
  };

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormsList
      forms={filteredForms}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      showDeleteModal={showDeleteModal}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onDeleteClick={handleDeleteClick}
      onDeleteConfirm={handleDeleteConfirm}
      onCloseDeleteModal={() => setShowDeleteModal(false)}
      onAddForm={handleAddForm}
    />
  );
};

export default FormsListContainer;
