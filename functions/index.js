const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
//auth trigger (new user sign up)


//CREATING EVERY USER AS STUDENTS
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // console.log('user created', user.email, user.uid)
  //Siempre es necesario retornar un valor/promesa
  const customClaims = {
    student: true,
  }
  admin.auth().setCustomUserClaims(user.uid, customClaims)
  return admin.firestore().collection('roles').doc(user.uid).set({
    email: user.email,
    role: customClaims,
  })
})


//CREATING ADMINS IN THE SPECIAL ROUTE
exports.setAdmin = functions.https.onCall((data) => {
  // if (!context.auth.token.admin) return
  const adminClaims = {
    admin: true,
  }
  admin.auth().setCustomUserClaims(data.uid, adminClaims)
  return admin.firestore().collection('roles').doc(data.uid).update({
    role: adminClaims,
  })
})

//WE ARE DELETING USERS AND THEIR ROLES IN FIRESTORE DATABASE
//auth trigger (user deleted)
exports.newDeleted = functions.auth.user().onDelete((user) => {
  // console.log('user created', user.email, user.uid)
  const doc = admin.firestore().collection('roles').doc(user.uid)
  return doc.delete()
})

// http callable function (adding a request)
