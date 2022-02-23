/* eslint-disable linebreak-style */
import MyFeedsIcon from '../../../assets/navIcons/feeds.svg';
// import TrendingIcon from '../../../assets/navIcons/trending.svg';
import BirthdayIcon from '../../../assets/navIcons/birthday.svg';
import CalendarIcon from '../../../assets/navIcons/calender.svg';
import NewsIcon from '../../../assets/navIcons/news.svg';
import MyFeedsIconSelected from '../../../assets/navIcons/feedsSelected.svg';
import BirthdayIconSelected from '../../../assets/navIcons/birthdaySelected.svg';
import CalendarIconSelected from '../../../assets/navIcons/calenderSelected.svg';
import NewsIconSelected from '../../../assets/navIcons/newsSelected.svg';

const NavFeadsList = [
  {
    id: 1, name: 'My Feeds', mName: 'Home', icon: MyFeedsIcon, selectedIcon: MyFeedsIconSelected, key: 'feed',
  },
  {
    id: 2, name: 'Birthdays', mName: 'Birthdays', icon: BirthdayIcon, selectedIcon: BirthdayIconSelected, key: 'birthday',
  },
  {
    id: 3, name: 'On this day', mName: 'On this day', icon: CalendarIcon, selectedIcon: CalendarIconSelected, key: 'thisDay',
  },
  {
    id: 4, name: 'In the news', mName: 'In the news', icon: NewsIcon, selectedIcon: NewsIconSelected, key: 'news',
  },
  // {
  //   id: 5, name: 'Trending', icon: TrendingIcon, selectedIcon: '',
  // },
];

export default NavFeadsList;
