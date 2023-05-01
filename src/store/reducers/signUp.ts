import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { subYears } from 'date-fns'
import { AxiosError, AxiosResponse } from 'axios'

import api from '@Api/index'

interface SignUpState {
  step: number
  email: string
  password: string
  passwordConfirm?: string
  name: string
  surname: string
  cpf: string
  birthDate: string
  gender: string
  cityId: string
  neighborhoodId: string
  addressDescription: string
  addressNumber: string
}

const initialState: SignUpState = {
  step: 0,
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  surname: '',
  cpf: '',
  birthDate: subYears(new Date(), 18).toISOString(),
  gender: '',
  cityId: '',
  neighborhoodId: '',
  addressDescription: '',
  addressNumber: '',
}

export const sendUserData = createAsyncThunk<AxiosResponse<any, any>>(
  'data/sendUserData',
  async (_, { getState }) => {
    const signUpData = (getState() as any).signUp as SignUpState
    try {
      const response = await api.post('/users', signUpData)
      console.log({ response })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
)

const signUpslice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    nextStep(state) {
      state.step++
    },
    previousStep(state) {
      state.step--
    },
    insertSignUpInfo(state, action: PayloadAction<Partial<SignUpState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { nextStep, previousStep, insertSignUpInfo } = signUpslice.actions
export default signUpslice.reducer
