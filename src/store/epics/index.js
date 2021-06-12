/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import { combineEpics } from 'redux-observable';

const epics = [];

const mergeEpicGroups = (groups) => _.chain(groups)
  .reduce((all, group) => {
    _.each(group, (func, key) => {
      // eslint-disable-next-line no-param-reassign
      all[key] = func;
    });

    return all;
  }, {})
  .map((func) => func)
  .value();

export default combineEpics(...mergeEpicGroups(epics));
