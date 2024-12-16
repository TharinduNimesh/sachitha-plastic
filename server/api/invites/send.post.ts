export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, role, inviteId } = body;

    if (!email || !role || !inviteId) {
      throw createError({
        statusCode: 400,
        message: 'Email, role, and inviteId are required',
      });
    }

    // Generate invite URL with token
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const inviteUrl = `${baseUrl}/auth/invitation?id=${inviteId}`;

    // Send invitation email
    await sendMail({
      to: email,
      subject: 'Invitation to join Samarasinghe Trade Center',
      template: 'invitation',
      context: {
        role,
        inviteUrl,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error sending invitation email:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to send invitation email',
    });
  }
});
