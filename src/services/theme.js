import {presetPalettes} from '@ant-design/colors'

export const theme = {
  light: {
    accent: presetPalettes.blue[6],
    main: '#fafafa',
    second:'#fafafa',
    disabled: presetPalettes.blue[2],
    shadow: presetPalettes.grey[6],
    formBg: presetPalettes.blue[2],
    color:'#171717',
    secondColor:'#494949 !important'
  },
  dark: {
    accent: presetPalettes.cyan[3],
    main: presetPalettes.purple[7],
    second:presetPalettes.purple[5],
    disabled: presetPalettes.purple[6],
    shadow: presetPalettes.purple[2],
    formBg: presetPalettes.purple[7],
    color:'#fafafa',
    secondColor:'#c6c6c6'
  }
}