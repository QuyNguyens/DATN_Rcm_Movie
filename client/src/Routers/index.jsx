import Profile from "../Page/Customer/Profile";
import FavoritePage from "../Page/Customer/favoritePage";
import HistoryPage from "../Page/Customer/hisrotyPage";
import Home from "../Page/Customer/home";
import LoginPage from "../Page/Customer/loginPage";
import Statistic from "../Page/Customer/statistic";
import { HistoryLayout } from "../components/Layout";
import HomeAdmin from "../Page/Admin/Home";
import AdminLayout from "../components/Layout/AdminLayout";
import StatisticAdm from "../Page/Admin/statistic";
import MovieAdm from "../Page/Admin/Movie";
import UserAdm from "../Page/Admin/UserAdm";

const publicRoute = [
    {path: '/', component: Home },
    {path: '/login', component: LoginPage },
    {path: '/history', component: HistoryPage,layout: HistoryLayout },
    {path: '/favorite', component: FavoritePage,layout: HistoryLayout },
    {path: '/statistic', component: Statistic,layout: HistoryLayout },
    {path: '/profile',component: Profile,layout: HistoryLayout},
    {path: '/adm/home',component: HomeAdmin,layout: AdminLayout},
    {path: '/adm/statistic',component: StatisticAdm,layout: AdminLayout},
    {path: '/adm/movie',component: MovieAdm,layout: AdminLayout},
    {path: '/adm/user',component: UserAdm,layout: AdminLayout},
]

export {publicRoute};