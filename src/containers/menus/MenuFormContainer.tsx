import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createMenuRequest,
  updateMenuRequest,
} from "../../store/reducers/pageSlice";
import MenuForm from "../../pages/menus/MenuForm";
import api from "../../services/api";
import { Menu } from "../../services/pageService";
import { RootState } from "../../store";

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const MenuFormContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const { items: templates } = useSelector(
    (state: RootState) => state.page.templates
  );

  const [initialValues, setInitialValues] = useState<Partial<Menu>>({
    title: "",
    type: "list",
    status: "active",
    templateId: templates[0]?.id || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!isEditMode) return;
      try {
        setLoading(true);
        const response = await api.get(`/menus/${id}`);
        setInitialValues(response.data);
      } catch (err) {
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id, isEditMode]);

  const handleSubmit = async (values: Partial<Menu>) => {
    try {
      if (isEditMode) {
        dispatch(updateMenuRequest({ id: Number(id), data: values }));
      } else {
        dispatch(createMenuRequest(values as Omit<Menu, "id">));
      }
      navigate("/menus");
    } catch (err) {
      setError("Failed to save menu");
    }
  };

  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setInitialValues((prev) => ({
      ...prev,
      [name]: name === "templateId" ? Number(value) : value,
    }));
  };

  return (
    <MenuForm
      isEditMode={isEditMode}
      initialValues={initialValues}
      templates={templates}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/menus")}
      onChange={handleChange}
    />
  );
};

export default MenuFormContainer;
