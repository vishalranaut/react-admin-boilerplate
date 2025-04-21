import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchTemplatesRequest } from "../store/reducers/pageSlice";
import Dashboard from "../pages/Dashboard";
import api from "../services/api";

interface Stats {
  users: number;
  templates: number;
  menus: number;
  forms: number;
}

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: RootState) => state.auth as { user: any }
  );
  const { items: templates } = useSelector(
    (state: RootState) => state.page.templates
  );
  const [stats, setStats] = useState<Stats>({
    users: 0,
    templates: 0,
    menus: 0,
    forms: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        if (templates.length === 0) {
          dispatch(fetchTemplatesRequest());
        }

        const [usersRes, menusRes, formsRes] = await Promise.all([
          api.get("/users"),
          api.get("/menus"),
          api.get("/forms"),
        ]);

        setStats({
          users: usersRes.data.length,
          templates: templates.length,
          menus: menusRes.data.length,
          forms: formsRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dispatch, templates.length]);

  return (
    <Dashboard
      user={user}
      stats={stats}
      templates={templates}
      loading={loading}
    />
  );
};

export default DashboardContainer;
