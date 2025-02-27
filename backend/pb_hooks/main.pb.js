onMailerBeforeRecordVerificationSend((e) => {
  e.message.subject = "[SMD-KA] Willkommen";
  e.message.html =
    "Hallo " +
    e.record.get("name") +
    ",<br><br>vielen Dank für deine Registrierung im internen Bereich der SMD Karlsruhe. " +
    "Das PrIT Team wird deine Anmeldung prüfen und dich dann freischalten." +
    "<br><br>Deine SMD Karlsruhe<br>";

  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: "webmaster@smd-karlsruhe.de" }],
    subject: "[SMD-KA] Registrierung von " + e.record.get("name"),
    html:
      "Bitte verifiziere den Benutzer" +
      JSON.stringify(e.record) +
      ' <a href="' +
      $app.settings().meta.appUrl +
      "/_/#/auth/confirm-verification/" +
      e.meta.token +
      '" target="_blank" rel="noopener">Bestätigen</a>' +
      "<br><br>Deine SMD Karlsruhe<br>",
  });
  $app.newMailClient().send(message);
});

onRecordAfterConfirmVerificationRequest((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: e.record.get("email") }],
    subject: "[SMD-KA] Du wurdest verifiziert",
    html:
      "Hallo " +
      e.record.get("name") +
      ", <br><br>du wurdest verifiziert und kannst dich jetzt im internen Bereich der SMD Karlsruhe anmelden." +
      "<br><br>Deine SMD Karlsruhe<br>",
  });

  $app.newMailClient().send(message);
}, "users");

onRecordAfterCreateRequest((e) => {
  if (e.record.get("user")) {
    const result = new DynamicModel({
      id: "",
      name: "",
      email: "",
    });

    $app
      .dao()
      .db()
      .select("id", "name", "email")
      .from("users")
      .andWhere($dbx.like("id", e.record.get("user")))
      .one(result);

    const message = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: $app.settings().meta.senderName,
      },
      to: [{ address: result.email }],
      subject: "[SMD-KA] SAFT Anmeldung WS24/25",
      html:
        "Hallo " +
        result.name +
        ",<br><br>vielen Dank für deine Anmeldung zur Semesteranfangsfreizeit im Wintersemester" +
        ". Wir freuen uns, dich dabei zu haben!<br><br>" +
        "Genaue Informationen zur Anreise und Packliste folgen in den Tagen vor der SAFT und werden an diese E-Mail-Adresse gesendet. " +
        "Solltest du Fragen haben," +
        " erreichst du uns unter <a href='mailto:bettina.fritzsching@web.de'>bettina.fritzsching@web.de</a> <br><br>" +
        "Deine SAFT-Orga<br>Doreen, Bettina, Samuel<br>",
    });

    $app.newMailClient().send(message);

    return;
  }

  const needs_lodging = e.record.get("needs_lodging") ? " Ja" : " Nein";
  const vegetarian = e.record.get("vegetarian") ? "Ja" : "Nein";
  const gender = e.record.get("gender") == "male" ? "Männlich" : "Weiblich";

  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: e.record.email() }],
    subject: "[SMD-KA] SAFT Anmeldung WS24/25",
    html:
      "Hallo " +
      e.record.get("name") +
      ",<br><br>vielen Dank für deine Anmeldung zur SAFT im WS24/25" +
      ". Wir freuen uns, dich dabei zu haben!<br><br>" +
      "Genaue Informationen zur Anreise und Packliste folgen in den Tagen vor der SAFT und werden an diese E-Mail-Adresse gesendet. " +
      "Solltest du Fragen haben," +
      " erreichst du uns unter <a href='mailto:bettina.fritzsching@web.de'>bettina.fritzsching@web.de</a> <br><br>" +
      "Deine SAFT-Orga<br>Doreen, Bettina, Samuel<br>",
  });

  $app.newMailClient().send(message);
}, "saft");

onRecordAfterCreateRequest((e) => {
  const emailSender = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: e.record.email() }],
    subject: "[SMD-KA] Kontaktformular",
    html:
      "Hallo " +
      e.record.get("name") +
      ",<br><br>vielen Dank für deine Nachricht an uns. Wir werden uns baldmöglichst bei dir zurückmelden!" +
      "Bis dahin wünschen wir dir eine gesegnete Zeit.<br><br>" +
      "Deine SMD Karlsruhe<br>",
  });

  const emailLeaders = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: "leiter@smd-karlsruhe.de" }],
    subject: "[SMD-KA] Kontaktformular",
    html:
      "Moin Leiter " +
      "es gab folgende Anfrage über das Kontaktformular:<br><br>" +
      "Name: " +
      e.record.get("name") +
      "<br>" +
      "E-Mail: " +
      e.record.get("email") +
      "<br>" +
      "Betreff: " +
      e.record.get("subject") +
      "<br>" +
      "Nachricht: " +
      e.record.get("message") +
      "<br><br>" +
      "Bitte denkt dran möglichst schnell zu reagieren ;)" +
      "Liebe Grüße<br>Dein SMD-KA Backend",
  });

  const emailPrit = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: "webmaster@smd-karlsruhe.de" }],
    subject: "[SMD-KA] Kontaktformular",
    html:
      "Logs - Kontaktformular" +
      "Name: " +
      e.record.get("name") +
      "<br>" +
      "E-Mail: " +
      e.record.get("email") +
      "<br>" +
      "Betreff: " +
      e.record.get("subject") +
      "<br>" +
      "Nachricht: " +
      e.record.get("message"),
  });

  $app.newMailClient().send(emailSender);
  $app.newMailClient().send(emailLeaders);
  $app.newMailClient().send(emailPrit);
}, "contact");
