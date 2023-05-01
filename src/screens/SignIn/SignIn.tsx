import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import EmailTextField from '@Components/atomic/EmailTextField/EmailTextField'
import PasswordTextField from '@Components/atomic/PasswordTextField/PasswordTextField'
import TextButton from '@Components/atomic/TextButton/TextButton'

import UserService from '@Api/services/userService'

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
const InputContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
`
const SignIn: React.FC<ScreenType> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLoginPressButton() {
    const loginResponse = await UserService.signIn(email, password)

    if (loginResponse) {
      navigation.navigate('Home')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TitleContainer>
          <SignUpTitle>Login</SignUpTitle>
          <Instruction>Insira seus dados para entrar na aplicação</Instruction>
        </TitleContainer>
        <InputContainer>
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
      </Container>
    </SafeAreaView>
  )
}

export default SignIn