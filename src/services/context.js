import {createContext} from 'react'

export const Context = createContext({
  token: null,
  theme: {
    main: '',
    accent: '',
    disabled: '',
    shadow: '',
    formBg: '',
    color: '',
    secondColor: '',
    second: ''
  }
})