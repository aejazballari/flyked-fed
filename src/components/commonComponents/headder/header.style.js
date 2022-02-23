/* eslint-disable linebreak-style */
import { makeStyles } from '@material-ui/core/styles';
import { Flalpha } from '../../../elements';

const drawerWidth = '100%';
const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
    color: '#ff3a00e0',
    '& a': {
      textDecoration: 'none',
    },
  },
  headerOptions: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  primaryColor: {
    color: '#f1846b',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Flalpha(theme.palette.common.black, 0.06),
    '&:hover': {
      backgroundColor: Flalpha(theme.palette.common.black, 0.1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
    height: '40px !important',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#EF613B',
  },
  icon_size: {
    color: '#EF613B',
  },
  inputRoot: {
    // backgroundColor: '#F7F7F8',
    borderRadius: '4px',
    width: '100%',
    font: 'normal normal 16px/19px "SF Pro Display", sans-serif',
    letterSpacing: '0.02em',
    color: '#888F9D',
  },
  searchInput: {
    padding: theme.spacing(1.5, 1, 1, 0),
    fontSize: '16px',
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#888F9D !important',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    boxShadow: '0px 0px 0px 5px #e8e9ec',
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: 'hidden',
  },
  drawerHeader: {
    // display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // justifyContent: 'flex-end',
    borderBottom: 'npne !important',
  },
  drawerFooter: {
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    // // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '0%',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,30%)',
    width: '100%',
    background: '#ffffff',
  },
  small: {
    height: '35px',
    width: '35px',
  },
  profileCardHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileCard: {
    marginRight: '4rem',
    display: 'flex',
    width: '100%',
    paddingLeft: '10px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
  },
  profileCardName: {
    fontSize: '14px',
    paddingLeft: '10px',
    color: '#1C2121 !important',
  },
  headerProfileMenuArrowIcon: {
    color: '#1C2121 !important',
  },
  label: {
    width: '112px',
    textTransform: 'capitalize',
  },
  profileInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10px',
    cursor: 'pointer',
  },
  dropdownDiv: {
    position: 'relative !important',
  },
  menuDropdown: {
    position: 'absolute',
    top: '1rem',
    right: '0',
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
    width: '135px',
    minHeight: '65px',
    border: '0.5px solid #cecece',
  },
  link: {
    color: '#1C2121',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#ffffff !important',
      color: '#f1846b',
    },
  },
  bottomText: {
    position: 'absolute',
    bottom: '0%',
    left: '0px',
    right: '0px',
    backgroundColor: 'white',
    padding: '10px',
  },
  linkText: {
    color: '#f1846b',
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  dropdownItem: {
    backgroundColor: theme.palette.background.paper,
    padding: '0px ',
    maxHeight: '60vh',
    height: 'auto',
    minHeight: '80px',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  headderIconButtons: {
    color: '#1C2121',
  },
  headerMobileViewProfileIcon: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '10px',
    paddingLeft: '10px',
    color: '#000000',
  },
  headeMobileViewLogOutButton: {
    color: '#1C2121',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
    marginRight: '10px',
  },
  feadsListLabel: {
    // fontFamily: 'SF Pro',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    color: '#172849',
  },
  selected: {
    // fontFamily: 'SF Pro',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    color: '#EF613B',
  },
}));

export default styles;
