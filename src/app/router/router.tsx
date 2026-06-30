import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import RecordPage from "../../pages/recordPage";
import HistoryPage from "../../pages/historyPage";
import AnalysisPage from "../../pages/analysisPage";
import NotFoundPage from "../../pages/notFoundPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [{ index: true, element: <RecordPage /> }],
    },
    {
      path: "/history",
      element: <Layout />,
      children: [{ index: true, element: <HistoryPage /> }],
    },
    {
      path: "/analysis",
      element: <Layout />,
      children: [{ index: true, element: <AnalysisPage /> }],
    },
    {
      path: "/morePage",
      element: <Layout />,
      children: [{ index: true, element: <NotFoundPage /> }],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  {
    basename: "/archery-app",
  },
);
