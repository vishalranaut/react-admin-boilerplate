import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import {
  fetchTemplatesRequest,
  deleteTemplateRequest,
} from "../../store/reducers/pageSlice";
import TemplatesList from "../../pages/templates/TemplatesList";

const TemplatesListContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: templates,
    loading,
    error,
  } = useSelector((state: RootState) => state.page.templates);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTemplatesRequest());
  }, [dispatch]);

  const handleDeleteClick = (templateId: number) => {
    setTemplateToDelete(templateId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (templateToDelete) {
      dispatch(deleteTemplateRequest(templateToDelete));
      setShowDeleteModal(false);
    }
  };

  const handleAddTemplate = () => {
    navigate("/templates/add");
  };

  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TemplatesList
      templates={filteredTemplates}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      showDeleteModal={showDeleteModal}
      onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
      onDeleteClick={handleDeleteClick}
      onDeleteConfirm={handleDeleteConfirm}
      onCloseDeleteModal={() => setShowDeleteModal(false)}
      onAddTemplate={handleAddTemplate}
    />
  );
};

export default TemplatesListContainer;
