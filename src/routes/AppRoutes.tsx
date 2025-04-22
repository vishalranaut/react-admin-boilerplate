import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const LoginContainer = lazy(() => import("../containers/LoginContainer"));
const DashboardContainer = lazy(
  () => import("../containers/DashboardContainer")
);
const ProfileContainer = lazy(() => import("../containers/ProfileContainer"));
const ChangePasswordContainer = lazy(
  () => import("../containers/ChangePasswordContainer")
);
const UsersListContainer = lazy(
  () => import("../containers/users/UsersListContainer")
);
const UserFormContainer = lazy(
  () => import("../containers/users/UserFormContainer")
);
const TemplatesListContainer = lazy(
  () => import("../containers/templates/TemplatesListContainer")
);
const TemplateFormContainer = lazy(
  () => import("../containers/templates/TemplateFormContainer")
);
const MenusListContainer = lazy(
  () => import("../containers/menus/MenusListContainer")
);
const MenuFormContainer = lazy(
  () => import("../containers/menus/MenuFormContainer")
);
const FormsListContainer = lazy(
  () => import("../containers/forms/FormsListContainer")
);
const FormBuilderContainer = lazy(
  () => import("../containers/forms/FormBuilderContainer")
);
const SettingsContainer = lazy(() => import("../containers/SettingsContainer"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePasswordContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UsersListContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/add"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UserFormContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UserFormContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplatesListContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates/add"
          element={
            <ProtectedRoute>
              <TemplateFormContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates/edit/:id"
          element={
            <ProtectedRoute>
              <TemplateFormContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menus"
          element={
            <ProtectedRoute>
              <MenusListContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menus/add"
          element={
            <ProtectedRoute>
              <MenuFormContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menus/edit/:id"
          element={
            <ProtectedRoute>
              <MenuFormContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forms"
          element={
            <ProtectedRoute>
              <FormsListContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forms/add"
          element={
            <ProtectedRoute>
              <FormBuilderContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forms/edit/:id"
          element={
            <ProtectedRoute>
              <FormBuilderContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsContainer />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
