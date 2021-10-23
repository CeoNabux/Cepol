export default function ({ store, redirect, error, route }) {
  if(!store.state.fireAuthentication.user) {
    console.log(store.state.fireAuthentication.user)
  } else if(!store.state.fireAuthentication.user && isAdmin(store.state.fireAuthentication.user)) {
    redirect('/admin')
  }
}

function isAuthenticated(user) {
  return user
}

function requireAuthentication(route) {
  // return !['/', '/about', '/login'].includes(route.path) // || !route.path.startswith('/error_')
  return ['/'].includes(route.path)
}

function isAdmin(user) {
  return user && user.role.admin
}
function isStudent(user) {
  return user && user.role.student
}
function isInstructor(user) {
  return user && user.role.instructor
}

function requireAdmin(route) {
  return ['/admin'].includes(route.path)
}
function requireStudent(route) {
  return ['/student'].includes(route.path)
}
function requireInstructor(route) {
  return ['/instructor'].includes(route.path)
}
