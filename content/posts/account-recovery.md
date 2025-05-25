Everybody already knows they should be using strong passwords, a password manager, and ideally 2FA. All of which I also do—obviously. But last week, before traveling, I logged out of my Google account on some devices and accidentally almost locked myself out permanently. 

It wasn’t until I tried signing back in that I noticed a critical oversight: my Google account depended on other devices or Google Authenticator for two-factor authentication, creating a circular dependency. Thankfully, an old logged-in iPad saved the day. That scare forced me to realize that despite using a password manager and maintaining generally good security hygiene, I hadn’t actually mapped out my accounts’ dependency graphs or planned adequately for recovery scenarios.

Now that so much of our personal and professional lives are online, more than ever, secure access to accounts, with the reliable ability to recover, is absolutely critical.

## Why 2FA on Other Devices Isn’t Enough

Only relying on personal devices for two-factor authentication (2FA) can lead to circular dependencies. If you lose your devices simultaneously or find yourself logged out unexpectedly, you risk complete account lockout. 

Using other devices as your only 2FA fallback isn’t robust enough, because the failure scenario of losing multiple devices (e.g., losing your phone and laptop while traveling) is precisely the scenario you most need protection against.

## Why Passkeys Alone Aren’t Enough

Passkeys are a significant step forward, providing secure, passwordless login (so they're resilient against phishing) tied to device biometrics. However, passkeys still fundamentally depend on your devices. Lose your phone and laptop, and suddenly your primary authentication methods are gone. Passkeys alone, therefore, aren’t sufficient without an independent, device-agnostic backup—such as hardware security keys.

## Why Security Keys are Essential

Hardware security keys (e.g., [YubiKeys](https://amzn.to/3H93ZIZ)) provide great protection and are independent from device-based authentication methods. They’re resilient against phishing and don’t rely on the fragile ecosystem of device logins. 

Since security keys have a different risk profile to personal devices (they're cheap, aren't valueable enough to be stolen, and aren't easily destroyed) they make a great backup to device-based authentication methods. Keep multiple security keys stored securely and separately, ensuring you have access even in worst-case scenarios.

I recommend the cheaper [Yubico C-series NFC](https://amzn.to/3HbiewT), which only support FIDO2 and FIDO rather than OTP, which for personal uses is probably all you need and is more secure! FYI, I've linked my Amazon affiliate link in case you want to get that one.

## An Ideal Account Security and Recovery Plan

After a lot of research, I've come up with the following plan:

**Password Manager** (root account)
- Cloud-based storage for most passwords (e.g., 1Password, Bitwarden).
- (Optional) Periodically backed up to a secondary password manager (e.g., Apple Passwords, Google Passwords, LastPass).

**Apple Account** (key account - may grant access to secondary password manager, other accounts via passkeys)
- Multi-Factor Authentication: 2 hardware security keys + trusted devices.
- Keys stored securely in separate physical locations.
- Account recovery contact set up.
- Password reset to something memorable but secure.

**Google Account** (key account - may grant access to secondary password manager, other accounts via passkeys)
- MFA: 2 hardware security keys + Google Authenticator + trusted devices.
- Password reset to a secure, memorable phrase.

**Other Accounts**
- Managed via Password Manager or OAuth with Google or Apple.
- MFA: Combination of passkeys and hardware security keys.
- Immediately upgrade any SMS-only MFA accounts to support security keys.

**Password Memorization**
Only three critical passwords need memorization:
- Password Manager (highest priority)
- Apple
- Google (lowest priority)

**Regular Security Reviews**
- Regularly verify memorized passwords.
- Ensure security keys and Password Manager Emergency Kit are stored safely.
- Periodically back up passwords to secondary password manager.
- Review this security plan regularly.
- Always use MFA with passkeys and security keys for new accounts.

## Recovery Plan Scenarios

**Lost Devices (Partial Loss)**
-	Use any remaining authenticated device to regain access:
	- Retrieve credentials via Password Manager.
	- Authenticate using available MFA methods or hardware keys.

**Lost All Devices**
-	Recover Password Manager using Emergency Kit and proceed as above.
-	Alternatively, recover passwords via secondary password manager backup (less ideal):
	- Authenticate using memorized passwords and security keys.
	- In extreme cases, utilize your Account Recovery Contact.
	- Reestablish accounts and create a new Password Manager vault if necessary.

**Forgotten Passwords**
- For non-critical accounts, recover using Password Manager or secondary password manager backup.
- For Apple or Google accounts, leverage the memorized credentials or fallback options stored in Password Manager.
- For Password Manager itself, recover using the Emergency Kit or secondary password manager backup.

## Conclusion
This stuff may not seem important when you already have the basics setup with constant access to your accounts, but like insurance, it's only when you need it that you'll realize how important it really is. 

I'd love to hear any thoughts on whether I missed anything - or if you have a better plan - please drop a message!
