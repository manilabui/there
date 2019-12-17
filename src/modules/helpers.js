import { reverse, sortBy } from 'lodash';

export const getUserInfo = () => JSON.parse(localStorage.getItem('credentials'));

export const sortByModifiedDate = arr => reverse(sortBy(arr, 'modifiedAt'));