import TimerIcon from '@material-ui/icons/Timer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';

import Tracker from './views/Tracker/Tracker'
import Calendar from './views/Calendar'
import Dashboard from './views/Dashboard'
import Project from './views/Project'
import Setting from './views/Setting'

const routes = [
  {
    path: "/tracker",
    name: "TRACKER",
    icon: TimerIcon,
    component: Tracker,
  },
  {
    path: "/calendar",
    name: "CALENDAR",
    icon: CalendarTodayIcon,
    component: Calendar,
  },
  {
    path: "/dashaboard",
    name: "DASHBOARD",
    icon: DashboardIcon,
    component: Dashboard,
  },
  {
    path: "/project",
    name: "PROJECT",
    icon: PostAddIcon,
    component: Project,
  },
  {
    path: "/setting",
    name: "SETTING",
    icon: SettingsIcon,
    component: Setting,
  },
];

export default routes;