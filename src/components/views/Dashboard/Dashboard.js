import DashboardBanner from "./DashboardBanner";
import DashboardCategories from "./DashboardCategories";
import DashboardValues from "./DashboardValues";
import DashboardGuide from "./DashboardGuide";
import DashboardOffers from "./DashboardOffers";

export default function Dashboard() {
  return (
    <>
      <DashboardBanner/>
      <DashboardValues/>
      <DashboardCategories/>
      <DashboardGuide/>
      <DashboardOffers/>
    </>
  );
}