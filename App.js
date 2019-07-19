import {createStackNavigator, createAppContainer} from 'react-navigation';
import LogIn from './gallery/screens/LogIn'
import Home from './gallery/screens/Home'
import Browse from './gallery/screens/Browse'
import BrowseImage from './gallery/screens/BrowseImage'
import Profile from './gallery/screens/Profile'
import Connection from './gallery/screens/Connection'
import Setting from './gallery/screens/Setting'
import Followers from './gallery/screens/Followers'
import Following from './gallery/screens/Following'
import Carousel from './gallery/screens/Carousel'
import UsersListing from './gallery/screens/UsersListing'
import BlockUser from './gallery/screens/BlockUser'
import UnBlockUser from './gallery/screens/UnBlockUser'
import CurrentUserProfile from './gallery/screens/CurrentUserProfile'
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyArT5mk1YU8TCB_N0HUxE5BTLg8j2J8w8A",
  authDomain: "gallery-94d9b.firebaseapp.com",
  databaseURL: "https://gallery-94d9b.firebaseio.com",
  projectId: "gallery-94d9b",
  storageBucket: "gallery-94d9b.appspot.com",
  messagingSenderId: "481662663193",
  appId: "1:481662663193:web:60a32c6cbffd0316"
};
firebase.initializeApp(firebaseConfig);

const MainNavigator = createStackNavigator({ 
    LogIn: LogIn,
    Home: Home,
    BlockUser: BlockUser,
    Browse: Browse,
    BrowseImage:BrowseImage,
    Profile: Profile,
    Setting: Setting,
    Followers: Followers,
    Following: Following,   
    Carousel:Carousel,
    UsersListing:UsersListing,
    Connection:Connection,
    UnBlockUser:UnBlockUser,
    CurrentUserProfile:CurrentUserProfile,
},
{
  headerMode:'none',
  initialRouteName:'LogIn', 
});
const App = createAppContainer(MainNavigator);
export default App;
