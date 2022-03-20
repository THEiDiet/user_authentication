import InputMask from 'react-input-mask'
import {Input} from 'formik-antd'

const PhoneNumberField = (props) => (
  <InputMask  {...props}>{(inputProps) => (
    <Input {...inputProps} />
  )}</InputMask>
)
export default PhoneNumberField