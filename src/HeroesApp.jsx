import { AuthProvider } from './auth'
import { AppRouter } from './router/AppRouter'

export const HeroesApp = () => {
  return (
    // CUARTO
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
