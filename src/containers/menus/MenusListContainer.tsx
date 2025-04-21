import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import {
  fetchMenusRequest,
  deleteMenuRequest,
} from "../../store/reducers/pageSlice";
import MenusList from "../../pages/menus/MenusList";

const MenusListContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: menus,
    loading,
    error,
  } = useSelector((state: RootState) => state.page.menus);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchMenusRequest());
  }, [dispatch]);

  const handleDeleteClick = (menuId: number) => {
    setMenuToDelete(menuId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (menuToDelete !== null) {
      dispatch(deleteMenuRequest(menuToDelete));
      setShowDeleteModal(false);
    }
  };

  const handleAddMenu = () => {
    navigate("/menus/add");
  };

  const filteredMenus = menus.filter((menu) =>
    menu.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MenusList
      menus={filteredMenus}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      showDeleteModal={showDeleteModal}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onDeleteClick={handleDeleteClick}
      onDeleteConfirm={handleDeleteConfirm}
      onCloseDeleteModal={() => setShowDeleteModal(false)}
      onAddMenu={handleAddMenu}
    />
  );
};

export default MenusListContainer;
