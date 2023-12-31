import type { CompositeScreenProps } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootStackParamList = Record<string, undefined>

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
  type ScreenProps<T extends keyof {}> = CompositeScreenProps<
    BottomTabScreenProps<{}, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >
}
