const dataFromForm = (form) => Object.fromEntries(
  $(form).serializeArray().map(
    ({ name, value }) => ([name, value])
  )
)
$(() => {
  $('#mainForm').submit(async (evt) => {
    evt.preventDefault();
    const data = dataFromForm(evt.currentTarget)
    $('.successMessage, .errorMessage').remove();
    const response = await fetch('#{action}',
      {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )
    const {
      success,
      redirect,
      message,
      errors,
    } = await response.json()
    if (redirect) {
      window.location.replace(redirect)
      return false
    }
    if (success) {
      $('.successContainer').append(
        $(
          '<div>',
          { class: 'successMessage', text: message }
        )
      )
      $('#mainForm').hide()
    }
    if (errors) {
      errors.forEach((error) => {
        const errorParts = error.split(":")
        if (errorParts.length === 1) {
          const errorElement = $(
            '<div>',
            { class: 'errorMessage', text: error }
          )
          $('.errorContainer').first().append(errorElement)
        } else {
          const [field, message] = errorParts;
          const errorElement = $(
            '<div>',
            { class: 'errorMessage', text: message }
          )
          const errorContainer = $(`.errorContainer[data-field='${field}']`)
          $(errorContainer).append(errorElement)
        }
      })
    }
    return false; // do not propagate form submit
  });
})
