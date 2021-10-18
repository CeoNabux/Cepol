export default function ({ store, redirect, error, route }) {
  // console.log('user', store.state.user)
  if (!isAuthenticated(store.state.user) && requireAuthentication(route))
    redirect('/')
  // /login
  else if (!isAdmin(store.state.user) && requireAdmin(route))
    // redirect('/error_admin_only')
    // redirect('/error', { code: 'require_admin' })
    error({
      statusCode: 401,
      message: 'Only Admin is allowed to access this page',
    })
}

function isAuthenticated(user) {
  return user
}

function requireAuthentication(route) {
  // return !['/', '/about', '/login'].includes(route.path) // || !route.path.startswith('/error_')
  return ['/console'].includes(route.path)
}

function isAdmin(user) {
  return user && user.admin
}

function requireAdmin(route) {
  return ['/admin'].includes(route.path)
}
