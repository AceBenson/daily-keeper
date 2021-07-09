import TimerIcon from '@material-ui/icons/Timer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

import Tracker from './views/Tracker'
import Calendar from './views/Calendar'
import Dashboard from './views/Dashboard'
import Setting from './views/Setting'

const routes = [
  {
    path: "/tracker",
    name: "Tracker",
    icon: TimerIcon,
    component: Tracker,
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: CalendarTodayIcon,
    component: Calendar,
  },
  {
    path: "/dashaboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
  },
  {
    path: "/setting",
    name: "Setting",
    icon: SettingsIcon,
    component: Setting,
  },
];

export default routes;