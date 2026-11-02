/* ==========================================================================
   FORMULÁRIO — apenas demonstração: valida, mostra a mensagem e não envia nada.
   Para a versão comercial, troque o bloco "envio" (Formspree ou WhatsApp).
   ========================================================================== */

const FORM_MESSAGES = {
  invalid: "Revise os campos destacados.",
  success: "Recebido. O sócio responde em até duas horas, com total sigilo.",
};

function initForm({ onSuccess = () => {} } = {}) {
  const form = $("#contact-form");
  const status = $(".form__status", form);
  const fields = $$("input, select, textarea", form);

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  };

  const validate = (field) => {
    const valid = field.checkValidity();
    field.closest(".field").classList.toggle("is-invalid", !valid);
    field.setAttribute("aria-invalid", String(!valid));
    return valid;
  };

  /* Depois do primeiro erro, o campo é revalidado enquanto o usuário corrige */
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.closest(".is-invalid")) validate(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      setStatus(FORM_MESSAGES.invalid, true);
      invalid[0].focus();
      return;
    }

    /* envio: demonstração, nada sai do navegador */
    setStatus(FORM_MESSAGES.success);
    form.reset();
    onSuccess();
  });
}
