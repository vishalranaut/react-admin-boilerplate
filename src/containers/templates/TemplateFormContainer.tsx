import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createTemplateRequest,
  updateTemplateRequest,
} from "../../store/reducers/pageSlice";
import TemplateForm from "../../pages/templates/TemplateForm";
import api from "../../services/api";
import { Template } from "../../services/pageService";

const TemplateFormContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const [initialValues, setInitialValues] = useState<Omit<Template, "id">>({
    title: "",
    slug: "",
    type: "static",
    htmlContent: "",
    bannerImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        const response = await api.get<Template>(`/templates/${id}`);
        const { id: _, ...rest } = response.data;
        setInitialValues(rest);
      } catch (err) {
        setError("Failed to load template");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, isEditMode]);

  const handleSubmit = (values: Omit<Template, "id">) => {
    try {
      if (isEditMode) {
        dispatch(updateTemplateRequest({ id: Number(id), data: values }));
      } else {
        dispatch(createTemplateRequest(values));
      }
      navigate("/templates");
    } catch (err) {
      setError("Failed to save template");
    }
  };

  return (
    <TemplateForm
      isEditMode={isEditMode}
      initialValues={initialValues}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/templates")}
    />
  );
};

export default TemplateFormContainer;
