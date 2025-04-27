---
title: Contact Me
layout: base.njk
permalink: /contact/
---

## Get in Touch!

Have a question or want to collaborate? Fill out the form below!

<form class="contact-form" action="#" method="POST"> {# Replace '#' with your form handler URL if you have one #}
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit" class="submit-button">Send Message</button>
</form>
