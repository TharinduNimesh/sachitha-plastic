export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { type, formData } = body

    let emailSubject = ''
    let emailContent = ''

    // Format email content based on feedback type
    if (type === 'review') {
      emailSubject = `New Review - ${formData.rating} Stars`
      emailContent = `
        <h2>New Review Received</h2>
        <p><strong>Rating:</strong> ${formData.rating} Stars</p>
        <h3>What They Liked:</h3>
        <p>${formData.positives}</p>
        <h3>Suggested Improvements:</h3>
        <p>${formData.improvements}</p>
      `
    } else if (type === 'feature') {
      emailSubject = `New Feature Request - ${formData.title}`
      emailContent = `
        <h2>New Feature Request</h2>
        <p><strong>Title:</strong> ${formData.title}</p>
        <h3>Description:</h3>
        <p>${formData.description}</p>
        <h3>Use Case:</h3>
        <p>${formData.useCase}</p>
      `
    } else if (type === 'bug') {
      emailSubject = `Bug Report - ${formData.title}`
      emailContent = `
        <h2>Bug Report</h2>
        <p><strong>Title:</strong> ${formData.title}</p>
        <h3>Description:</h3>
        <p>${formData.description}</p>
        <h3>Steps to Reproduce:</h3>
        <p>${formData.steps}</p>
        <h3>Expected Behavior:</h3>
        <p>${formData.expected}</p>
        <h3>Actual Behavior:</h3>
        <p>${formData.actual}</p>
      `
    }

    // Send email
    await sendMail({
      to: 'admin@eversoft.lk',
      subject: emailSubject,
      template: 'feedback',
      context: {
        title: emailSubject,
        content: emailContent
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending feedback:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send feedback'
    })
  }
})
