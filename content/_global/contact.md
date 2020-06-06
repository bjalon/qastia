+++
fragment = "contact"
#disabled = true
date = "2017-09-10"
weight = 1100
#background = "light"
form_name = "defaultContact"

title = "Contactez-nous"

post_url = "https://formspree.io/xyynkoyd" #default: formspree.io
email = "contact@journal3d.fr"
button = "Envoyer" # defaults to theme default
#netlify = false

# Optional google captcha
#[recaptcha]
#  sitekey = ""

[message]
  success = "Nous reviendrons vers vous rapidement" # defaults to theme default
    error = "Une erreur s'est produite" # defaults to theme default

# Only defined fields are shown in contact form
[fields.name]
  text = "Votre nom *"
  error = "Entrez votre nom et prénom" # defaults to theme default

[fields.phone]
  text = "Votre téléphone *"
  error = "Entrez votre téléphone" # defaults to theme default

[fields.message]
  text = "Votre message *"
  error = "Saisissez votre message" # defaults to theme default

# Optional hidden form fields
# Fields "page" and "site" will be autofilled
[[fields.hidden]]
  name = "page"

[[fields.hidden]]
  name = "someID"
  value = "www.qastia.com"

[[fields.hidden]]
  name = "_next"
  value = "https://www.qastia.com/merci"
+++
