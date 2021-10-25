export default function ({ store, redirect, error, route }) {
  if (
    (route.path.includes('student') &&
      store.state.fireAuthentication.user === null) ||
    store.state.fireAuthentication.user === undefined
  ) {
    redirect('/')
  }
}




