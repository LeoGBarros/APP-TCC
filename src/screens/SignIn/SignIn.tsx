import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import EmailTextField from '@Components/atomic/EmailTextField/EmailTextField'
import PasswordTextField from '@Components/atomic/PasswordTextField/PasswordTextField'
import TextButton from '@Components/atomic/TextButton/TextButton'
import SignUpErrors from '@Components/signUp/SignUpErrors/SignUpErrors'

import UserService from '@Api/services/userService'
import { useAppDispatch } from '@Hooks/redux'
import { insertAuthInfo } from '@Store/reducers/auth'
import { secureStoreSave } from '@Utils/secureStore'

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
`

const TitleContainer = styled.View`
  width: 100%;
  align-items: center;
`

const SignUpTitle = styled.Text`
  font-size: 34px;
  font-family: 'Poppins-Bold';
`

const Instruction = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`
const FormContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
`

const InputContainer = styled.View`
  width: 100%;
`

const SignIn = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function handleLoginPressButton() {
    setLoading(true)
    setErrors([])
    const loginResponse = await UserService.signIn(email, password)

    if (loginResponse.status === 'error') {
      setErrors(['Dados inválidos! Tente novamente'])
      setLoading(false)
      return
    }

    secureStoreSave('secureToken', JSON.stringify(loginResponse))
    dispatch(insertAuthInfo({ ...loginResponse, isLogged: true }))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TitleContainer>
          <SignUpTitle>Login</SignUpTitle>
          <Instruction>Insira seus dados corretamente</Instruction>
        </TitleContainer>
        <FormContainer>
          <InputContainer>
            <SignUpErrors errors={errors} />
            <EmailTextField
              variant="primary"
              fluid
              onChangeText={setEmail}
              placeholder="E-mail"
              value={email}
              blurOnSubmit={false}
              returnKeyType="next"
            />
            <PasswordTextField
              variant="primary"
              fluid
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              blurOnSubmit={false}
              returnKeyType="next"
            />
            <TextButton
              text={'Entrar'}
              variant={'primary'}
              fluid
              onPress={handleLoginPressButton}
              loading={loading}
            />
          </InputContainer>
        </FormContainer>
      </Container>
    </SafeAreaView>
  )
}

export default SignIn
