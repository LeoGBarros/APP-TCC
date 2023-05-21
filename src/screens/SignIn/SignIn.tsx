import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import EmailTextField from '@Components/atomic/EmailTextField/EmailTextField'
import PasswordTextField from '@Components/atomic/PasswordTextField/PasswordTextField'
import TextButton from '@Components/atomic/TextButton/TextButton'
import SignUpErrors from '@Components/signUp/SignUpErrors/SignUpErrors'

import UserService from '@Api/services/userService'
import { useAppDispatch } from '@Hooks/redux'
import { insertAuthInfo } from '@Store/reducers/auth'

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
  const [email, setEmail] = useState('neves@email.com')
  const [password, setPassword] = useState('filipe123')
  const [errors, setErrors] = useState<string[]>([])
  const navigation = useNavigation()

  async function handleLoginPressButton() {
    setErrors([])
    const loginResponse = await UserService.signIn(email, password)

    if (loginResponse.status !== 'error') {
      dispatch(insertAuthInfo(loginResponse))
      navigation.navigate('Main')
    } else {
      setErrors(['Dados insieridos estão inválidos! Tente novamente'])
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TitleContainer>
          <SignUpTitle>Login: </SignUpTitle>
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
            />
          </InputContainer>
        </FormContainer>
      </Container>
    </SafeAreaView>
  )
}

export default SignIn
