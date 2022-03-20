import axios from 'axios'

import {StorageKey} from '../../enum'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://testtask.softorium.pro/',
  headers: {
    'X-APP-ID': JSON.parse(localStorage.getItem(StorageKey.UserId)),
  },
})
