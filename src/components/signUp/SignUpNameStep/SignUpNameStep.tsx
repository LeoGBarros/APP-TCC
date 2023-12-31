import React, { useState } from 'react'
import { View } from 'react-native'

import TextField from '@Components/atomic/TextField'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import SignUpButtons from '@Components/signUp/SignUpButtons'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

import { validateRequired } from '@Utils/validation'

const SignUpNameStep = () => {
  const { name, surname } = useAppSelector(({ signUp }) => signUp)
  const [nameErrors, setNameErrors] = useState<string[]>([])
  const [surnameErrors, setSurnameErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnChangeNameField(value: string) {
    dispatch(insertSignUpInfo({ name: value }))
    setNameErrors([])
  }

  function handleOnChangeSurnameField(value: string) {
    dispatch(insertSignUpInfo({ surname: value }))
    setSurnameErrors([])
  }

  function handleOnPressNextButton() {
    const nameValidation = validateRequired('Nome', name)
    const surnameValidation = validateRequired('Sobrenome', surname)

    if (!nameValidation.success || !surnameValidation.success) {
      setNameErrors(nameValidation.errors)
      setSurnameErrors(surnameValidation.errors)

      return
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={[...nameErrors, ...surnameErrors]} />
      <TextField
        variant="primary"
        fluid
        onChangeText={handleOnChangeNameField}
        value={name}
        placeholder="Nome"
        blurOnSubmit={false}
        returnKeyType="next"
      />
      <TextField
        variant="primary"
        fluid
        onChangeText={handleOnChangeSurnameField}
        value={surname}
        placeholder="Sobrenome"
        blurOnSubmit={false}
        returnKeyType="next"
        onSubmitEditing={handleOnPressNextButton}
      />
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpNameStep
