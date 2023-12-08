onRecordAfterCreateRequest((e) => {
  // TODO mail for logged in user

  if (e.record.get("user")) {
    return;
  }

  const needs_lodging = e.record.get("needs_lodging") ? " Ja" : " Nein";
  const vegetarian = e.record.get("vegetarian") ? "Ja" : "Nein";

  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: e.record.email() }],
    subject: "[SMD-KA] Regoikon 2023 Anmeldung",
    html:
      "Hallo " +
      e.record.get("name") +
      ",<br><br>vielen Dank für deine Anmeldung zum Regiokon 2024. Wir freuen uns, dich dabei zu haben!<br><br>" +
      "Wir haben folgende Daten von dir erhalten:<br><br>" +
      "<b>Name:</b> " +
      e.record.get("name") +
      "<br>" +
      "<b>E-Mail:</b> " +
      e.record.get("email") +
      "<br>" +
      "<b>Telefon:</b> " +
      e.record.get("phonenumber") +
      "<br>" +
      "<b>Du benötigst einen Schlafplatz:</b> " +
      needs_lodging +
      "<br>" +
      "<b>Du bist Vegetarier:</b> " +
      vegetarian +
      "<br>" +
      "<b>Deine Allergien:</b> " +
      e.record.get("allergies") +
      "<br>" +
      "<b>Deine Gruppe:</b> " +
      e.record.get("group") +
      "<br>" +
      "<b>Deine Anermerkungen:</b> " +
      e.record.get("comments") +
      "<br><br>" +
      "Genaure Informationen zurRegiokon 2024 bekommst du in den Tagen davor an diese E-Mail-Adresse gesendet. " +
      "Solltest du Angaben nochmals ändern müssen oder Fragen haben," +
      " erreichst du uns unter <a href='mailto:regiokon24@smd-karsruhe.de'>regiokon24@smd-karlsruhe.de</a> <br><br>" +
      "Dein Regiokon-Team<br><br>",
  });

  $app.newMailClient().send(message);
}, "regiokon");
