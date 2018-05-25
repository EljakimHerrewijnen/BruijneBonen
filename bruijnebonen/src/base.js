import Rebase from 're-base';
import * as config from './config.js';

const base = new Rebase.createClass(config.firebase);

export default base;
