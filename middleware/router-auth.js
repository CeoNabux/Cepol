export default function ({ store, redirect, error, route }) {
  if (
    isInApp(route.path) && isAuthenticated(store.state.fireAuthentication.user)
  ) {
    redirect('/')
  }
  else if(!isAuthenticated(store.state.fireAuthentication.user) && !isInApp(route.path)) {
    const path = isUserRole(store.state.fireAuthentication.user)
    redirect(`${path}/dashboard`)
  }
  return
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

function isUserRole(user) {
  if (user.role.student) {
    return 'student'
  } else if(user.role.admin) {
    return 'admin'
  } else {
    return 'instructor'
  }
}
function requireStudent(route) {
  return ['/student'].includes(route.path)
}
function requireInstructor(route) {
  return ['/instructor'].includes(route.path)
}
