import InputMask from 'react-input-mask'
import {Input} from 'formik-antd'
import {useContext} from 'react'
import {Context} from '../services'

const PhoneNumberField = props => {
  const {theme} = useContext(Context)
  const styles = {color: theme.secondColor, borderColor: theme.accent}
  return (
    <InputMask  {...props}>{(inputProps) => (
      <Input className="antInput" style={styles} {...inputProps} />
    )}</InputMask>
  )
}
export default PhoneNumberField