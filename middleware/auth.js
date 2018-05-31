export default function ( context ) {
  if (!context.store.state.auth) {
    if (context.route.name != 'auth') {
      window.location = "/auth"
    }
  }

}
