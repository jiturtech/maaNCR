import images from '../assets/images';

export const textVariant = {
  body1: 'body1',
  h1: 'h1',
  h2: 'h2',
  h4: 'h4',
  h3: 'h3',
  pageTitle: 'pageTitle',
  body2: 'body2',
  body3: 'body3',
  caption: 'caption',
  button: 'button',
  button1: 'button1',
  button3: 'button3',
  button2: 'button2',
  button4: 'button4',
  button5: 'button5',
  h5: 'h5',
  h6: 'h6',
  smallerText: 'smallerText',
};

export const iconSize = {
  size30: 30,
  size22: 22,
  size24: 24,
  size20: 20,
  size55: 55,
  size40: 40,
  size35: 35,
  size16: 16,
  size25: 25,
};

export const placeholderDefaults = {
  countryPicker: 'Mobile Number',
  name: 'India',
  flag: '🇮🇳',
  code: 'IN',
  dial_code: '+91',
};

export const BLOOD_GROUP = [
  {
    id: 1,
    value: 'A+',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
  {
    id: 2,
    value: 'A-',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
  {
    id: 3,
    value: 'B+',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
  {
    id: 4,
    value: 'B-',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
  {
    id: 5,
    value: 'O+',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
  {
    id: 6,
    value: 'O-',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
  {
    id: 7,
    value: 'AB+',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
  {
    id: 8,
    value: 'AB-',
    selected: false,
    iconName: 'blood-drop',
    iconType: 'fontisto',
  },
];

export const MARITAL_STATUS = [
  {
    id: 1,
    value: 'Single',
    selected: false,
    iconName: 'emoji-happy',
    iconType: 'entypo',
  },
  {
    id: 2,
    value: 'Married',
    selected: false,
    iconName: 'ios-happy-outline',
    iconType: 'ionicon',
  },
  {
    id: 3,
    value: 'Divorced',
    selected: false,
    iconName: 'emoji-sad',
    iconType: 'entypo',
  },
  {
    id: 4,
    value: 'Separated',
    selected: false,
    iconName: 'emoticon-cry-outline',
    iconType: 'material-community',
  },
  {
    id: 5,
    value: 'Not to say',
    selected: false,
    iconName: 'ios-happy-outline',
    iconType: 'ionicon',
  },
];

export const OCCUPATIONS = [
  {
    id: 1,
    value: 'Government',
    selected: false,
    iconName: 'electron-framework',
    iconType: 'material-community',
  },
  {
    id: 2,
    value: 'Public Sector',
    selected: false,
    iconName: 'electron-framework',
    iconType: 'material-community',
  },
  {
    id: 3,
    value: 'Private Sector',
    selected: false,
    iconName: 'electron-framework',
    iconType: 'material-community',
  },
  {
    id: 4,
    value: 'Self Employed',
    selected: false,
    iconName: 'electron-framework',
    iconType: 'material-community',
  },
  {
    id: 5,
    value: 'Business',
    selected: false,
    iconName: 'electron-framework',
    iconType: 'material-community',
  },
  {
    id: 6,
    value: 'Retired',
    selected: false,
    iconName: 'electron-framework',
    iconType: 'material-community',
  },
  {
    id: 7,
    value: 'Home Maker',
    selected: false,
    iconName: 'electron-framework',
    iconType: 'material-community',
  },
];

export const IMAGE_PICKER = [{value: 'Take Photo'}, {value: 'Upload'}];

export default textVariant;

export const iconOpacity = {
  activeOpacity: '1',
  deactivateOpacity: '0.4',
};

export const tabsWithMagicBtn = [
  {
    tabName: 'location',
    description: 'MAA NCR',
    iconName: images.LOC,
  },
  {
    tabName: 'events',
    description: 'Events',
    iconName: images.EVENTS,
  },
  {
    tabName: 'magic_button',
    description: 'Make a Post',
    iconName: '',
  },
  {
    tabName: 'notes',
    description: 'Notes',
    iconName: images.NOTES,
  },
  {
    tabName: 'user',
    description: 'Profile',
    iconName: images.USER,
  },
];

export const tabsWithoutMagicBtn = [
  {
    tabName: 'location',
    description: 'MAA NCR',
    iconName: images.LOC,
  },
  {
    tabName: 'events',
    description: 'Events',
    iconName: images.EVENTS,
  },

  {
    tabName: 'notes',
    description: 'Notes',
    iconName: images.NOTES,
  },
  {
    tabName: 'user',
    description: 'Profile',
    iconName: images.USER,
  },
];

export const postType = [
  {
    value: '1',
    label: 'Timeline',
  },
  {
    value: '2',
    label: 'Gallery',
  },
  {
    value: '3',
    label: 'Chapters',
  },
];

export const COURSE_DATA = [
  {
    id: 1,
    value: 'B.E./B.Tech',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
  {
    id: 2,
    value: 'BBA',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
  {
    id: 3,
    value: 'B.Pharm',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
  {
    id: 4,
    value: 'M.Tech',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
  {
    id: 5,
    value: 'MBA',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
  {
    id: 6,
    value: 'MCA',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
  {
    id: 7,
    value: 'M.Sc',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
  {
    id: 8,
    value: 'Ph.D',
    selected: false,
    iconName: 'book-outline',
    iconType: 'ionicon',
  },
];

export const BRANCH_DATA_B_TECH = [
  {
    id: 1,
    value: 'Civil Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 2,
    value: 'Electrical Engieering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 3,
    value: 'Mechanical Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 4,
    value: 'Electronics & Communication Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 5,
    value: 'Computer Science & Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 6,
    value: 'Chemical Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 7,
    value: 'Information Technology',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
];

export const BRANCH_DATA_MSC = [
  {
    id: 1,
    value: 'Physics',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 2,
    value: 'Mathmatics',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 3,
    value: 'Chemistry',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
];

export const BRANCH_DATA_M_TECH = [
  {
    id: 1,
    value: 'Environmental Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 2,
    value: 'Hill Area Development Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 3,
    value: 'Structural Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 4,
    value: 'Earthquake Engineering & Seismic Design',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 5,
    value: 'Computer Science & Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 6,
    value: 'Information Technology',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 7,
    value: 'Power Electronics & Drives',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 8,
    value: 'Control & Instrumentation',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 9,
    value: 'Digital Systems',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 10,
    value: 'Communication Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 11,
    value: 'Computer Integrated Manufacturing',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 12,
    value: 'Energy Technology & Management',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
];

export const BRANCH_DATA_PHD = [
  {
    id: 1,
    value: 'Civil Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 2,
    value: 'Computer Science and Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 3,
    value: 'Information Technology',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 4,
    value: 'Electrical Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 5,
    value: 'Electronics and Communication Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 6,
    value: 'Mechanical Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 7,
    value: 'Chemical Engineering',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 8,
    value: 'Physics',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 9,
    value: 'Chemistry',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 10,
    value: 'Mathematics',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
  {
    id: 11,
    value: 'Economics',
    selected: false,
    iconName: 'graduation-cap',
    iconType: 'entypo',
  },
];
