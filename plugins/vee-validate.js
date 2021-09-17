import { extend } from 'vee-validate'
import { required, email, min, regex } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Este campo es requerido'
})

extend('email', {
  ...email,
  message: 'Ingresa un correo válido'
})

extend('min', {
  ...min,
  message:'Ingresa al menos 12 carácteres'
})

extend('regex', {
  ...regex,
  message:
    'Tu contraseña debe tener al menos: 1 mayúscula, 1 número y 1 carácter especial(Ej: , . _  / & etc)',
})