export const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f4ff;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f4ff;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(108,99,255,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#6c63ff;padding:32px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background:rgba(255,255,255,0.2);border-radius:10px;padding:10px 14px;display:inline-block;">
                    <span style="font-size:22px;">✏️</span>
                  </td>
                  <td style="padding-left:12px;">
                    <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                      THINKBOARD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <h2 style="margin:0 0 8px;font-size:22px;color:#26215C;font-weight:700;">
                Reset your password
              </h2>
              <p style="margin:0 0 28px;font-size:14px;color:#94a3b8;line-height:1.6;">
                We received a request to reset your Thinkboard password.
                Use the OTP below to proceed. This code is valid for
                <strong style="color:#6c63ff;">10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="
                      display:inline-block;
                      background:#f0eeff;
                      border:2px dashed #6c63ff;
                      border-radius:12px;
                      padding:20px 48px;
                      margin-bottom:28px;
                    ">
                      <p style="margin:0 0 4px;font-size:11px;color:#6c63ff;letter-spacing:2px;text-transform:uppercase;font-weight:600;">
                        Your OTP Code
                      </p>
                      <p style="margin:0;font-size:38px;font-weight:800;color:#26215C;letter-spacing:10px;">
                        ${otp}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Warning -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#fff8f0;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;padding:12px 16px;margin-bottom:24px;">
                    <p style="margin:0;font-size:13px;color:#92400e;">
                      If you didn't request this, you can safely ignore this email.
                      Your password will not change.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #f1f0ff;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#cbd5e1;">
                Sent by Thinkboard · The visual thinking tool
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e1;">
                © 2026 Thinkboard. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;