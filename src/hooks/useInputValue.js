import { useState, useRef } from 'react'

export const useInputValue = (initialAttrs, wReset = true, controlled = true) => {
  const { value: defValue, equal_to: equalTo, ...attrs } = initialAttrs

  const [value, setValue] = useState(defValue || '')
  const [valid, setIsValid] = useState(true)
  const [defaultValue, setDefaultValue] = useState(defValue || '')
  const ref = useRef(null)

  const onChange = (e) => {
    // floatvalue is returned from currency format inputs
    const value = e.floatValue ? e.floatValue : e.target ? e.target.value : ''

    setValue(value)

    const hasValidity = typeof e.target.checkValidity === 'function'

    setIsValid(
      ((attrs.required !== undefined &&
        value !== '' &&
        e.target &&
        ((hasValidity && e.target.checkValidity()) || !hasValidity)) ||
        attrs.required === undefined) &&
        ((equalTo && equalTo === value) || equalTo === undefined)
    )
  }

  const handleReset = (value = '') => {
    setValue(value)
    setIsValid(true)
  }

  const inpt = {
    onChange,
    valid: valid.toString(),
    ...attrs,
  }

  if (controlled) {
    inpt.value = value
    // inpt.setValue = setValue
  } else {
    inpt.ref = ref
    inpt.defaultValue = defaultValue
    inpt.setValue = setDefaultValue
  }

  if (wReset) {
    inpt.handleReset = handleReset
  }

  return inpt
}

export const useCheckboxValue = (initialAttrs) => {
  const { checked: initialState, ...attrs } = initialAttrs

  const [checked, setChecked] = useState(initialState || false)
  const [valid, setIsValid] = useState(true)

  const onChange = (e) => {
    if (checked) {
      setChecked(false)
      setIsValid(false)
    } else {
      setChecked(true)
      setIsValid(true)
    }
  }

  const handleReset = () => {
    setChecked(false)
    setIsValid(true)
  }

  return { checked, onChange, handleReset, valid: valid.toString(), ...attrs }
}
