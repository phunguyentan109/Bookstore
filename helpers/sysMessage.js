exports.noEmailExist = `<p class="announce-appear error"><i class="fas fa-exclamation-circle"></i> No account with that email address exists</p>`;

exports.emailSent = (email) => `<p class="announce-appear success"><i class="far fa-check-circle"></i> An email has been sent to <span>${email}</span></p>`

exports.recoverEmail = (host, token) => {
    let subject = `🔑 Kafka Bookstore Password Reset`;
    let text = (
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.

        Please click on the following link, or paste this into your browser to complete the process:
        http://${host}/reset/${token}

        If you did not request this, please ignore this email and your password will remain unchanged.`
    );
    return {subject, text};
}
