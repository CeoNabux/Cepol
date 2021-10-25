export default function ({ store, redirect, error, route }) {
  if (
    isInApp(route.path) && isAuthenticated(store.state.fireAuthentication.user)
  ) {
    redirect('/')
  }
}

function isInApp(userRoute) {
  const pathsUrl = ['student', 'instructor', 'admin']
  const result = pathsUrl.some(pathUrl => userRoute.includes(pathUrl))
  return result
}


function isAuthenticated(user) {
  const superUser = user === null || user=== undefined
  return superUser
}
