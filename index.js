/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import dayjs from 'dayjs';

var isoWeek = require('dayjs/plugin/isoWeek');
var weekday = require('dayjs/plugin/weekday');

dayjs.extend(isoWeek);
dayjs.extend(weekday);

AppRegistry.registerComponent(appName, () => App);
