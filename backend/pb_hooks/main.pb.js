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
      to: [{ address: e.record.email() }],
      subject: "[SMD-KA] Regoikon 2023 Anmeldung",
      html:
        "Hallo " +
        result.name +
        ",<br><br>vielen Dank für deine Anmeldung zum Regiokon 2024. Wir freuen uns, dich dabei zu haben!<br><br>" +
        "Wir haben folgende Daten von dir erhalten:<br>" +
        "<b>Du hast folgende Schlafplätze</b> " +
        "Männer: " +
        e.record.get("lodging_male") +
        ", Frauen: " +
        e.record.get("lodging_female") +
        ", Beide: " +
        e.record.get("lodging_both") +
        "<br>" +
        "<b>Deine Anermerkungen:</b> " +
        e.record.get("comments") +
        "<br><br>" +
        "Genaue Informationen zur Regiokon 2024 bekommst du in den Tagen davor an diese E-Mail-Adresse gesendet. " +
        "Solltest du Fragen haben," +
        " erreichst du uns unter <a href='mailto:regiokon24@smd-karsruhe.de'>regiokon24@smd-karlsruhe.de</a> <br><br>" +
        "Dein Regiokon-Team<br><br>",
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
      "<b>Geschlecht:</b> " +
      gender +
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
      "Genaue Informationen zur Regiokon 2024 bekommst du in den Tagen davor an diese E-Mail-Adresse gesendet. " +
      "Solltest du Angaben nochmals ändern müssen oder Fragen haben," +
      " erreichst du uns unter <a href='mailto:regiokon24@smd-karsruhe.de'>regiokon24@smd-karlsruhe.de</a> <br><br>" +
      "Dein Regiokon-Team<br><br>",
  });

  $app.newMailClient().send(message);
}, "regiokon");