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
      subject: "[SMD-KA] Saft Anmeldung SoSe24",
      html:
        "Hallo " +
        result.name +
        ",<br><br>vielen Dank für deine Anmeldung zur Saft im SoSe" +
        ". Wir freuen uns, dich dabei zu haben!<br><br>" +
        "Genaue Informationen zur Anreise und Packliste folgen du in den Tagen vor der SAFT und werden an diese E-Mail-Adresse gesendet. " +
        "Solltest du Fragen haben," +
        " erreichst du uns unter <a href='mailto:claus@chammann.dev'>claus@chammann.dev</a> <br><br>" +
        "Deine SAFT-Orga<br>Kirsten, Lilly und Claus<br>",
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
    subject: "[SMD-KA] Saft Anmeldung SoSe24",
    html:
      "Hallo " +
      e.record.get("name") +
      ",<br><br>vielen Dank für deine Anmeldung zur Saft im SoSe" +
      ". Wir freuen uns, dich dabei zu haben!<br><br>" +
      "Genaue Informationen zur Anreise und Packliste folgen du in den Tagen vor der SAFT und werden an diese E-Mail-Adresse gesendet. " +
      "Solltest du Fragen haben," +
      " erreichst du uns unter <a href='mailto:claus@chammann.dev'>claus@chammann.dev</a> <br><br>" +
      "Deine SAFT-Orga<br>Kirsten, Lilly und Claus<br>",
  });

  $app.newMailClient().send(message);
}, "saft");
